import { Component, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {BaseFormComponent} from '../BaseFormComponent';

@Component({
  selector: 'app-form-email',
  templateUrl: './email.component.html',
  styles: [],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => EmailComponent),
          multi: true
        }
    ]
})
export class EmailComponent extends BaseFormComponent {

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  @Input() submit: boolean;

  focus() {
      this.focussed = true;
      this.cd.detectChanges();
  }

}
