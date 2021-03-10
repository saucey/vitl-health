import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {GlobalService} from '../../../../services/global.service';
import {AuthService} from '../../../../services/auth.service';
import {ModalService} from '../../../modal/services/modal.service';
import {Router} from '@angular/router';
import {AccountService} from '../../../../services/account.service';

@Component({
    selector: 'app-kit-account-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent {
    @ViewChild('registerForm') registerForm: NgForm;

    accept = false;

    constructor(
        private globalService: GlobalService,
        private router: Router,
        private authService: AuthService,
        private modalService: ModalService,
        private accountService: AccountService
    ){}

    register() {
        if (!this.accept) {
            this.modalService.alert('Please accept the terms and conditions');

        } else if (this.registerForm.valid) {

            this.globalService.startLoading();
            this.authService.register(
                this.registerForm.value.firstName,
                this.registerForm.value.email,
                this.registerForm.value.password,
                'register'
            ).then(
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