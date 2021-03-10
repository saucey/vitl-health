import {Component, OnInit} from '@angular/core';
import {KitRegistrationService} from '../../services/kit-registration.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-kit-register-confirmation',
    templateUrl: './kit-register-confirmation.component.html',
})
export class KitRegisterConfirmationComponent implements OnInit {
    animation: any;

    lottieConfig = {
        path: 'https://static.vitl.com/assets/tick.json',
        autoplay: true,
        loop: false,
        speed: 2
    };

    constructor(
        private kitRegistrationService: KitRegistrationService,
        private router: Router
    ) {}


    ngOnInit() {
        if (!this.kit) {
            this.router.navigateByUrl('/kit');
        }
    }

    handleAnimation(animation: any) {
        this.animation = animation;
    }

    get kit() {
        return this.kitRegistrationService.kit;
    }

    get firstName() {
        return this.kitRegistrationService.account.firstName;
    }
}
