import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {CheckoutService} from '../services/checkout.service';

@Component({
    selector: 'app-checkout-layout',
    templateUrl: './checkout-layout.component.html',
    styles: []
})
export class CheckoutLayoutComponent implements OnInit {

    constructor(private globalService: GlobalService, private checkoutService: CheckoutService) { }

    ngOnInit() {
        this.globalService.setTitle('Checkout');
        this.globalService.setMetaTag({ name: 'description', content: '' });
        this.globalService.emitTrackingEvent('initiateCheckout', {});
    }

    getProgress() {
        return this.checkoutService.getProgress();
    }

}
