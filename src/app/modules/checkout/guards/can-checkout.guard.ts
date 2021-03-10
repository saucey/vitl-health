import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {CartService} from '../../../services/cart.service';
import {AuthService} from '../../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanCheckoutGuard implements CanActivate {

  cart;

  constructor(
      private cartService: CartService,
      private authService: AuthService,
      private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return new Promise((resolve, reject) => {

          const sub = this.cartService.getCart().subscribe((cart) => {

              sub.unsubscribe();

              if (cart && cart.count && !cart.purchaseAcknowledgement) {
                  if (next['_routerState'].url !== this.cartService.getNextScreen()) {
                      this.router.navigateByUrl(this.cartService.getNextScreen());
                  }
                  resolve(true);
              } else {
                  this.cartService.showCart();
                  this.router.navigateByUrl('/');
                  reject();
              }

          });

      });

  }

}
