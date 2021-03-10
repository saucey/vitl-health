import {Component} from '@angular/core';
import {KitRegistrationService} from '../../services/kit-registration.service';
import {ModalService, ModalTypes} from '../../../modal/services/modal.service';
import {AuthService} from '../../../../services/auth.service';
import {ModalComponent} from '../../../modal/components/modal.component';
import {GlobalService} from '../../../../services/global.service';
import {Router} from '@angular/router';


@Component({
    templateUrl: './account-confirmation.component.html',
})
export class AccountConfirmationComponent {
    private user;

    constructor(
        private kitRegistrationService: KitRegistrationService,
        private modalService: ModalService,
        private authService: AuthService,
        private globalService: GlobalService,
        private router: Router,
    ) {}



    get name() {
        return this.kitRegistrationService.account ? this.kitRegistrationService.account.firstName : null;
    }

    get email() {
        return this.kitRegistrationService.account ? this.kitRegistrationService.account.email :  null;

    }

    onMeButtonPress() {
        this.router.navigateByUrl('/kit/account/details');
    }

    onSomeoneElseButtonPress() {
        this.modalService.create(ModalTypes.Confirm, {
            title: 'Confirm',
            data: {
                message: 'You must login with the account of the person who is taking the test'
            },
            ctas: [
                {
                    label: 'Logout', type: 'danger', callback: (modal: ModalComponent) => {
                        modal.close();
                        this.globalService.startLoading();
                        this.authService.logout(false).then(
                            () => {
                                this.router.navigateByUrl('/kit/account');
                                this.globalService.stopLoading();
                            }
                        );
                    }
                },
                {
                    label: 'Cancel', type: 'hollow', callback: (modal: ModalComponent) => {
                        modal.close();
                    }
                }
            ]
        });
    }
}
