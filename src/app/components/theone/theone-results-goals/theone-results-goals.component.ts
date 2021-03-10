import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-theone-results-goals',
  templateUrl: './theone-results-goals.component.html',
  styles: []
})
export class TheoneResultsGoalsComponent implements OnInit {

  @Input() goals;
  @Input() product;
  @Input() nutrients;
  @Input() claims;
  @Input() minimized = false;

  constructor() { }

  ngOnInit() {

  }

}
