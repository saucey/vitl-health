import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {AuthService} from '../services/auth.service';
import {CartService} from '../services/cart.service';
import {GlobalService} from '../services/global.service';

@Injectable()
export class CheckoutResolver implements Resolve<any> {

    constructor(
        private authService: AuthService,
        private cartService: CartService,
        private globalService: GlobalService,
        private router: Router
    ) {}

    resolve() {

        return new Promise((resolve, reject) => {
            this.globalService.initCall().subscribe(({data}) => {
                resolve(data);
            });
        });

    }

}
