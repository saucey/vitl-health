import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import 'rxjs/add/operator/map';
import {GlobalService} from '../services/global.service';

@Injectable({
    providedIn: 'root'
})
export class CanExchangeGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router, private globalService: GlobalService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {

        if (this.globalService.isBrowser()) {

            return this.auth.magicLogin(next.paramMap.get('id'), next.paramMap.get('token')).then(() => {
                if (next.firstChild.url) {
                    this.router.navigateByUrl( '/' + next.firstChild.url.join('/') );
                } else {
                    this.router.navigateByUrl('/myvitl');
                }
            }, () => this.router.navigateByUrl('/'));

        }

    }

}
