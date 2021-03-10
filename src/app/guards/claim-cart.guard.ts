import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CartService} from '../services/cart.service';
import {GlobalService} from '../services/global.service';
import {CookieService} from '../services/cookie.service';

@Injectable({
    providedIn: 'root'
})
export class ClaimCartGuard implements CanActivate {

    constructor(
        private cartService: CartService,
        private router: Router,
        private globalService: GlobalService,
        private cookieService: CookieService
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.globalService.isBrowser()) {
            return new Promise((resolve, reject) => {

                if (next.params.cartid) {
                    this.cookieService.setCookie('cartid', next.params.cartid);
                    this.globalService.refetchInit().then(() => {
                        this.cartService.showCart();
                        this.router.navigate(['/'], { queryParams: next.queryParams });
                        resolve();
                    });
                } else {
                    this.cartService.showCart();
                    this.router.navigate(['/'], { queryParams: next.queryParams });
                    resolve();
                }

            });
        }

    }

}
