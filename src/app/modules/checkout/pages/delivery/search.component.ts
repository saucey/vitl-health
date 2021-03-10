import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import {ConfigService} from '../../../../services/config.service';
import {GlobalService} from '../../../../services/global.service';
import {AddressFinderService} from '../../../shared/services/address-finder.service';
import {Router} from '@angular/router';
import {CheckoutService} from '../../services/checkout.service';
import {ModalService} from '../../../modal/services/modal.service';

@Component({
    templateUrl: './search.component.html',
    styles: []
})
export class SearchComponent implements OnInit {

    @ViewChild('searchForm') searchForm: NgForm;
    @ViewChild('postcodeInput') postcodeInput: any;

    isValid = true;
    formErrors = {
        firstName: false,
        lastName: false,
        postcode: false
    };

    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private modalService: ModalService,
        private globalService: GlobalService,
        private addressFinderService: AddressFinderService,
        private router: Router,
        private checkoutService: CheckoutService
    ) {}

    ngOnInit() {
        for (let key in this.searchForm.controls) {
            if (this.searchForm.controls.hasOwnProperty(key)) {
                this.formErrors[key] = false;
            }
        }
    }

    findAddress() {
        this.isValid = this.validateForm(this.searchForm.value);

        if (this.isValid) {
            this.addressFinderService.findAddress(this.searchForm.value.postcode).then((address) => {
                if (address) {
                    this.checkoutService.addAddress(Object.assign({
                        firstName: this.searchForm.value.firstName,
                        lastName: this.searchForm.value.lastName
                    }, address));
                } else {
                    this.router.navigate(['checkout', 'delivery', 'manual']);
                }
            });
        } else {
            this.modalService.alert('Please correct form errors');
        }
    }

    validateForm(fields) {
        for (let key in fields) {
            if (fields.hasOwnProperty(key)) {
                fields[key] = fields[key].trim();

                this.formErrors[key] = fields[key] === '';

                if (key === 'postcode' && fields.postcode.length < 5) {
                    this.formErrors['postcode'] = true;
                }
            }
        }
        return Object.values(this.formErrors).every(isInvalid => isInvalid == false);
    }

}
