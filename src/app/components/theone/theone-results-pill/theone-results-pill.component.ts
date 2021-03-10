import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-theone-results-pill',
  templateUrl: './theone-results-pill.component.html',
  styles: []
})
export class TheoneResultsPillComponent implements OnInit {

  @Input() product;
  @Input() goals;
  @Input() gummy;
  pill: any;

  constructor() { }

  ngOnInit() {
    this.pill = this.product.pills[0];
  }

}
