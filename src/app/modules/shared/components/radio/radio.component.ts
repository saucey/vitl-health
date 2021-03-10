import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {BaseFormComponent} from '../BaseFormComponent';

@Component({
    selector: 'app-form-radio',
    templateUrl: './radio.component.html',
    styles: [],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioComponent),
            multi: true
        }
    ]
})
export class RadioComponent extends BaseFormComponent {

  @Input() checkbox: boolean;

  toggle() {
      if (!this.disabled) {
          this.thisValue = !this.thisValue;
      }
  }

}
