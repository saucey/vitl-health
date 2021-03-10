import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-content-screen',
  templateUrl: './screen.component.html',
  styles: []
})
export class ScreenComponent implements OnInit {

  @Input() screen;

  constructor(private location: Location) { }

  ngOnInit() {

  }

  goBack() {
    this.location.back();
  }

}
