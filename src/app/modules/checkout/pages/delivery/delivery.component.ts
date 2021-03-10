import { Component, OnInit } from '@angular/core';
import {CheckoutService} from '../../services/checkout.service';

@Component({
    templateUrl: './delivery.component.html',
    styles: []
})
export class DeliveryComponent implements OnInit {

    constructor(private checkoutService: CheckoutService) {
    }

    ngOnInit() {
        this.checkoutService.setProgress(2);
    }

}
