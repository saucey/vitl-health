import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CartService} from '../services/cart.service';
import {GlobalService} from '../services/global.service';
import {AuthService} from '../services/auth.service';
import {ModalService} from '../modules/modal/services/modal.service';

@Injectable({
    providedIn: 'root'
})
export class ClaimCouponGuard implements CanActivate {

    constructor(
        private cartService: CartService,
        private router: Router,
        private globalService: GlobalService,
        private authService: AuthService,
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.globalService.isBrowser()) {
            return new Promise((resolve, reject) => {
                this.cartService.saveCoupon(next.params.coupon).then(() => {
                    this.cartService.showCart();
                    this.router.navigate(['/'], {queryParams: next.queryParams});
                    resolve();
                }, () => {
                    const sub = this.authService.getUser().subscribe((user) => {
                        sub.unsubscribe();
                        if (user && user.type === 'user') {
                            resolve();
                            this.router.navigateByUrl('/');
                        } else {
                            reject();
                        }
                    });

                });

            });
        }

    }

}
