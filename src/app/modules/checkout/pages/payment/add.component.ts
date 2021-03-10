import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StripeService} from '../../../../services/stripe.service';
import {Router} from '@angular/router';
import {CheckoutService} from '../../services/checkout.service';
import {NgForm} from '@angular/forms';
import {ModalService} from '../../../modal/services/modal.service';

@Component({
    templateUrl: './add.component.html',
    styles: []
})
export class AddComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('cardInfo') cardInfo: ElementRef;
    @ViewChild('cardForm') cardForm: NgForm;
    card: any;

    constructor(
        private stripeService: StripeService,
        private router: Router,
        private checkoutService: CheckoutService,
        private modalService: ModalService
    ) {}

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.stripeService.createCard().then((card) => {
            this.card = card;
            this.card.mount(this.cardInfo.nativeElement);
        });
    }

    ngOnDestroy() {
        if (this.card) {
            this.card.destroy();
        }
    }

    addPaymentMethod() {
        if (this.cardForm.valid) {
            this.checkoutService.addPaymentMethod(this.card, this.cardForm.value.name, this.cardForm.value.postcode);
        } else {
            this.modalService.alert('Please correct form errors');
        }
    }

}
