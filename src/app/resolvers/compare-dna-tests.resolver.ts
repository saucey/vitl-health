import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ProductService} from '../services/product.service';

@Injectable()
export class CompareDnaTestsResolver implements Resolve<any> {

    constructor(
        private productService: ProductService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {

        return new Promise((resolve, reject) => {
            const productPromises = [];

            route.data.ids.map(id => {
                const productPromise = new Promise((resolve, reject) => {
                    this.productService.getProductById(id).subscribe(fullProduct => resolve(fullProduct));
                });
                productPromises.push(productPromise);
            });
            
            Promise.all(productPromises).then((res) => {
                resolve(res);
            });
        });
    }

}