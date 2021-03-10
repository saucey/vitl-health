import {Component, OnDestroy, OnInit} from '@angular/core';
import {CheckoutService} from '../../services/checkout.service';
import {CartService} from '../../../../services/cart.service';
import {Cart} from '../../../../classes/cart';
import {GlobalService} from '../../../../services/global.service';
import {Router} from '@angular/router';
import {User} from '../../../../classes/user';
import {AuthService} from '../../../../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    templateUrl: './review.component.html',
    styles: []
})

export class ReviewComponent implements OnInit, OnDestroy {

    cart: Cart;
    user: User;
    canPay = false;
    private ngUnsubscribe$ = new Subject();

    constructor(
        private checkoutService: CheckoutService,
        private cartService: CartService,
        private authService: AuthService,
        private globalService: GlobalService,
        private router: Router
    ) {}

    ngOnInit() {
        this.checkoutService.setProgress(4);
        this.cartService.getCart().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(cart => {
            this.cart = cart;
            if (this.cart.deliveryAddress && this.cart.paymentMethod) {
                this.canPay = true;
            }
        });
        this.authService.getUser().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(user => this.user = user);
    }

    editDeliveryAddress() {
        if (this.user.deliveryAddresses.length) {
            this.router.navigateByUrl('/checkout/delivery/select');
        } else {
            this.router.navigateByUrl('/checkout/delivery');
        }
    }

    editPaymentMethod() {
        if (this.user.paymentMethods.length) {
            this.router.navigateByUrl('/checkout/payment/select');
        } else {
            this.router.navigateByUrl('/checkout/payment');
        }
    }

    pay() {
        this.canPay = false;
        this.globalService.startLoading();
        this.cartService.orderCart().then((confirmation) => {
            this.globalService.stopLoading();
            this.checkoutService.completeOrder(confirmation);
        }, () => {
            this.canPay = true;
            this.globalService.stopLoading();
        });
    }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
