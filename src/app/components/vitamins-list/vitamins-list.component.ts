import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vitamins-list',
  templateUrl: './vitamins-list.component.html',
  styles: []
})
export class VitaminsListComponent implements OnInit {

  @Input() vitamins;

  activeExpandItem = 0;
  showAllVitamins = false;
  showItemsMax = 10; // items beyond the showItemsMax limit are hidden/shown with CSS

  constructor(
  ) { }

  ngOnInit() {
    this.showAllVitamins = this.vitamins.length <= this.showItemsMax;
  }

  toggleExpand(val: number) {
    this.activeExpandItem = val;
  }

  toggleShowVitamins(val) {
    this.showAllVitamins = val;
  }

}
