import {Component, Input} from '@angular/core';
import {CookieService} from '../../services/cookie.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styles: []
})
export class BannerComponent {
  @Input() type;

  constructor(
    private cookieService: CookieService
  ) { }

  dismissed() {
    return this.cookieService.getCookie('utm-banner-dismissed');
  }

  dismiss() {
    this.cookieService.setCookie('utm-banner-dismissed', true, 3);
  }

  // hideBanner() {
  //     return this.globalService.hideBanner();
  // }

  // showPopup() {
  //   this.globalService.showPopup();
  // }
}
