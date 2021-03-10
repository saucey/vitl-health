import { Component, OnInit } from '@angular/core';
import {KitRegistrationService} from '../../services/kit-registration.service';

@Component({
    templateUrl: './kit-type.component.html',
})
export class KitTypeComponent implements OnInit {
    kitTypes = [
        {
            code: 'dna',
            label: 'DNA Kit',
            confirmationLabel: 'DNA Nutrition kit',
            icon: 'https://static.vitl.com/assets/images/kit-register/dna.png',
            barcodeText: 'Your barcode can be found on the instructions and sample tube',
            barcodeImage: 'https://static.vitl.com/assets/images/barcode-dna.jpg'

        },
        {
            code: 'blood',
            label: 'Blood test',
            confirmationLabel: 'Vitamin & Cholesterol Test kit',
            icon: 'https://static.vitl.com/assets/images/kit-register/blood.png',
            barcodeText: 'Your barcode can be found on the instructions and sample form',
            barcodeImage: 'https://static.vitl.com/assets/images/barcode-blood.jpg'

        }
    ];

    constructor(
        private kitRegistrationService: KitRegistrationService
    ) {}

    public ngOnInit() {
        this.kitRegistrationService.kit = null;
        this.kitRegistrationService.barcode = null;
    }

    private onKitTypeSelect(kit) {
        this.kitRegistrationService.onKitSelect(kit);
    }
}
