import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CartService} from '../../../../services/cart.service';
import {GlobalService} from '../../../../services/global.service';

@Component({
  selector: 'app-select-plan',
  templateUrl: './select-plan.component.html',
  styles: []
})
export class SelectPlanComponent implements OnInit {

  product;
  selectedPlan;

  constructor(private route: ActivatedRoute, private cartService: CartService, private globalService: GlobalService) {}

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
    this.selectedPlan = this.product.plans.find(plan => plan.default);
  }

  setPlan(plan) {
    this.selectedPlan = plan;
  }

  addToBasket() {
    this.globalService.startLoading();
    this.cartService.addPlan(this.selectedPlan).then(() => {
      this.globalService.stopLoading();

      this.cartService.showCart();
    }, () => this.globalService.stopLoading());
  }

}
