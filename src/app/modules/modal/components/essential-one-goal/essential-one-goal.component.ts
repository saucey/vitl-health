import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-essential-one-goal',
  templateUrl: './essential-one-goal.component.html',
  styles: []
})
export class EssentialOneGoalComponent implements OnInit {

  @Input() data;
  claims: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.claims = this.data.claims;
  //   this.claims = this.data.nutrients
  //       .sort((a, b) => b.score - a.score)
  //       .filter((nutrient) => this.data.product.pills[0].ingredients.find((ingredient) => nutrient.name.includes(ingredient.name)))
  //       .filter((nutrient) => this.data.claims.find((claim) => claim.key === this.data.goal.id + '-' + nutrient.id))
  //       .map((nutrient) => {
  //         return {
  //           ingredient: this.data.product.pills[0].ingredients.find((ingredient) => nutrient.name.includes(ingredient.name)),
  //           claim: this.data.claims.find((claim) => claim.key === this.data.goal.id + '-' + nutrient.id)
  //         };
  //       });
  }

}
