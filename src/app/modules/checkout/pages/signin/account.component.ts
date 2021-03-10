import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CheckoutService} from '../../services/checkout.service';
import {AuthService} from '../../../../services/auth.service';
import {User} from '../../../../classes/user';
import {ModalService} from '../../../modal/services/modal.service';
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

@Component({
    templateUrl: './account.component.html',
    styles: []
})
export class AccountComponent implements OnInit, AfterViewInit, OnDestroy {

    user: User;

    @ViewChild('loginForm') loginForm: NgForm;
    @ViewChild('emailInput') emailInput: any;
    private ngUnsubscribe$ = new Subject();

    constructor(
        private modalService: ModalService,
        private checkoutService: CheckoutService,
        private authService: AuthService
    ) {}
    ngOnInit() {
        this.authService.getUser().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(user => this.user = user);
    }

    ngAfterViewInit() {
        this.emailInput.select();
    }

    signIn() {
        if (this.loginForm.valid) {
            this.checkoutService.signIn(this.loginForm.value.email, this.loginForm.value.password);
        } else {
            this.modalService.alert('Please correct form errors');
        }
    }

    continue() {
        this.checkoutService.nextScreen();
    }

    logout() {
        this.authService.logout(false);
    }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
