import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {ApiService} from './api.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import * as cartQueries from '../queries/cart';
import {Cart} from '../classes/cart';
import {AuthService} from './auth.service';
import {GlobalService} from './global.service';
import {CookieService} from './cookie.service';
import {User} from '../classes/user';
import {ModalService, ModalTypes} from '../modules/modal/services/modal.service';
import {ProductService} from './product.service';
import {ModalComponent} from '../modules/modal/components/modal.component';
import {Plan} from '../classes/product';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  user: User;
  cart: Cart;
  modal;
  isNewCart = false;

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private modalService: ModalService,
    private globalService: GlobalService,
    private cookieService: CookieService,
    private productService: ProductService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.authService.getUser().subscribe((user) => this.user = user);
    this.getCart().take(1).subscribe((cart) => {
      this.cart = cart;
    });
  }

  getCartId() {
    return this.globalService.getCartId();
  }

  getCart() {
    return this.globalService.initCall().map(({data}) => data.cart);
  }

  loadCart() {
    return this.api.query(cartQueries.Cart, {cartid: this.getCartId()}).map(({data}) => data.cart);
  }

  showCart() {
    this.modal = this.modalService.create(ModalTypes.Basket, {
      title: 'Your basket',
      titleDivider: false
    });
  }

  hideCart() {
    this.modalService.historyRestored = true;
    this.modalService.closeModal(this.modal);
  }

  modifyCart(query, property, params) {

    return this.api.mutate(query, params, (store, {data}) => {
      const cart = data[property];
      this.cart = cart;
      this.isNewCart = this.getCartId() === '';

      this.setCart(cart);
      this.globalService.updateInitCall(store, 'cart', cart);

      // show upsell popup once
      if (this.cart && this.isNewCart) {
        this.handleUpsell();
      }
    }).toPromise();

  }

  addPlan(plan, quantity: number = 1) {
    return this.modifyCart(cartQueries.AddPlan, 'cart_addPlan', {
      cartid: this.getCartId(),
      planid: plan.id,
      quantity: quantity
    }).then(
      () => {
        let rrp = plan.rrp.replace('£ ').replace('€ ').replace('$ ');

        this.globalService.emitTrackingEvent('productAddedToCart', {
          id: plan.product.id,
          name: plan.product.name,
          category: plan.product.grouping,
          rrp: plan.rrp,
          revenue: plan.offerPrice ? plan.offerPrice : plan.rrp
        });
        this.globalService.emitTrackingEvent('addPlan', {
          plan: plan,
          quantity: quantity
        });
      },
      (reason) => {
        throw reason;
      }
    );

  }

  redeemTrial(partnership: string, campaign: string, plan: Plan) {

    return this.modifyCart(cartQueries.RedeemTrial, 'cart_redeemTrial', {
      cartid: this.getCartId(),
      partnership: partnership,
      campaign: campaign,
      planid: plan.id
    });

  }

  addCoupon() {

    return new Promise((resolve, reject) => {
      this.modalService.create(ModalTypes.Input, {
        title: 'Enter your promo code',
        data: {
          value: '',
          placeholder: 'Promo code'
        },
        ctas: [
          {label: 'Submit'}
        ],
        callback: (modal: ModalComponent, couponcode: string) => {
          this.applyCoupon(couponcode).then(() => {
              modal.close();
              resolve();
            },
            (reason) => {
              if (reason.message.includes('You must be logged in to redeem a personalised coupon')) {
                modal.close();
              }
              reject(reason);
            }
          );
        }
      });
    });

  }

  showTakeMeToLoginModal(postLoginUrl) {
    this.modalService.create(ModalTypes.Confirm, {
      title: 'Please login',
      data: {
        message: 'Please login in order to redeem a personalised coupon'
      },
      ctas: [
        {
          label: 'Take me to login', callback: (modal: ModalComponent) => {
            modal.close();

            this.authService.setPostLoginRedirect(postLoginUrl);
            this.router.navigateByUrl('/login');
          }
        },
      ]
    });
  }

  handleUpsell() {
    const hasVitaminDInCart = this.cart.items.filter((item) => item.plan.product.grouping === 'vitamin-d' || item.plan.product.grouping === 'vitamin-d-3-for-2').length > 0;
    if (!hasVitaminDInCart) {
        this.productService.getProductById(32).subscribe(product => this.showUpsellPopup(product));
    }
    // console.log(this.cart.items)
    // const hasImmunityInCart = this.cart.items.filter((item) => item.plan.product.id === '72').length > 0;
    // if (!hasImmunityInCart) {
    //     this.productService.getProductById(72).subscribe(product => this.showUpsellPopup(product));
    // }

    this.isNewCart = false;
  }

  showUpsellPopup(product) {
    return new Promise((resolve, reject) => {
      this.modalService.create(ModalTypes.Upsell, {
        data: {
          ...product
        },
        ctas: [
          {label: 'Add to basket'}
        ],
        callback: (modal: ModalComponent, couponcode: string) => {
          this.productService.getDefaultPlan(product.slug).subscribe(plan => {
            this.addPlan(plan).then(() => {
              modal.close();
              resolve();
            });
          });
        }
      });
    });
  }

  applyCoupon(couponcode: string) {
    return new Promise((resolve, reject) => {
      if (couponcode) {
        this.globalService.startLoading();
        this.saveCoupon(couponcode).then(() => {
          this.globalService.stopLoading();
          resolve();
        }, (reason) => {
          this.globalService.stopLoading();
          reject(reason);
        });
      } else {
        this.modalService.alert('Please enter a couponcode');
      }
    });
  }

  saveCoupon(couponcode: string) {
    this.globalService.emitTrackingEvent('couponEntered', {
      cart_id: this.getCartId(),
      coupon_code: couponcode
    });

    return this.modifyCart(cartQueries.AddCoupon, 'cart_addCoupon', {
      cartid: this.getCartId(),
      couponcode: couponcode
    }).then(
      () => this.globalService.emitTrackingEvent('couponApplied', {
        cart_id: this.globalService.getCartId(),
        coupon_code: couponcode,
        discount: this.cart.discount ? this.cart.discount.discount : 0,
      }),
      (reason) => {
        /*
         * TODO Uncomment this code block once a fix has been found
         * It doesn't allow the next code block to run, therefore
         * no "login" popup is presented to the customer
         */
        // this.globalService.emitTrackingEvent('couponDenied', {
        //   cart_id: this.cart.cartid,
        //   coupon_code: couponcode,
        //   reason: reason.message
        // });

        if (reason.message.includes('You must be logged in to redeem a personalised coupon')) {
          const nextUrl = '/basket/claimdiscount/' + couponcode;
          this.showTakeMeToLoginModal(nextUrl);
        }

        throw reason;
      });

  }

  addDeliveryAddress(address) {

    return this.modifyCart(cartQueries.AddDeliveryAddress, 'cart_addDeliveryAddress', {
      cartid: this.getCartId(),
      address: address
    });

  }

  setDeliveryAddress(id: number) {

    return this.modifyCart(cartQueries.SetDeliveryAddress, 'cart_setDeliveryAddress', {
      cartid: this.getCartId(),
      id: id
    });

  }

  setCountry(country: string) {

    return this.globalService.setCartCountry(country);

  }

  addPaymentMethod(paymentMethod) {

    return new Promise((resolve, reject) => {
      this.authService.loadUser().subscribe((user) => {
        this.storePaymentMethod(paymentMethod).then(() => resolve(), () => reject());
      });
    });
  }

  setPaymentMethod(id: number) {

    return this.modifyCart(cartQueries.SetPaymentMethod, 'cart_setPaymentMethod', {
      cartid: this.getCartId(),
      id: id,
      setDefault: false
    });

  }

  storePaymentMethod(paymentMethod) {

    return this.modifyCart(cartQueries.AddPaymentMethod, 'cart_addPaymentMethod', {
      cartid: this.getCartId(),
      paymentMethod: paymentMethod
    });

  }

  increaseQuantity(item) {

    return this.modifyCart(cartQueries.UpdateItem, 'cart_updateItem', {
      cartid: this.getCartId(),
      itemid: item.itemid,
      quantity: item.quantity + 1
    });

  }

  decreaseQuantity(item) {

    return this.modifyCart(cartQueries.UpdateItem, 'cart_updateItem', {
      cartid: this.getCartId(),
      itemid: item.itemid,
      quantity: item.quantity - 1
    });

  }

  associateCart() {

    return this.modifyCart(cartQueries.AssociateCart, 'cart_associate', {
      cartid: this.getCartId()
    });

  }

  orderCart() {

    return new Promise((resolve, reject) => {

      this.api.mutate(cartQueries.OrderCart, {
        cartid: this.getCartId(),
        leadAttribution: this.globalService.getUtmParams()
      }).toPromise().then(({data}) => {
        this.clearCart().then(() => {
          resolve(data.cart_order);
        });
      }, () => reject());

    });

  }

  deleteItem(item) {
    return this.modifyCart(cartQueries.DeleteItem, 'cart_deleteItem', {
      cartid: this.getCartId(),
      itemid: item.itemid
    });
  }

  setCart(cart: Cart) {
    if (cart) {
      this.cookieService.setCookie('cartid', cart.cartid);
    }
  }

  clearCart() {
    return new Promise((resolve) => {
      this.cookieService.clearCookie('cartid');
      this.globalService.refetchInit().then(() => resolve(true), () => resolve(false));
    });
  }

  getNextScreen() {

    if (this.user && this.user.type === 'user') {
      if (this.cart.deliveryAddress) {
        if (this.cart.paymentMethod) {
          return '/checkout/review';
        } else {
          if (this.user.paymentMethods.length) {
            return '/checkout/payment/select';
          } else {
            return '/checkout/payment';
          }
        }
      } else {
        if (this.user.deliveryAddresses.length) {
          return '/checkout/delivery/select';
        } else {
          return '/checkout/delivery';
        }
      }

    } else {

      return '/checkout';

    }

  }

}
