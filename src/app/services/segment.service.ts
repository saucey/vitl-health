import {Injectable, EventEmitter, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  identifyUser(event) {
    if (isPlatformBrowser(this.platformId)) {
      const user = event.data;

      let traits = {
        name: user.firstName,
        email: user.email,
      };

      Object.keys(localStorage).filter(key => key.startsWith('utm_')).map(key => {
        traits[key] = localStorage.getItem(key);
      });

      (window as any).analytics.identify(user.segment_id, traits);
    }
  }


  pageVisit(name: string) {
    if (isPlatformBrowser(this.platformId)) {
      let properties = {};

      Object.keys(localStorage).filter(key => key.startsWith('utm_')).map(key => {
        properties[key] = localStorage.getItem(key);
      });

      (window as any).analytics.page(name, properties);
    }
  }


  initCheckout(cart, currency) {
    if (isPlatformBrowser(this.platformId)) {
      let cartRrp = 0;
      let items = [];

      cart.items.forEach(function (item) {
        cartRrp += item.subtotal;
        let rrp = SegmentService.round(item.subtotal, 2);
        let revenue = SegmentService.round(item.total, 2);

        items.push({
          id: item.plan.product.id,
          category: item.plan.product.grouping,
          name: item.plan.product.name,
          quantity: item.quantity,
          rrp: rrp,
          revenue: revenue,
          discount: SegmentService.round(item.subtotal - item.total, 2)
        });

      });

      let segmentData = {
        cart_id: cart.cartid,
        rrp: cartRrp,
        total: cart.total,
        shipping: cart.shippingCost,
        discount: cart.discount ? cart.discount.discount : 0,
        coupon: cart.discount ? cart.discount.discountLabel : null,
        currency: currency,
        products: items,
      };

      (window as any).analytics.track('Initiate checkout', segmentData);
    }
  }

  checkoutStepViewed(step: number, cart_id: string) {
    if (isPlatformBrowser(this.platformId)) {
      (window as any).analytics.track('Checkout step viewed', {
        cart_id: cart_id,
        step: step
      });
    }
  }

  checkoutStepCompleted(step: number, cart_id: string) {
    if (isPlatformBrowser(this.platformId)) {
      (window as any).analytics.track('Checkout step completed', {
        cart_id: cart_id,
        step: step
      });
    }
  }

  paymentMethodAdded(brand: string, last_4: string, cart_id: string) {
    if (isPlatformBrowser(this.platformId)) {
      (window as any).analytics.track('Payment info entered', {
        cart_id: cart_id,
        brand: brand,
        last_4: last_4
      });
    }
  }


  couponEntered(coupon_code: string, cart_id: string) {
    if (isPlatformBrowser(this.platformId)) {
      (window as any).analytics.track('Coupon entered', {
        cart_id: cart_id,
        coupon: coupon_code.toUpperCase()
      });
    }
  }

  couponApplied(coupon_code: string, discount: number, cart_id: string) {
    if (isPlatformBrowser(this.platformId)) {
      (window as any).analytics.track('Coupon applied', {
        cart_id: cart_id,
        coupon: coupon_code.toUpperCase(),
        discount: discount
      });
    }
  }

  couponDenied(coupon_code: string, reason: string, cart_id: string) {
    if (isPlatformBrowser(this.platformId)) {
      (window as any).analytics.track('Coupon denied', {
        cart_id: cart_id,
        coupon: coupon_code.toUpperCase(),
        reason: reason,
      });
    }
  }

  communicationPreferencesUpdated(preferences) {
    if (isPlatformBrowser(this.platformId)) {
      const userTraits = JSON.parse(localStorage.getItem('ajs_user_traits'));

      (window as any).analytics.track('Communication preferences updated', {
        email: userTraits.email,
        preferences: preferences
      });
    }
  }

  setConsultationProduct(product) {
    window.analytics.identify({
      consultation_product: product
    });
  }


  // @TODO somebody please change this to something better
  private static round(value, exp) {
    if (typeof exp === 'undefined' || +exp === 0)
      return Math.round(value);

    value = +value;
    exp = +exp;

    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
  }
}

