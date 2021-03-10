import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {User} from '../../../../classes/user';
import {AuthService} from '../../../../services/auth.service';
import {CheckoutService} from '../../services/checkout.service';

@Component({
    templateUrl: './select.component.html',
    styles: []
})
export class SelectComponent implements OnInit, OnDestroy {

    user: User;
    private ngUnsubscribe$ = new Subject();

    constructor(
        private authService: AuthService,
        private checkoutService: CheckoutService
    ) {}

    ngOnInit() {
        this.authService.getUser().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(user => this.user = user);
    }

    selectPaymentMethod(method) {
        this.checkoutService.setPaymentMethod(method);
    }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
