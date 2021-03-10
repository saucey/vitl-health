import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styles: []
})
export class OrderDetailsComponent implements OnInit {

  @Input() order;

  constructor() { }

  ngOnInit() {
  }

}
