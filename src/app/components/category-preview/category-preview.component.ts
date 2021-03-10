import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-preview',
  templateUrl: './category-preview.component.html',
  styles: []
})
export class CategoryPreviewComponent implements OnInit {

  @Input() item;
  @Input() odd;

  constructor() { }

  ngOnInit() {
  }

}
