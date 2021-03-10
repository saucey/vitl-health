import {ConfigService} from '../../../services/config.service';

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {CartService} from '../../../services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-theone-results-order',
  templateUrl: './theone-results-order.component.html',
  styles: []
})
export class TheoneResultsOrderComponent implements OnInit, OnDestroy {

  @Input() user;
  @Input() product;
  @Input() partnership = 'generic';
  @Input() freeTrial;
  plan: any;
  freeDelivery = false;
  private ngUnsubscribe$ = new Subject();

  constructor(
      private globalService: GlobalService,
      private cartService: CartService,
      private configService: ConfigService
  ) { }

  ngOnInit() {

      this.globalService.events.filter(event => event.type === 'headerCta').pipe(takeUntil(this.ngUnsubscribe$)).subscribe((event) => {
          this.addToBasket();
      });

      this.plan = this.product.plans.find(plan => plan.default);

      this.configService.getConfig().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(config => {
          if (config.country === 'GB') {
              this.freeDelivery = true;
          }
      });

  }

  addToBasket() {

      if (this.freeTrial) {
          this.claimTrial();
      } else {
          this.claimPlan();
      }

  }

  claimTrial() {
    this.globalService.startLoading();
    if (this.partnership == 'essential-one-referral') {
      this.cartService.saveCoupon(localStorage.getItem('referredTEOCoupon')).then(() => {
        this.globalService.stopLoading();
        this.cartService.showCart();
      },
        () => {
          this.globalService.stopLoading();
        });
    } else if (this.partnership == 'essential-one-price-test') {
      this.cartService.applyCoupon('TE1PT').then(() => {
        this.globalService.stopLoading();
        this.cartService.showCart();
      });
    } else {
      this.cartService.redeemTrial(this.partnership, 'essential-one', this.plan).then(() => {
        this.globalService.stopLoading();
        this.cartService.showCart();
      }, () => this.globalService.stopLoading());
    }
  }

  claimPlan() {
    this.globalService.startLoading();
    this.cartService.addPlan(this.plan, 1).then(() => {
      if (this.partnership == 'essential-one-save-50') {
        this.cartService.applyCoupon('TE150').then(() => {this.globalService.stopLoading(); this.cartService.showCart(); });
      } else {
        this.globalService.stopLoading();
        this.cartService.showCart();
      }
    }, () => this.globalService.stopLoading());
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
