import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-address-confirm',
  templateUrl: './address-confirm.component.html',
  styles: []
})
export class AddressConfirmComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
