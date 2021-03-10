import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {SegmentService} from '../../../services/segment.service';

@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styles: []
})
export class ScienceComponent implements OnInit {

  constructor(private globalService: GlobalService, private segmentService: SegmentService) { }

  ngOnInit() {
    this.segmentService.pageVisit("Science");
    this.globalService.setTitle('Science');
      this.globalService.setMetaTag({
          name: 'description',
          content: ''
      });
  }

}
