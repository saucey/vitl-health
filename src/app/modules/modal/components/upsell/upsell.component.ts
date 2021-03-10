import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-upsell',
  templateUrl: './upsell.component.html',
  styles: []
})
export class UpsellComponent {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }
}