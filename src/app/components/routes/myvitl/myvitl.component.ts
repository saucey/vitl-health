import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import 'rxjs/add/operator/filter';
import {SegmentService} from '../../../services/segment.service';

@Component({
  selector: 'app-myvitl',
  templateUrl: './myvitl.component.html',
  styleUrls: ['./myvitl.component.css']
})
export class MyvitlComponent implements OnInit {

  navSub: any;
  nav = [];

  constructor(
      private globalService: GlobalService,
      private segmentService: SegmentService,
  ) {
  }

  ngOnInit() {
    this.segmentService.pageVisit("MyVitl dashboard");
    this.globalService.setTitle('My');
    this.globalService.setMetaTag({ name: 'description', content: '' });
  }

}
