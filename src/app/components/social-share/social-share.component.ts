import { Component, OnInit, Input } from '@angular/core';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styles: []
})
export class SocialShareComponent implements OnInit {

  @Input() url: string;
  @Input() subject: string;
  @Input() description: string;
  @Input() image: string;

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
  }

  hasShareSheet() {
    return ((<any>window).navigator.share ? true : false);
  }

  openShareSheet() {
    (<any>window).navigator.share({
      title: this.subject,
      text: this.description,
      url: this.url
    });
  }

  isMac() {
    if (this.globalService.isBrowser()) {
      return (navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false);
    }
  }

}
