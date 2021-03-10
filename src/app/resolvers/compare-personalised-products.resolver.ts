import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {LanaService} from '../services/lana.service';
import {ProductService} from '../services/product.service';

@Injectable()
export class ComparePersonalisedProductsResolver implements Resolve<any> {

    constructor(
        private lanaService: LanaService,
        private productService: ProductService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {

        return new Promise((resolve, reject) => {
            this.lanaService.getDashboard().subscribe(res => {

                if (res) {
                    const personalisedProductIds = res.recommendations.filter(product => product.action.value === '/personalised' || product.action.value === '/essential-one').map(product => product.id);
                    const productPromises = [];

                    personalisedProductIds.map(id => {
                        const productPromise = new Promise((resolve, reject) => {
                            this.productService.getProduct(id).subscribe(fullProduct => resolve(fullProduct));
                        });
                        productPromises.push(productPromise);
                    });
                    
                    Promise.all(productPromises).then((res) => {
                        resolve(res);
                    });
                } else {
                    resolve(null);
                }
            });
        });
    }

}