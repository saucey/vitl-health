import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-inline-page',
  templateUrl: './inline-page.component.html',
  styles: []
})
export class InlinePageComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
