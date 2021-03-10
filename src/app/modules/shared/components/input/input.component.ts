import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent {

  @Input() placeholder: String;
  @Input() type: String;
  @Input() submit: boolean;
  @Input() options = [];
  @Input() value: String;
  @Output() modelChange = new EventEmitter();

  modelValue;

  focussed = false;

  constructor() {}

  @Input()
  get model() {
    return this.modelValue;
  }

  set model(val) {
    this.modelValue = val;
    this.modelChange.emit(this.modelValue);
  }

  minimizePlaceholder() {
    return (this.model ? true : false);
  }

  focus() {
      this.focussed = true;
  }

  blur() {
      this.focussed = false;
  }

  select() {
      if (this.type === 'radio') {
        this.model = this.value;
      }
  }

}
