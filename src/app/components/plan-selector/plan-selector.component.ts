import {Component, Input, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {GlobalService} from '../../services/global.service';
import {ConfigService} from '../../services/config.service';
import {CookieService} from '../../services/cookie.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-plan-selector',
  templateUrl: './plan-selector.component.html',
  styles: []
})
export class PlanSelectorComponent implements OnInit, OnDestroy {

  @ViewChild('paymentRequest') paymentRequestElement: ElementRef;
  private _product;
  @Input() defaultPlan;
  @Input() allowAdd = true;
  @Input() displayOptions = true;
  @Input() displayShippingOptions = true;
  @Input() displayPlanLabel = false;
  @Input() offerCoupon = null;
  @Input() isMonthly = false;
  // adding = false;
  @Input() selectedPlan;
  @Input() isFreeTrial = false;
  config;
  deliveryMessage: string;
  showFreeDelivery = false;
  showQuarterlyMessage = false;
  private ngUnsubscribe$ = new Subject();

  constructor(
      private cartService: CartService,
      private globalService: GlobalService,
      private configService: ConfigService,
      private cookieService: CookieService
  ) {

    this.globalService.getTranslation('orderScreenLabels', 'order-message').pipe(takeUntil(this.ngUnsubscribe$)).subscribe(message => this.deliveryMessage = message);
  }

  get product() {
    return this._product;
  }

  @Input()
  set product(product) {
    this._product = product;

    if (this.selectedPlan && this.selectedPlan.product.id !== product.id) {
      this.selectedPlan = null;
    }

    if (!this.selectedPlan) {
      this.selectedPlan = this.product.plans.find((plan) => plan.default);
    }

    if (this.selectedPlan.product.grouping === 'blood' &&
        this.selectedPlan.name.toLowerCase().includes('quarterly')) {
      this.showQuarterlyMessage = true;
    }
  }

  setPlan(plan) {
    this.selectedPlan = plan;
  }

  ngOnInit() {
    this.configService.getConfig().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(config => {
      if (config.country === 'GB') {
        this.showFreeDelivery = true;
      }
    });
  }

  add() {

    this.globalService.startLoading();

    if (this.offerCoupon) {
      this.cartService.applyCoupon(this.offerCoupon).then(() => {
        this.globalService.stopLoading();
        this.cartService.showCart();
      }, () => this.globalService.stopLoading());
    } else {
      this.cartService.addPlan(this.selectedPlan, 1).then(() => {
          this.globalService.stopLoading();
          this.cartService.showCart();
      }, () => this.globalService.stopLoading());
    }

  }

  claimFreeTrial() {
    this.globalService.startLoading();

    if (this.selectedPlan.product.grouping === 'essential-one') {
      if (this.cookieService.getCookie('essentialOnePartnership') === 'essential-one-price-test') {
        this.cartService.applyCoupon('TE1PT').then(() => {
          this.globalService.stopLoading();
          this.cartService.showCart();
        });
      } else {
        this.cartService.redeemTrial(this.cookieService.getCookie('essentialOnePartnership'), 'essential-one', this.selectedPlan).then(() => {
          this.globalService.stopLoading();
          this.cartService.showCart();
        }, () => this.globalService.stopLoading());
      }
    }

    if (this.selectedPlan.product.grouping === 'personalised') {
      this.cartService.applyCoupon('VITS2020FT').then(() => {
        this.cartService.showCart();
      });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
