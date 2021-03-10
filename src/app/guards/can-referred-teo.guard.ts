import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CanReferredTEOGuard implements CanActivate {

    constructor(
        private router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return new Promise((resolve, reject) => {
            const token = next.paramMap.get('token');

            if (token) {
                localStorage.setItem('referredTEOCoupon', token);
                resolve(true);
            } else {
                this.router.navigateByUrl('/');
                reject(false);
            }
        });

    }

}
