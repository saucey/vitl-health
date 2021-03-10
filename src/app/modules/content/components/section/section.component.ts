import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-section',
  templateUrl: './section.component.html',
  styles: []
})
export class SectionComponent implements OnInit {

  @Input() section;

  constructor() { }

  ngOnInit() {

  }

}
