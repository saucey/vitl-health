import { Injectable } from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {CheckoutService} from '../modules/checkout/services/checkout.service';

@Injectable()
export class ConfirmationResolver implements Resolve<any> {

    constructor(private checkoutService: CheckoutService, private router: Router) {}

    resolve() {

        return new Promise((resolve, reject) => {

            if (this.checkoutService.getConfirmation()) {
                resolve(this.checkoutService.getConfirmation());
            } else {
                this.router.navigateByUrl('/');
                reject();
            }

        });

    }

}
