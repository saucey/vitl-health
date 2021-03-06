import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CanAccountConfirmationGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate (
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.authService.getUser().map((user) => {
            if (user && user.type === 'user') {
                return true;
            } else {
                this.router.navigateByUrl('/kit/account');
                return false;
            }
        });

    }

}
