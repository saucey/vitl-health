import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Goal } from '../../../../classes/lana/goal';
import { CartService } from '../../../../services/cart.service';
import { GlobalService } from '../../../../services/global.service';
import { ModalService, ModalTypes } from '../../../../modules/modal/services/modal.service';
import { ApiService } from '../../../../services/api.service';
import { ResultsQuery } from '../../../../queries/theone';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styles: []
})
export class GoalComponent implements OnInit, OnDestroy {

  goal: Goal;
  personalisedProducts;
  products = {
    personalisedPlus: null,
    essentialOne: null
  };
  pills = [];
  sharedIngredients = [];
  nonSharedIngredients = [];
  maxComparedIngredients = 6;
  isProUser: false;
  mealPlan;

  private ngUnsubscribe$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private cartService: CartService,
    private globalService: GlobalService,
    private apiService: ApiService,
    private viewportScroller: ViewportScroller
  ) {
    const fullProducts = this.route.snapshot.data.data.products.fullProducts;
    this.goal = this.route.snapshot.data.data.goal;
    this.personalisedProducts = this.route.snapshot.data.data.products.personalisedProducts;
    this.products.personalisedPlus = fullProducts.find(product => product.grouping === 'personalised');
    this.products.essentialOne = fullProducts.find(product => product.grouping === 'essential-one');
    this.mealPlan = fullProducts.find(product => product.action && product.action.value.includes('mealplan'));
    this.isProUser = this.route.snapshot.data.data.isProUser;

    if (this.products.personalisedPlus) {
      const pillPersonalisedPlus = this.products.personalisedPlus.pills.find(pill => pill.label === this.goal.pill.label);
      pillPersonalisedPlus.url = '/myvitl/personalised';
      this.pills.push(pillPersonalisedPlus);
    }

    if (this.products.essentialOne) {
      const pillEssentialOne = this.products.essentialOne.pills[0];
      pillEssentialOne.url = '/myvitl/essential-one';
      this.pills.push(pillEssentialOne);
    }

    if (this.pills.length === 2) {
      this.pills[0].ingredients.map(ppIngredient => {
        const isShared = this.pills[1].ingredients.find(eoIngredient => eoIngredient.name === ppIngredient.name);
        if (isShared) {
          this.sharedIngredients.push(ppIngredient);
        } else {
          this.nonSharedIngredients.push(ppIngredient);
        }
      });

      if (this.sharedIngredients.length < this.maxComparedIngredients) {
        this.nonSharedIngredients = this.nonSharedIngredients.slice(0, this.maxComparedIngredients - this.sharedIngredients.length);
      }

      // get common pill description from EO health claims array
      if (this.sharedIngredients.length === 1) {

        this.apiService.query(ResultsQuery, { contextIdentifier: 'essential-one' }).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(data => {
          this.sharedIngredients[0].description = data.data.config.claims
          .find(claim => claim.key.includes((this.goal.id + '-' + this.sharedIngredients[0].name.replace(' ', '-')).toLowerCase())).phrase;
        });
      }
    }
  }

  ngOnInit() {
    // offset for the sticky header
    this.viewportScroller.setOffset([0, 120]);
  }

  showFoodModal(food): void {
    if (food.description) {
      this.modalService.create(ModalTypes.InlinePage, {
        title: food.label,
        data: {
          image: food.icon,
          body: '<p class="text-center">' + food.description + '</p>',
          imageHeight: 90
        }
      });
    }
  }

  addToBasket(product) {
    const selectedPlan = product.plans.find(plan => plan.default);

    this.globalService.startLoading();
    this.cartService.addPlan(selectedPlan).then(() => {
      this.globalService.stopLoading();

      this.cartService.showCart();
    }, () => this.globalService.stopLoading());
  }

  handleScrollToElementId(id) {
    this.viewportScroller.scrollToAnchor(id);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
