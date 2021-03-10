import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-type-spacer',
  templateUrl: './block-type-spacer.component.html',
  styles: []
})
export class BlockTypeSpacerComponent implements OnInit {

  @Input() block;

  constructor() { }

  ngOnInit() {
  }

}
