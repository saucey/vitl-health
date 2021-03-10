import { Directive, OnChanges, ElementRef, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import {SubmitForm} from '../../../queries/misc';
import {CartService} from '../../../services/cart.service';
import {AuthService} from '../../../services/auth.service';
import {ApiService} from '../../../services/api.service';
import {GlobalService} from '../../../services/global.service';
import {ContentService} from '../../../services/content.service';

@Directive({
  selector: '[appAction]'
})
export class ActionDirective implements OnChanges {

  @Input() appAction;

  @HostListener('click', [ '$event' ]) onClick(event: any) {
    this.processAction(event);
  }

  constructor(
      private el: ElementRef,
      private router: Router,
      private cartService: CartService,
      private authService: AuthService,
      private apiService: ApiService,
      private globalService: GlobalService,
      private contentService: ContentService
  ) { }

  ngOnChanges() {

      const elementStyle = this.el.nativeElement.style;
      const elementClass = this.el.nativeElement.classList;

      if (this.appAction) {

        elementStyle.cursor = 'pointer';
        elementClass.add('hasAction');

      }

  }

  parseUrl() {

      if (this.appAction.value.charAt(0) === '~') {
          return '/' + this.appAction.value.substring(1).replace(/^\/+/g, '');
      } else {
          return '/myvitl/' + this.appAction.value.replace(/^\/+/g, '');
      }

  }

  addProductToBasket(selectedPlan) {
    this.globalService.startLoading();
    this.cartService.addPlan(selectedPlan).then(() => {
      this.globalService.stopLoading();
      this.cartService.showCart();
    }, () => this.globalService.stopLoading());
  }
 
  processAction(event) {

      if (this.appAction) {

          event.stopPropagation();

          switch (this.appAction.type) {

              case 'openConsultation' :
              case 'startConsultation' : this.router.navigateByUrl('/consultation'); break;

              case 'viewBasket' : this.cartService.showCart(); break;
              case 'addToBasket' : this.addProductToBasket(this.appAction.selectedProductPlan); break;

              case 'presentContent' :
              case 'viewContent' : this.router.navigateByUrl(this.parseUrl()); break;

              case 'openUrl' :
              case 'viewWebContent' : window.open(this.appAction.value); break;

              case 'viewAddCouponScreen' : this.cartService.addCoupon().then(() => this.cartService.showCart()); break;

              case 'viewCustomerSupportScreen' : this.router.navigateByUrl('/contact'); break;

              case 'logOut' : this.authService.logout(); break;

              case 'payDigitalSubscription' :
              case 'productBuyNow' : this.router.navigate([ '/myvitl/select-plan', this.appAction.value ]); break;

              case 'viewRecommendations' :
              case 'viewDashboard' :
                // if user on consultation/result, redirect to myvitl/result instead of myvitl
                const url = window.location.href.replace(/\/$/, '');
                const currPage = url.substr(url.lastIndexOf('/') + 1);

                if (currPage === 'result') {
                  this.router.navigateByUrl('/myvitl/result');
                } else {
                  this.router.navigateByUrl('/myvitl');
                }
                break;

              case 'submitForm' : this.submitForm(); break;

              case 'acceptRequest' : this.acceptRequest(); break;
              case 'dismissRequest' : this.dismissRequest(); break;

              case 'dismissCartWarning' :
              case 'dismissScreen' : this.router.navigateByUrl('/'); break;

              case 'viewTestKitRegistrationScreen' : this.router.navigateByUrl('/kit'); break;

              default: console.log(this.appAction);

          }

      }

  }

  acceptRequest() {
    this.globalService.emitEvent('requestAccepted', this.appAction.value);
  }

  dismissRequest() {
    this.globalService.emitEvent('requestDismissed', this.appAction.value);
  }

  submitForm() {

      this.globalService.startLoading();
      this.apiService.mutate(SubmitForm, { id: this.appAction.value }).subscribe(({data}) => {
        this.globalService.stopLoading();
        this.globalService.emitEvent('swapContent', this.contentService.parseScreen(data.user_submitForm));
      }, () => this.globalService.stopLoading());

  }

}
