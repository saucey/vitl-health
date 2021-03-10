import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {GlobalService} from '../../../../services/global.service';
import {ModalService, ModalTypes} from '../../../modal/services/modal.service';
import {Router} from '@angular/router';
import {AccountService} from '../../../../services/account.service';
import {ModalComponent} from '../../../modal/components/modal.component';

@Component({
    selector: 'app-kit-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    @ViewChild('loginForm') loginForm: NgForm;

    constructor(
        private globalService: GlobalService,
        private authService: AuthService,
        private modalService: ModalService,
        private router: Router,
        private accountService: AccountService
    ) {}

    forgotPassword() {
        this.modalService.create(ModalTypes.Input, {
            title: 'Please enter your email address to receive a password reset email',
            data: {
                value: '',
                placeholder: 'Email address'
            },
            ctas: [
                { label: 'Submit' }
            ],
            callback: (modal: ModalComponent, email: string) => {
                if (email) {
                    this.authService.forgot(email).then(() => {
                        modal.close();
                        this.modalService.success('We\'ve sent you an email with a link so you can reset your password - please make sure you check your spam folder');
                    });
                } else {
                    this.modalService.alert('Email address is not valid');
                }
            }
        });
    }

    login() {
        if (this.loginForm.valid) {
            this.globalService.startLoading();
            this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then(
                () => {
                    this.accountService.user.refetch().then(
                        () => {
                            this.router.navigateByUrl('/kit/account/confirmation');
                        },
                    );
                },
                () => this.globalService.stopLoading()
            );
        } else {
            this.modalService.alert('Uh oh! Looks like something wasn\'t right please try again');
        }
    }
}
