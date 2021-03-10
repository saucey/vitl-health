import {Component, OnInit} from '@angular/core';
import {CheckoutService} from '../../services/checkout.service';

@Component({
    templateUrl: './payment.component.html',
    styles: []
})
export class PaymentComponent implements OnInit {

    constructor(private checkoutService: CheckoutService) {}

    ngOnInit() {
        this.checkoutService.setProgress(3);
    }

}
