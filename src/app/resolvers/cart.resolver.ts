import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {CartService} from '../services/cart.service';

@Injectable()
export class CartResolver implements Resolve<any> {

    constructor(private cartService: CartService) {}

    resolve() {

        return this.cartService.loadCart();

    }

}
