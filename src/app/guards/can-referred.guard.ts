import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {CartService} from '../services/cart.service';

@Injectable({
    providedIn: 'root'
})
export class CanReferredGuard implements CanActivate {

    constructor(
        private cartService: CartService,
        private router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return new Promise((resolve, reject) => {
            this.cartService.saveCoupon(next.paramMap.get('token')).then(
                () => resolve(true),
                () => {
                    this.router.navigateByUrl('/');
                    reject(false);
                }
            );
        });

    }

}
