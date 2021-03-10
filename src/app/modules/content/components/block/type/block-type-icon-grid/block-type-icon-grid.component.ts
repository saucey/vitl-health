import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-type-icon-grid',
  templateUrl: './block-type-icon-grid.component.html',
  styles: []
})
export class BlockTypeIconGridComponent implements OnInit {

  @Input() block;

  constructor() { }

  ngOnInit() {
  }

  getIconWidth(size: string) {
      let width;
      switch (size) {
          default: width = 50; break;
      }
      return width;
  }

}
