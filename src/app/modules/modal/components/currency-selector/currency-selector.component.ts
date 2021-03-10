import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styles: []
})
export class CurrencySelectorComponent implements OnInit {

  @Input() data;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectCurrency(currency: string) {
    this.callback.emit(currency);
  }

}
