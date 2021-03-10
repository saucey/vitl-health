import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {User} from '../../../../classes/user';
import {CheckoutService} from '../../services/checkout.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

    selectAddress(address) {
        this.checkoutService.setAddress(address);
    }

    ngOnDestroy() {
      this.ngUnsubscribe$.next();
      this.ngUnsubscribe$.complete();
    }

}
