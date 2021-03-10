import { Component, OnInit } from '@angular/core';
import {CheckoutService} from '../../services/checkout.service';

@Component({
  templateUrl: './signin.component.html',
  styles: []
})
export class SigninComponent implements OnInit {

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit() {
    this.checkoutService.setProgress(1);
  }

}
