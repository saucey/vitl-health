import {Directive, OnChanges, ElementRef, HostListener, Input, DoCheck, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {CheckoutService} from '../services/checkout.service';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../classes/user';
import {CartService} from '../../../services/cart.service';
import {Cart} from '../../../classes/cart';

@Directive({
  selector: '[appCheckoutProgress]'
})
export class ProgressDirective implements OnInit, DoCheck {

  @Input() progress;
  @Input() route;
  @Input() routes;
  active = false;
  user: User;
  cart: Cart;

  @HostListener('click', [ '$event' ]) onClick(event: any) {
    this.processClick();
  }

  constructor(
      private el: ElementRef,
      private checkoutService: CheckoutService,
      private router: Router,
      private authService: AuthService,
      private cartService: CartService
  ) { }

  ngOnInit() {
      this.authService.getUser().subscribe(user => this.user = user);
      this.cartService.getCart().subscribe(cart => this.cart = cart);
  }

  ngDoCheck() {
      if (this.cart) {
          if (this.checkoutService.getProgress() === this.progress) {
              this.el.nativeElement.classList.remove('progress__section--visited');
              this.el.nativeElement.classList.add('progress__section--active');
          } else if (this.checkoutService.getProgress() > this.progress) {
              this.el.nativeElement.classList.remove('progress__section--active');
              this.el.nativeElement.classList.add('progress__section--visited');
          } else {
              this.el.nativeElement.classList.remove('progress__section--active');
              this.el.nativeElement.classList.remove('progress__section--visited');
              if (this.isEnabled()) {
                  this.el.nativeElement.classList.add('progress__section--visited');
              }
          }
      }
  }

  isEnabled() {
      let res = false;
      switch (this.route) {
          case 'signin' : res = true; break;
          case 'delivery' : res = (this.cart.deliveryAddress || (this.user && this.user.type === 'user') ? true : false); break;
          case 'payment' : res = (this.cart.paymentMethod || (this.cart.deliveryAddress && this.user && this.user.type === 'user') ? true : false); break;
          case 'review' : res = (this.cart.deliveryAddress && this.cart.paymentMethod ? true : false); break;
      }
      return res;
  }

  processClick() {
      if (this.isEnabled()) {
          let url = '';
          switch (this.route) {
              case 'signin' : url = '/checkout'; break;
              case 'delivery' : url = (this.user.deliveryAddresses.length ? '/checkout/delivery/select' : '/checkout/delivery'); break;
              case 'payment' : url = (this.user.paymentMethods.length ? '/checkout/payment/select' : '/checkout/payment'); break;
              case 'review' : url = '/checkout/review'; break;
          }
          this.router.navigateByUrl(url);
      }
  }

}
