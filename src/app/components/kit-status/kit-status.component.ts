import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {KitStatus, KitStatusItem} from '../../classes/kit/status';

@Component({
  selector: 'app-kit-status',
  templateUrl: './kit-status.component.html',
  styles: []
})
export class KitStatusComponent implements OnInit, OnChanges {

  @Input() status: KitStatus;

  current: KitStatusItem;
  next: KitStatusItem;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.status) {
      this.current = this.status.items.find((item) => item.current);
      this.next = this.status.items[this.status.items.indexOf(this.current) + 1];
    }
  }

  isStart() {
    return this.status.items.indexOf(this.current) === 0;
  }

  isEnd() {
    return this.status.items.indexOf(this.current) >= (this.status.items.length - 2);
  }

  isLast() {
    return this.status.items.indexOf(this.current) === (this.status.items.length - 1);
  }

}
