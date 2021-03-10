import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {LanaService} from '../services/lana.service';
import {ProductService} from '../services/product.service';
import {ContentService} from '../services/content.service';

@Injectable()
export class GoalResolver implements Resolve<any> {

    constructor(
        private lanaService: LanaService,
        private productService: ProductService,
        private contentService: ContentService
        ) {}

    resolve(route: ActivatedRouteSnapshot) {
        return new Promise((resolve, reject) => {
            const goalPromise = new Promise((resolve, reject) => {
                this.lanaService.getGoal(route.params['identifier']).subscribe(res => resolve(res));
            });
            const dashboardPromise = new Promise((resolve, reject) => {
                this.lanaService.getDashboard().subscribe(res => {
                    const personalisedProducts = res.recommendations
                    .filter(recommendation => recommendation.action.value === '/personalised' || recommendation.action.value === '/essential-one')
                    .map(recommendation => {

                        const product = {
                            id: recommendation.id,
                            type: recommendation.action.value === '/personalised' ? 'personalisedPlus' : 'essentialOne'
                        };
                
                        return product;
                    });

                    const productPromises = [];

                    personalisedProducts.map(product => {
                        const productPromise = new Promise((resolve, reject) => {
                            this.productService.getProduct(product.id).subscribe(fullProduct => resolve(fullProduct));
                        });
                        productPromises.push(productPromise);
                    });

                    // don't get mealplan if navigating from result page
                    if (!route.data.hideMealPlan) {
                        const mealPlan = res.recommendations.find(product => product.action.value.includes('mealplan'));
                        
                        if (mealPlan) {
                                const mealPlanPromise = new Promise((resolve, reject) => {
                                this.contentService.getContent(mealPlan.action.value).subscribe((res: any) => {
                                    mealPlan.content = res.sections[0].blocks;
                                    resolve(mealPlan);
                                });
                            });
                            productPromises.push(mealPlanPromise);
                        }
                    }

                    Promise.all(productPromises).then((res) => {
                        const data = {
                            personalisedProducts: personalisedProducts,
                            fullProducts: res
                        }
                        resolve(data);
                    });
                });
            });


            Promise.all([goalPromise, dashboardPromise]).then((res: any) => {
                const data = {
                    isProUser: res[0].user.isPro,
                    goal: res[0].user.goal,
                    products: res[1]
                };
                resolve(data);
            });
        });
    }

}