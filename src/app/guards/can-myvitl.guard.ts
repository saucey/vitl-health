import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, from } from 'rxjs';
import { GlobalService } from '../services/global.service';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CanMyvitlGuard implements CanActivate {

    constructor(
        private globalService: GlobalService,
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

            return new Promise((resolve) => {
                    this.globalService.refetchInit().then(() => {
                    const authSub = this.authService.getUser().subscribe((user) => {
                        authSub.unsubscribe();
                        if (user && user.type === 'user') {
                            resolve(true);
                        } else {
                            this.authService.setPostLoginRedirect(state.url);
                            this.router.navigateByUrl('/login');
                            resolve(true);
                        }
                    });
                });
            });
    }

}
