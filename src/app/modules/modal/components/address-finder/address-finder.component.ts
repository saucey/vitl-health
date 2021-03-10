import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-address-finder',
  templateUrl: './address-finder.component.html',
  styles: []
})
export class AddressFinderComponent implements OnInit {

  @Input() data: any;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  selectAddress(address: any) {
    this.callback.emit(address);
  }

}
