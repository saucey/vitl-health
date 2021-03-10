import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blood-modal',
  templateUrl: './blood-modal.component.html',
  styles: []
})
export class BloodModalComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
