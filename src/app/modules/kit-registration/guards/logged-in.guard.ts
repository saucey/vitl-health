import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.authService.getUser().map((user) => {
            if (user && user.type === 'user') {
                this.router.navigateByUrl('/kit/account/confirmation');
                return false;
            } else {
                return true;
            }
        });

    }
}