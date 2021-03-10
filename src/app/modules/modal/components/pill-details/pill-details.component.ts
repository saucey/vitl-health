import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pill-details',
  templateUrl: './pill-details.component.html',
  styles: []
})
export class PillDetailsComponent {

  showRDAInfo = false;

  @Input() data;

  constructor() { }

  ngOnInit() {
    if(this.data.ingredients.findIndex(ingredient => ingredient.rda === null) > -1) {
      this.showRDAInfo = true;
    }
  }
}