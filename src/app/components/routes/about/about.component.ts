import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {SegmentService} from '../../../services/segment.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: []
})
export class AboutComponent implements OnInit {

  constructor(private globalService: GlobalService, private segmentService: SegmentService) { }

  ngOnInit() {
    this.segmentService.pageVisit("About");
      this.globalService.setTitle('About us');
      this.globalService.setMetaTag({
          name: 'description',
          content: 'Your health is personal so your nutrition should be too. Using advanced diagnostic technology we work out exactly what you need to feel your best more often'
      });
  }

}
