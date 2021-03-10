import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CartService} from '../../../../services/cart.service';
import {Cart} from '../../../../classes/cart';
import {GlobalService} from '../../../../services/global.service';
import {CheckoutService} from '../../../checkout/services/checkout.service';
import {StripeService} from '../../../../services/stripe.service';
import {ConfigService} from '../../../../services/config.service';
import {getCurrencySymbol} from '@angular/common';
import {AuthService} from '../../../../services/auth.service';
import {User} from '../../../../classes/user';
import {ModalService, ModalTypes} from '../../services/modal.service';
import {ModalComponent} from '../modal.component';
import {SegmentService} from '../../../../services/segment.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styles: []
})
export class BasketComponent implements OnInit, OnDestroy {

  @ViewChild('mobilePayment') mobilePaymentElement: ElementRef;

  config: any;
  user: User;
  cart: Cart;
  paymentRequest: any;
  termsAccepted = false;
  canUsePaymentRequest = false;
  canUpdatePaymentRequest = true;

  lottieConfig = {
    path: 'https://static.vitl.com/assets/loader.json',
    autoplay: true,
    loop: true
  };

  private ngUnsubscribe$ = new Subject();

  constructor(
      private globalService: GlobalService,
      private cartService: CartService,
      private checkoutService: CheckoutService,
      private stripeService: StripeService,
      private modalService: ModalService,
      private authService: AuthService,
      private segmentService: SegmentService
  ) { }

  ngOnInit() {

    this.globalService.initCall().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(({data}) => {
      this.user = data.user;
      this.config = data.config;
      this.cart = data.cart;
      if (this.user && this.user.type === 'user') {
        this.termsAccepted = true;
      }
      if (this.cart && this.cart.count) {
          if (this.paymentRequest) {
            this.updatePaymentRequest(this.cart);
          } else if (!this.cart.purchaseAcknowledgement) {
            this.loadPaymentRequest(this.cart);
          }
      } else if (this.paymentRequest) {
        this.paymentRequest = null;
      }
    });
  }

  isLoading() {
    return this.globalService.reloading;
  }

  loadPaymentRequest(cart: Cart) {
    this.stripeService.createPaymentRequest(cart.total).then((request: any) => {
      this.paymentRequest = request;
      this.paymentRequest.canMakePayment().then((result) => {
        this.canUsePaymentRequest = result ? true : false;

        if (this.canUsePaymentRequest) {
          this.stripeService.getPaymentRequestButton(this.paymentRequest).then((prButton: any) => {
            prButton.mount(this.mobilePaymentElement.nativeElement);
            this.addEventListeners(prButton);
          });
        }
      });
    });
  }

  updatePaymentRequest(cart: Cart) {
    if (this.canUpdatePaymentRequest) {
      this.stripeService.updatePaymentRequest(this.paymentRequest, cart.total);
    }
  }

  addEventListeners(prButton: any) {
    this.paymentRequest.on('token', (ev) => {
      this.checkoutService.processPaymentRequest(ev).then(() => {
        ev.complete('success');
        this.cartService.hideCart();
      }, () => ev.complete('fail'));
    });
    this.paymentRequest.on('shippingaddresschange', (ev) => {
      this.cartService.setCountry(ev.shippingAddress.country).then(() => {
        ev.updateWith({
          status: 'success',
          shippingOptions: [
            {
              label: this.cart.shippingMethod,
              amount: this.cart.shippingCost * 100
            }
          ]
        });
      }, () => this.paymentRequest.abort());
    });
    prButton.on('click', (ev) => {
      this.canUpdatePaymentRequest = false;
    });
    this.paymentRequest.on('cancel', (ev) => {
      this.canUpdatePaymentRequest = true;
    });
  }

  increaseQuantity(item) {
    this.globalService.startLoading();
    this.cartService.increaseQuantity(item).then(() => {
      this.globalService.stopLoading();
    }, () => this.globalService.stopLoading());
  }

  decreaseQuantity(item) {
    this.globalService.startLoading();
    this.cartService.decreaseQuantity(item).then(() => {
      this.globalService.stopLoading();
    }, () => this.globalService.stopLoading());
  }

  deleteItem(item) {
    this.globalService.startLoading();
    this.cartService.deleteItem(item).then(() => {
      this.globalService.stopLoading();
    }, () => this.globalService.stopLoading());
  }

  addCoupon() {
    this.cartService.addCoupon();
  }

  getCurrencySymbol() {
    return getCurrencySymbol(this.config.currency, 'narrow');
  }

  changeCurrency() {
    this.globalService.changeCurrency().then(() => {
      this.globalService.startLoading();
      this.globalService.refetchInit().then(() => {
        this.globalService.stopLoading();
      });
    });
  }


  goToCheckout() {
    if (this.cart && this.cart.purchaseAcknowledgement) {
      const modal = this.modalService.create(ModalTypes.Content, {
        data: {
          content: this.cart.purchaseAcknowledgement
        }
      });
      this.globalService.events.filter((event) => event.type === 'requestDismissed').pipe(takeUntil(this.ngUnsubscribe$)).subscribe((data: any) => {
        modal.instance.close();
      });
      this.globalService.events.filter((event) => event.type === 'requestAccepted').pipe(takeUntil(this.ngUnsubscribe$)).subscribe((data: any) => {
        this.globalService.startLoading();
        this.authService.acceptRequest(data.data).then(() => {

          this.globalService.refetchInit().then(() => {
            this.globalService.stopLoading();
            modal.instance.close();
          });
        });
      });
    } else {
      this.globalService.startLoading();
      this.segmentService.initCheckout(this.cart, this.config.currency);

      // simulate thinking
      setTimeout(() => {
        this.checkoutService.nextScreen().then(() => this.cartService.hideCart());
      }, 1500);
    }
  }

  getCheckoutCopy() {
    if (this.paymentRequest) {
      return 'Pay by card';
    } else if (this.cart && this.cart.purchaseAcknowledgement) {
      return 'Continue';
    } else {
      return 'Checkout';
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
