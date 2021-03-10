import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-type-text',
  templateUrl: './block-type-text.component.html',
  styles: []
})
export class BlockTypeTextComponent implements OnInit {

  @Input() block;

  constructor() { }

  ngOnInit() {
  }

}
