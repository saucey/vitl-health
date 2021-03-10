import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {User} from '../../../../classes/user';
import {AccountService} from '../../../../services/account.service';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styles: []
})
export class AccountDashboardComponent implements OnInit, OnDestroy {

  user: User;
  private ngUnsubscribe$ = new Subject();

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.accountService.getAccount().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((user) => this.user = user);
  }

  openConsultation() {
    this.router.navigateByUrl('/consultation');
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
