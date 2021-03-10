import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ContentService} from '../../../../services/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styles: []
})
export class ContentComponent implements OnInit {

  @Input() data;
  screen: any;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.screen = this.contentService.parseScreen(this.data.content);
  }

}
