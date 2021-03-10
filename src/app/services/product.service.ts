import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';

import * as productQueries from '../queries/products';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api: ApiService) {}

  getCategories() {

      return this.api.query(productQueries.AllCategories, {}).map(({data}) => data.treeItems);

  }

  getCategory(slug: string) {

      return this.api.query(productQueries.GetCategory, { slug: slug }).map(({data}) => data.treeItem);

  }

  getProduct(slug: string, freeTrial: boolean = false, partnership: string = null) {

      return this.api.query(productQueries.GetProduct, { slug: slug, freeTrial: freeTrial, partnership: partnership }).map(({data}) => data.product);

  }

  getProductById(id: number, freeTrial: boolean = false, partnership: string = null) {

      return this.api.query(productQueries.GetProductById, { id: id, freeTrial: freeTrial, partnership: partnership }).map(({data}) => {
          return data.product;
      });

  }

  getPlan(id: number) {

      return this.api.query(productQueries.GetPlan, { id: id }).map(({data}) => data.plan);

  }

  getProductsByCategory(group: string, exclude: number) {
    return this.api.query(productQueries.GetProductsByCategory, { grouping: group, excludeId: exclude }).map(({data}) => data.product_getAllByGroup);
    
  }

  getPopularProducts(exclude: number) {

      return this.api.query(productQueries.GetPopularProducts, { excludeId: exclude }).map(({data}) => data.popularProducts);

  }

  getDefaultPlan(slug: string) {

      return this.api.query(productQueries.GetPlans, { slug: slug }).map(({data}) => data.product.plans.find(plan => plan.default));

  }

  getAllPlans(slug: string) {

    return this.api.query(productQueries.GetAllPlans, { slug: slug }).map(({data}) => data.product.allPlans);
  }

}
