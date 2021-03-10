import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {ProductService} from '../services/product.service';

import riseAndEnergise from '../static-data/health-goals/rise-and-energise';
import sweetSleep from '../static-data/health-goals/sweet-sleep';
import getUpAndGlow from '../static-data/health-goals/get-up-and-glow';
import immunity from '../static-data/health-goals/immunity';

@Injectable()
export class HealthGoalResolver implements Resolve<any> {

    constructor(private productService: ProductService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot) {
        const healthGoal = route.url[route.url.length - 1].path;
        let pageContent;

        if (healthGoal === 'rise-and-energise') {
            pageContent = riseAndEnergise;
        }
        if (healthGoal === 'sweet-sleep') {
            pageContent = sweetSleep;
        }
        if (healthGoal === 'get-up-and-glow') {
            pageContent = getUpAndGlow;
        }
        if (healthGoal === 'immunity') {
            pageContent = immunity;
        }

        return this.productService.getProductById(route.data.id)
            .map((product) => {
                product.content = pageContent;

                if (route.data.oneOffOnly) {
                    // remove subscription plan
                    product.plans = product.plans.filter(plan => plan.type === 'one_off');
                    product.plans[0].default = true;
                }

                return product;
            })
            .catch((error) => {
                this.router.navigate(['/404']);
                return Observable.of(null);
            });
    }

}
