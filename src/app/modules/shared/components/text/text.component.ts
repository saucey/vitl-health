import { Component, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {BaseFormComponent} from '../BaseFormComponent';

@Component({
  selector: 'app-form-text',
  templateUrl: './text.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextComponent),
      multi: true
    }
  ]
})
export class TextComponent extends BaseFormComponent {

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  @Input() invalid = false;
  @Input() submit: boolean;
  @Input() textarea: boolean;

  focus() {
      this.focussed = true;
      this.cd.detectChanges();
  }

}
