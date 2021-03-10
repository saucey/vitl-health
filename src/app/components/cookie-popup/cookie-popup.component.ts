import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-cookie-popup',
  templateUrl: './cookie-popup.component.html',
  styles: []
})
export class CookiePopupComponent implements OnInit {

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {

  }

  dismissed() {
    return this.cookieService.getCookie('cookie-popup-dismissed');
  }

  dismiss() {
    this.cookieService.setCookie('cookie-popup-dismissed', true);
  }

  navigate() {
    this.dismiss();
    this.router.navigate(['/privacy']);
  }
}
