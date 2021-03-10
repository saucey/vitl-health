import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
@Component({
  selector: 'app-covid-awareness',
  templateUrl: './covid-awareness.component.html',
  styles: []
})
export class CovidAwarenessComponent implements OnInit {

  products = [73, 32, 7];

  constructor(
    private globalService: GlobalService
  ) {
    this.globalService.setTitle('Corona Tips');
    this.globalService.setMetaTag({
      name: 'description',
      content: ''
    });
  }

  ngOnInit() {
    
  }
}
