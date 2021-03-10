import { Injectable } from '@angular/core';
import {ProductService} from '../services/product.service';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import healthGoals from '../static-data/categories/health-goals';
import womensHealth from '../static-data/categories/womens-health';

@Injectable()
export class NewProductCategoryResolver implements Resolve<any> {

    constructor(private productService: ProductService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot) {
        const category = route.url[route.url.length - 1].path;
        let pageContent;

        if (category === 'health-goals') {
            pageContent = healthGoals;
        }
        if (category === 'womens-health') {
            pageContent = womensHealth;
        }

        return this.productService.getCategory(category)
            .map((category) => {
                category.content = pageContent;

                return category;
            })
            .catch((error) => {
                this.router.navigate(['/404']);
                return Observable.of(null);
        });

    }

}