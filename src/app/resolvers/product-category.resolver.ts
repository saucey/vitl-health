import { Injectable } from '@angular/core';
import {ProductService} from '../services/product.service';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { database } from 'firebase';

@Injectable()
export class ProductCategoryResolver implements Resolve<any> {

    constructor(private productService: ProductService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot) {
        let slug = route.data.slug ? route.data.slug : route.params['slug'];

        return this.productService.getCategory(slug).catch((error) => {
            this.router.navigate(['/404']);
            return Observable.of(null);
        });

    }

}