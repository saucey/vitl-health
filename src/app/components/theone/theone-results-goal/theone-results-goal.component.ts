import { Component, OnInit, Input } from '@angular/core';
import {ModalService, ModalTypes} from '../../../modules/modal/services/modal.service';

@Component({
  selector: 'app-theone-results-goal',
  templateUrl: './theone-results-goal.component.html',
  styles: []
})
export class TheoneResultsGoalComponent implements OnInit {

  @Input() goal;
  @Input() product;
  @Input() nutrients;
  @Input() claims;
  @Input() minimized;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.claims = this.nutrients
      .sort((a, b) => b.score - a.score)
      .filter((nutrient) => this.product.pills[0].ingredients.find((ingredient) => nutrient.name.includes(ingredient.name)))
      .filter((nutrient) => this.claims.find((claim) => claim.key === this.goal.id + '-' + nutrient.id))
      .map((nutrient) => {
        return {
          ingredient: this.product.pills[0].ingredients.find((ingredient) => nutrient.name.includes(ingredient.name)),
          claim: this.claims.find((claim) => claim.key === this.goal.id + '-' + nutrient.id)
        };
      });
  }

  showGoalDescription() {
    this.modalService.create(ModalTypes.EssentialOne, {
      data: {
        goal: this.goal,
        // product: this.product,
        // nutrients: this.nutrients,
        claims: this.claims
      }
    });
  }


}
