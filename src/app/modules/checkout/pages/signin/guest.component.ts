import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {CheckoutService} from '../../services/checkout.service';
import {ModalService} from '../../../modal/services/modal.service';

@Component({
    templateUrl: './guest.component.html',
    styles: []
})
export class GuestComponent implements OnInit, AfterViewInit {

    @ViewChild('createLeadForm') createLeadForm: NgForm;
    @ViewChild('nameInput') nameInput: any;

    constructor(private modalService: ModalService, private checkoutService: CheckoutService) {}

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.nameInput.select();
    }

    registerLead() {
        if (this.createLeadForm.valid) {
            this.checkoutService.checkoutAsGuest(this.createLeadForm.value.email, this.createLeadForm.value.firstname);
        } else {
            this.modalService.alert('Please correct form errors');
        }
    }

}
