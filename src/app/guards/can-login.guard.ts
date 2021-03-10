import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CanLoginGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.getUser().map((user) => !user || user.type === 'lead');
  }

}
