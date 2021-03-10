import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {SegmentService} from '../../../services/segment.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private segmentService: SegmentService
    ) {}

  ngOnInit() {
    this.segmentService.pageVisit("Consultation");
    this.globalService.setTitle('Consultation');
    this.globalService.openConsultation();
  }

}
