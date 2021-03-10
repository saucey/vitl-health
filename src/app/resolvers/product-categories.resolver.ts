import { Injectable } from '@angular/core';
import {ProductService} from '../services/product.service';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ProductCategoriesResolver implements Resolve<any> {

    constructor(private productService: ProductService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot) {

        return this.productService.getCategories().catch((error) => {
            this.router.navigate(['/404']);
            return Observable.of(null);
        });

    }

}
