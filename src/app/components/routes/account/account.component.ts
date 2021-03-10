import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../services/cart.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styles: []
})
export class AccountComponent implements OnInit {

  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit() {
  }

  addCoupon() {
      this.cartService.addCoupon().then(() => this.cartService.showCart());
  }

  logout() {
      this.authService.logout();
  }

}
