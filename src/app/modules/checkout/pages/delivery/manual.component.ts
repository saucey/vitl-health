import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from '../../../../services/config.service';
import {NgForm} from '@angular/forms';
import {CheckoutService} from '../../services/checkout.service';
import {ModalService} from '../../../modal/services/modal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    templateUrl: './manual.component.html',
    styles: []
})
export class ManualComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('addressForm') addressForm: NgForm;

    countries: Array<any> = [];
    country;
    isValid = true;
    formErrors = {
        firstName: false,
        lastName: false,
        address: false,
        town: false,
        postcode: false
    };
    private ngUnsubscribe$ = new Subject();

    constructor(
        private configService: ConfigService,
        private checkoutService: CheckoutService,
        private modalService: ModalService
    ) {}

    ngOnInit() {
        for (const key in this.addressForm.controls) {
            if (this.addressForm.controls.hasOwnProperty(key)) {
                this.formErrors[key] = false;
            }
        }
    }

    ngAfterViewInit() {
        this.configService.getConfig().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(config => {
            this.countries = config.countries;
            this.addressForm.controls['country'].setValue(config.country);
        });
    }

    addAddress() {
        this.isValid = this.validateForm(this.addressForm.value);

        if (this.isValid) {
            this.checkoutService.addAddress(this.addressForm.value);
        } else {
            this.modalService.alert('Please correct form errors');
        }
    }

    setCountry(country) {
        this.country = this.countries.find((c) => c.code === country);
        this.addressForm.controls['county'].setValue(null);
    }

    validateForm(fields) {
        for (const key in fields) {
            if (fields.hasOwnProperty(key)) {

                if (key !== 'county' || (key === 'county' && this.country.countyRequired)) {
                    fields[key] = fields[key].trim();

                    this.formErrors[key] = fields[key] === '';
                }

                if (key === 'postcode' && fields.postcode.length < 4) {
                    this.formErrors['postcode'] = true;
                }
            }
        }
        return Object.values(this.formErrors).every(isInvalid => isInvalid === false);
    }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
