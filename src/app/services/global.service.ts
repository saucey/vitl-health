import {Injectable, EventEmitter, Inject, NgZone, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, Location} from '@angular/common';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  ActivatedRoute,
  Route
} from '@angular/router';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/filter';
import * as initQueries from '../queries/init';
import * as userQueries from '../queries/user';
import {ApiService} from './api.service';
import {ModalService, ModalTypes} from '../modules/modal/services/modal.service';
import {TrackingEvent} from '../classes/trackingEvent';
import {CookieService} from './cookie.service';
import {Title, Meta} from '@angular/platform-browser';
import {ModalComponent} from '../modules/modal/components/modal.component';
import {GoogleAnalyticsService} from '../modules/shared/services/google-analytics.service';
import {SegmentService} from './segment.service';

declare var vitlConsultation: any;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  reloading = false;
  loading = false;
  init;
  cartCountry = null;
  private intercom;

  // Used only for passing the email adress from login component to forgot component
  email: string;

  private routeData = {
    headerStyle: '',
    pageStyle: '',
    hideFooter: true,
    hideBanner: false
  };

  private popupVisible = false;

  public events: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private modalService: ModalService,
    private cookieService: CookieService,
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
    private gaService: GoogleAnalyticsService,
    private segmentService: SegmentService,
    private ngZone: NgZone
  ) {

    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.stopLoading();
      this.routeData.pageStyle = '';
      this.checkRouteConfig(this.activatedRoute.root);
      this.activatedRoute.root.firstChild.data.subscribe((data) => {
        this.routeData.headerStyle = data.headerStyle || 'default';
        this.routeData.hideFooter = data.hideFooter || false;
        this.routeData.hideBanner = data.hideBanner || false;
        const noindex = data.noindex || false;
        if (noindex) {
          this.setMetaTag({name: 'robots', content: 'noindex'});
        } else {
          this.metaService.removeTag('name=\'robots\'');
        }
      });
      this.checkParams(this.activatedRoute.snapshot.queryParams);
      this.emitTrackingEvent('pageView', this.activatedRoute);
    });

    this.router.events.filter(event => event instanceof NavigationStart).subscribe((event: NavigationStart) => this.startLoading());
    this.router.events.filter(event => event instanceof NavigationCancel).subscribe((event: NavigationCancel) => this.stopLoading());
    this.router.events.filter(event => event instanceof NavigationError).subscribe((event: NavigationError) => this.stopLoading());

    this.api.events.filter(event => event.type === 'tokenChanged').subscribe(() => this.refetchInit());

    this.init = this.api.watchQuery(initQueries.Init, {cartid: this.getCartId(), country: this.cartCountry}, true);

    this.trackingEvents();

  }

  checkRouteConfig(route: ActivatedRoute) {
    route.data.subscribe((data: any) => {
      if (undefined !== data.pageStyle) {
        this.routeData.pageStyle = data.pageStyle;
      }
    });
    if (route.firstChild) {
      this.checkRouteConfig(route.firstChild);
    }
  }

  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  setTitle(title: string, postfix: string = 'Vitl') {
    if (this.isBrowser()) {
      this.titleService.setTitle(title + ' | ' + postfix);

      this.emitEvent('titleS', {
        title: title,
        postfix: postfix
      });

      if (undefined !== window ) {
        let traits = {};
        var urlParams = new URLSearchParams(window.location.search);
        ['utm_source', 'utm_medium', 'utm_campaign'].forEach((key) => {
          var value = urlParams.get(key);
          if (value) {
            traits[key] = value;
          }
        });
      }
    }
  }

  setMetaTag(params: any) {
    if (this.isBrowser()) {
      this.metaService.updateTag(params);
      this.emitEvent('metaSet', params);
    }
  }

  getCartId() {
    return this.cookieService.getCookie('cartid');
  }

  getTranslation(category: string, key: string): Observable<string> {
    return this.initCall()
      .map(({data}) => data.config[category])
      .map(group => group.find(translation => translation.key === key))
      .map(translation => translation.phrase);
  }

  initCall() {
    return this.init.valueChanges;
  }

  refetchInit() {
    this.reloading = true;
    return this.init.refetch({cartid: this.getCartId(), country: this.cartCountry}).then(
      () => this.reloading = false,
      (reason) => {
        this.reloading = false;
        throw reason;
      }
    );
  }

  setCartCountry(country: string) {
    this.cartCountry = country;
    return this.refetchInit();
  }

  updateInitCall(store, property, data) {
    try {
      const cache = store.readQuery({query: initQueries.Init, variables: {cartid: this.getCartId(), country: this.cartCountry}});
      cache[property] = data;
      store.writeQuery({query: initQueries.Init, variables: {cartid: this.getCartId(), country: this.cartCountry}, data: cache});
    } catch (e) {
      this.refetchInit();
    }
  }

  headerStyle() {
    return this.routeData.headerStyle;
  }

  getPageStyle() {
    return this.routeData.pageStyle;
  }

  setPageStyle(pagestyle: string) {
    this.routeData.pageStyle = pagestyle;
  }

  hideFooter() {
    return this.routeData.hideFooter;
  }

  hideBanner() {
    return this.routeData.hideBanner;
  }

  startLoading() {
    this.loading = true;
    this.emitEvent('loading', {status: true});
  }

  stopLoading() {
    this.loading = false;
    this.emitEvent('loading', {status: false});
  }

  showIntercom() {
    if (this.isBrowser()) {
      if (!this.intercom) {
        this.intercom = document.getElementById('intercom-container');
      }
      this.intercom.style.display = 'block';
    }
  }

  hideIntercom() {
    if (this.isBrowser()) {
      if (!this.intercom) {
        this.intercom = document.getElementById('intercom-container');
      }
      this.intercom.style.display = 'none';
    }
  }

  registerNewsletter(email: string) {
    return new Promise((resolve, reject) => {
      this.startLoading();
      this.api.mutate(userQueries.RegisterNewsletter, {email: email}).subscribe(() => {
        this.stopLoading();
        resolve();
        this.modalService.success('You are now subscribed to our weekly newsletter');
      }, () => this.stopLoading());
    });
  }

  emitEvent(type: string, data: object = {}) {
    this.events.emit({
      type: type,
      data: data
    });
  }

  emitTrackingEvent(type: string, data: any) {
    this.events.emit(new TrackingEvent(type, data));
  }

  checkParams(params) {
    Object.keys(params).forEach((key) => {
      if (key.startsWith('utm_')) {
        this.storeUtmParam(key, params[key]);
      }
      if (key.toLocaleLowerCase() === 'openconsultation') {
        this.openConsultation();
      }
      if (key.toLocaleLowerCase() === 'essentialonepartnership') {
        if (this.isBrowser()) {
          this.cookieService.setExpirableCookie('essentialOnePartnership', params[key], 14);
        }
      }
      if (key.toLocaleLowerCase() === 'personalisedpluspartnership') {
        if (this.isBrowser()) {
          this.cookieService.setExpirableCookie('personalisedPlusPartnership', params[key], 14);
        }
      }
    });
  }

  storeUtmParam(key, value) {

    if (this.isBrowser()) {
      localStorage.setItem(key, value);
    }

  }

  getUtmParams() {
    return Object.keys(localStorage).filter(key => key.startsWith('utm_')).map(key => {
      return {
        key: key,
        value: localStorage.getItem(key)
      };
    });
  }

  trackingEvents() {

    if (this.isBrowser()) {

      this.events.filter((event) => event instanceof TrackingEvent).subscribe((event: TrackingEvent) => {

        try {

          switch (event.type) {

            case 'userSet':
              this.gaService.setUser(event);
              this.segmentService.identifyUser(event);

              snaptr('init', '42874f29-253f-475b-948d-f2d77d065252', {'user_hashed_email': event.data.emailHashed});
              break;

            case 'pageView':
              snaptr('track', 'PAGE_VIEW');
              if (window['dataLayer']) {
                window['dataLayer'].push({'event': 'optimize.activate'});
              }
              break;

            case 'userRegistered' :
              fbq('track', 'CompleteRegistration');
              this.segmentService.identifyUser(event);
              snaptr('init', '42874f29-253f-475b-948d-f2d77d065252', {'user_hashed_email': event.data.emailHashed});
              snaptr('track', 'SIGN_UP');
              break;

            case 'viewContent':
              fbq('track', 'ViewContent', {
                content_name: event.data.label,
                content_type: event.data.type,
                content_ids: [event.data.id]
              });
              break;

            case 'viewProduct' :
              this.gaService.trackProductView(event);
              break;

            case 'productAddedToCart':
              // this.segmentService.productAddedToCart()
              break;

            case 'initiateCheckout' :
              fbq('track', 'InitiateCheckout');
              snaptr('track', 'START_CHECKOUT');
              break;

            case 'checkoutProgress' :
              this.segmentService.checkoutStepViewed(event.data.step, event.data.cart.cartid);
              this.gaService.trackCheckoutProgress(event);
              break;

            case 'checkoutStepCompleted':
              this.segmentService.checkoutStepCompleted(event.data.step, event.data.cartid);
              break;

            case 'paymentMethodAdded':
              this.segmentService.paymentMethodAdded(event.data.brand, event.data.last_4, event.data.cart_id);
              break;

            case 'addPlan':
              fbq('track', 'AddToCart');
              snaptr('track', 'ADD_CART');
              this.gaService.trackAddToCart(event);
              break;

            case 'couponEntered':
              this.segmentService.couponEntered(event.data.coupon_code, event.data.cart_id);
              break;

            case 'couponApplied':
              this.segmentService.couponApplied(event.data.coupon_code, event.data.discount, event.data.cart_id);
              break;

            case 'couponDenied':
              this.segmentService.couponDenied(event.data.coupon_code, event.data.reason, event.data.cart_id);
              break;

            case 'orderProcessed' :
              this.gaService.trackPurchase(event);
              this.trackPurchase(event.data);
              break;

            case 'communicationPreferencesUpdated':
              this.segmentService.communicationPreferencesUpdated(event.data.preferences)
              break;

            case 'setConsultationProduct':
              this.segmentService.setConsultationProduct(event.data);
              break;

            default :
              this.gaService.customEvent(event);
              break;

          }

        } catch (e) {

          console.log('Pixels not fired');
          console.log(e);

        }

      });

    }

  }

  trackPurchase(purchase) {

    fbq('track', 'Purchase', {
      value: purchase.total,
      currency: purchase.currency
    });

    snaptr('track', 'PURCHASE', {
      'currency': purchase.currency,
      'price': purchase.total,
      'transaction_id': purchase.id
    });

    if (purchase.awinCode && typeof AWIN !== 'undefined' && typeof AWIN.Tracking !== 'undefined') {
      AWIN.Tracking.Sale = {};
      AWIN.Tracking.Sale.amount = parseFloat(purchase.awinAmount).toFixed(2);
      AWIN.Tracking.Sale.channel = 'aw';
      AWIN.Tracking.Sale.orderRef = purchase.id;
      AWIN.Tracking.Sale.parts = purchase.awinCode + ':' + parseFloat(purchase.awinAmount).toFixed(2);
      AWIN.Tracking.Sale.currency = purchase.currency;
      AWIN.Tracking.Sale.voucher = purchase.couponCode;
      AWIN.Tracking.Sale.test = '0';
      AWIN.Tracking.run();
    }

  }

  changeCurrency() {

    return new Promise(resolve => {
      const sub = this.initCall().subscribe(({data}) => {
        sub.unsubscribe();
        this.modalService.create(ModalTypes.CurrencySelector, {
          title: 'Select your currency',
          data: {
            currency: data.config.currency,
            currencies: data.config.currencies
          },
          callback: (modal: ModalComponent, currency: string) => {
            modal.close();
            this.cookieService.setCookie('currency', currency);
            resolve(currency);
          }
        });
      });
    });

  }


  isPopupVisible() {
    return this.popupVisible;
  }

  showPopup() {
    this.popupVisible = true;
  }

  hidePopup() {
    this.popupVisible = false;
  }

  openConsultation(showTEOResultsOnly = false) {
    // todo remove after sweatcoin campaign
    const viewResultsPath = showTEOResultsOnly ? '/essential-one/result' : '/consultation/result';
    // end todo

    const actions = {
      viewResults: () => {
        this.emitTrackingEvent('complete', {
          category: 'consultation',
          label: 'integrated'
        });

        this.ngZone.run(() => this.router.navigateByUrl(viewResultsPath));
      },
      viewRecommendations: () => {
        this.ngZone.run(() => this.router.navigateByUrl('/myvitl'));
      },
      closeConsultation: () => {
        this.location.back();
      }
    };

    vitlConsultation.openOverlay(actions);

    this.emitTrackingEvent('start', {
      category: 'consultation',
      label: 'integrated'
    });

    const consultationProduct = localStorage.getItem('consultationProduct');
    this.emitTrackingEvent('setConsultationProduct', consultationProduct);
  }

  checkFreeTrial(product, partnership) {
    if (product === 'essentialOne' && partnership !== '') {
      // return [ 'essential-one-price-test', 'paid-social' ].indexOf(partnership) > -1;
      return [ 'generic', 'essential-one-free-delivery', 'essential-one-save-30', 'essential-one-save-50' ].indexOf(partnership) === -1;
    }

    if (product === 'personalisedPlus' && partnership !== '') {
      return partnership === 'free-trial';
    }

    return false;
  }

}
