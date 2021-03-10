import { Injectable } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {GlobalService} from '../../../services/global.service';
import {CartService} from '../../../services/cart.service';
import {Router} from '@angular/router';
import {User} from '../../../classes/user';
import {StripeService} from '../../../services/stripe.service';
import {Cart} from '../../../classes/cart';
import {ModalService} from '../../modal/services/modal.service';
import {CookieService} from '../../../services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  user: User;
  cart: Cart;

  cart_id;

  constructor(
      private globalService: GlobalService,
      private authService: AuthService,
      private cartService: CartService,
      private router: Router,
      private stripeService: StripeService,
      private modalService: ModalService
  ) {
    this.authService.getUser().subscribe(user => this.user = user);
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  progress = 1;
  confirmation: any;

  getProgress() {
    return this.progress;
  }

  setProgress(progress: number) {
    this.progress = progress;
    this.globalService.emitTrackingEvent('checkoutProgress', {
      step: progress,
      cart: this.cart
    });
  }

  signIn(email: string, password: string) {
    this.globalService.startLoading();
    this.authService.login(email, password).then(() => {
        this.cartService.associateCart().then(() => {
          this.nextScreen();
        });
    }, () => this.globalService.stopLoading());
  }

  checkoutAsGuest(email: string, firstName: string) {
    this.globalService.startLoading();
    if (this.user) {
      this.authService.promoteLead(email, firstName).then(() => {
        this.cartService.associateCart();
        this.nextScreen();
      }, () => this.globalService.stopLoading());
    } else {
      this.authService.registerLead('checkout').then(() => {
        this.authService.promoteLead(email, firstName).then(() => {
          this.cartService.associateCart();
          this.nextScreen();
        }, () => this.globalService.stopLoading());
      });
    }
  }

  addAddress(address: any) {
    this.globalService.startLoading();
    this.cartService.addDeliveryAddress(address).then((res) => {
      this.globalService.refetchInit().then(() => this.nextScreen());
    }, () => this.globalService.stopLoading());
  }

  setAddress(address: any) {
    this.globalService.startLoading();
    this.cartService.setDeliveryAddress(address.id).then((res) => {
      this.nextScreen();
    }, () => this.globalService.stopLoading());
  }

  addPaymentMethod(card: any, name: string, postcode: string) {
    this.globalService.startLoading();
    this.stripeService.createToken(card).then(({error, token}) => {
      if (error) {
        this.modalService.alert(error.message);
        this.globalService.stopLoading();
      } else {
        this.cartService.addPaymentMethod({
          type: 'card',
          token: token.id,
          name: name,
          postcode: postcode
        }).then(() => {
          this.globalService.emitTrackingEvent('paymentMethodAdded', {
            cart_id: this.cart.cartid,
            brand: token.card.brand,
            last_4: token.card.last4
          });
          this.globalService.refetchInit().then(() => this.nextScreen());
        }, () => this.globalService.stopLoading());
      }
    });
  }

  setPaymentMethod(method: any) {
    this.globalService.startLoading();
    this.cartService.setPaymentMethod(method.id).then((res) => {
      this.nextScreen();
    }, () => this.globalService.stopLoading());
  }

  processPaymentRequest(ev: any) {

    return new Promise((resolve, reject) => {
      if (this.user && this.user.type === 'user') {

        this.submitPaymentRequest(ev, this.user.firstName).then(() => resolve(), () => reject());

      } else if (this.user) {

        this.authService.promoteLead(ev.payerEmail, ev.payerName.split(' ').shift()).then(() => {
          this.submitPaymentRequest(ev, ev.payerName).then(() => resolve(), () => reject());
        }, () => reject());

      } else {

        this.authService.registerLead('basket').then(() => {
          this.authService.promoteLead(ev.payerEmail, ev.payerName.split(' ').shift()).then(() => {
            this.submitPaymentRequest(ev, ev.payerName).then(() => resolve(), () => reject());
          }, () => reject());
        }, () => reject());

      }
    });

  }

  submitPaymentRequest(ev, name) {

    return new Promise((resolve, reject) => {
      this.cartService.addDeliveryAddress({
        firstName: ev.shippingAddress.recipient.split(' ').shift(),
        lastName: ev.shippingAddress.recipient.split(' ').pop(),
        address: ev.shippingAddress.addressLine.join(', '),
        town: ev.shippingAddress.city,
        county: ev.shippingAddress.region,
        postcode: ev.shippingAddress.postalCode,
        country: ev.shippingAddress.country
      }).then(() => {
        this.cartService.addPaymentMethod({
          type: ev.methodName,
          token: ev.token.id,
          name: name
        }).then(() => {
          this.cartService.orderCart().then((confirmation) => {
            this.completeOrder(confirmation);
            resolve(true);
          }, () => reject());
        }, () => reject());
      }, () => reject());
    });

  }

  completeOrder(confirmation) {
    this.confirmation = confirmation;
    this.globalService.emitTrackingEvent('orderProcessed', confirmation);
    this.globalService.emitTrackingEvent('checkoutStepCompleted', {
      cart_id: this.globalService.getCartId(),
      step: 4
    });
    this.router.navigateByUrl('/confirmation');
  }

  getConfirmation() {
    return this.confirmation;
  }

  nextScreen() {
    this.globalService.emitTrackingEvent("checkoutStepCompleted", {
      cart_id: this.cart.cartid,
      step: this.progress,
    });

    return this.router.navigateByUrl(this.cartService.getNextScreen());
  }

}
