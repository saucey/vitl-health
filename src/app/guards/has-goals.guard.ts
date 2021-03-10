import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class HasGoalsGuard implements CanActivate {

  constructor(
      private accountService: AccountService,
      private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.accountService.loadAccount().map((user) => {

        if (user && user.goals) {
          return true;
        } else {
          this.router.navigateByUrl('/myvitl/account');
        }

      });

  }
}
