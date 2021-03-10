import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-type-biomarker-results',
  templateUrl: './block-type-biomarker-results.component.html',
  styles: []
})
export class BlockTypeBiomarkerResultsComponent implements OnInit {

  @Input() block;

  constructor() { }

  ngOnInit() {
  }

  getRangeOffset(biomarker, range) {

      return ((range.min / biomarker.max) * 100) + '%';

  }

  getRangeWidth(biomarker, range) {

      return (((range.max - range.min) / biomarker.max) * 100) + '%';

  }

  getMarkerOffset(biomarker) {

      return ((biomarker.value / biomarker.max) * 100) + '%';

  }

}
