import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-type-html',
  templateUrl: './block-type-html.component.html',
  styles: []
})
export class BlockTypeHtmlComponent implements OnInit {

  @Input() block;

  constructor() { }

  ngOnInit() {
  }

}
