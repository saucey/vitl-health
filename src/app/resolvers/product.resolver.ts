import { Injectable } from '@angular/core';
import {ProductService} from '../services/product.service';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ProductResolver implements Resolve<any> {

    constructor(private productService: ProductService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot) {

        if (route.data.resolveById) {
            if (route.data.id) {
                return this.productService.getProductById(route.data.id).catch((error) => {
                    this.router.navigate(['/404']);
                    return Observable.of(null);
                });
            } else {
                return this.productService.getProductById(route.params['id']).catch((error) => {
                    this.router.navigate(['/404']);
                    return Observable.of(null);
                });
            }
        } else {
            return this.productService.getProduct(route.params['slug']).catch((error) => {
                this.router.navigate(['/404']);
                return Observable.of(null);
            });
        }

    }

}
