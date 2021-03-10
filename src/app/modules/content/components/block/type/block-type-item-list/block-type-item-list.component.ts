import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-type-item-list',
  templateUrl: './block-type-item-list.component.html',
  styles: []
})
export class BlockTypeItemListComponent implements OnInit {

  @Input() block;

  constructor() { }

  ngOnInit() {
  }

}
