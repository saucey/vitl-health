import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pause-subscription',
  templateUrl: './pause-subscription.component.html',
  styles: []
})
export class PauseSubscriptionComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
