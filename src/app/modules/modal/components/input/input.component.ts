import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styles: []
})
export class InputComponent implements OnInit {

  @Input() data;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  submitForm() {
    this.callback.emit(this.data.value);
  }

}
