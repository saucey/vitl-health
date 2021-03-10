import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-type-hr',
  templateUrl: './block-type-hr.component.html',
  styles: []
})
export class BlockTypeHrComponent implements OnInit {

  @Input() block;

  constructor() { }

  ngOnInit() {
  }

}
