import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-type-header',
  templateUrl: './block-type-header.component.html',
  styles: []
})
export class BlockTypeHeaderComponent implements OnInit {

  @Input() block;

  constructor() { }

  ngOnInit() {
  }

}
