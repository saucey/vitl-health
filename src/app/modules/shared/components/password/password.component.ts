import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {BaseFormComponent} from '../BaseFormComponent';

@Component({
  selector: 'app-form-password',
  templateUrl: './password.component.html',
  styles: [],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => PasswordComponent),
          multi: true
      }
  ]
})
export class PasswordComponent extends BaseFormComponent {

    @Input() submit: boolean;

}
