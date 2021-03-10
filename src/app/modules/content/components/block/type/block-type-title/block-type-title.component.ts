import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-type-title',
  templateUrl: './block-type-title.component.html',
  styles: []
})
export class BlockTypeTitleComponent implements OnInit {

  @Input() block;

  constructor() { }

  ngOnInit() {
  }

}
