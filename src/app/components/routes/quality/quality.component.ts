import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styles: []
})
export class QualityComponent implements OnInit {

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
      this.globalService.setTitle('Quality');
      this.globalService.setMetaTag({
          name: 'description',
          content: ''
      });
  }

}
