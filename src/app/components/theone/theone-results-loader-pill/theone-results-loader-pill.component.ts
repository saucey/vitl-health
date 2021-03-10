import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-theone-results-loader-pill',
  templateUrl: './theone-results-loader-pill.component.html',
  styles: []
})
export class TheoneResultsLoaderPillComponent implements OnInit, AfterViewInit {

  @Input() user;
  @Input() gummy = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

}
