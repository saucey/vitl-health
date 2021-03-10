import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CartService} from '../services/cart.service';
import {GlobalService} from '../services/global.service';
import {ProductService} from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimProductGuard implements CanActivate {

    constructor(
        private cartService: CartService,
        private router: Router,
        private globalService: GlobalService,
        private productService: ProductService
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.globalService.isBrowser()) {
            return new Promise((resolve, reject) => {
                this.productService.getPlan(next.params.plan).subscribe((plan) => {
                    this.cartService.addPlan(plan).then(() => {
                        this.cartService.showCart();
                        this.router.navigate(['/'], { queryParams: next.queryParams });
                        resolve();
                    }, () => {
                        this.router.navigateByUrl('/');
                    });
                });
            });
        }

    }

}
