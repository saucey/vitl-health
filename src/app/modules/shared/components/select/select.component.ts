import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {BaseFormComponent} from '../BaseFormComponent';

@Component({
    selector: 'app-form-select',
    templateUrl: './select.component.html',
    styles: [],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent extends BaseFormComponent {

    @Input() options;

}
