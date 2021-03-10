import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-gummy-test',
  templateUrl: './gummy-test.component.html',
  styles: []
})
export class GummyTestComponent implements OnInit {

  @Input() data: any;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectCapsule() {
    this.callback.emit('capsule');
  }

  selectGummy() {
    this.callback.emit('gummy');
  }

}
