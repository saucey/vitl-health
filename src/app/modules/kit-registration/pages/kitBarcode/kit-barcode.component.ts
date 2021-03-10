import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {KitRegistrationService} from '../../services/kit-registration.service';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-kit-barcode',
    templateUrl: './kit-barcode.component.html',
})
export class KitBarcodeComponent implements AfterViewInit {

    @ViewChild('barcodeForm') barcodeForm: NgForm;

    constructor(
        private router: Router,
        private kitRegistrationService: KitRegistrationService
    ) {}

    ngAfterViewInit() {
        this.barcodeForm.controls['barcode'].setValue(this.kitRegistrationService.barcode);
    }

    get barcodeText() {
        return this.kitRegistrationService.kit.barcodeText;
    }

    get barcodeImage() {
        return this.kitRegistrationService.kit.barcodeImage;
    }

    onBarcodeSubmit() {
        const barcode = this.barcodeForm.value.barcode;
        this.kitRegistrationService.submitBarcodeForm(barcode);
    }
}
