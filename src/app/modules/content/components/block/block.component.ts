import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-block',
  templateUrl: './block.component.html',
  styles: []
})
export class BlockComponent implements OnInit {

  @Input() block;

  constructor() { }

  ngOnInit() {
  }

}
