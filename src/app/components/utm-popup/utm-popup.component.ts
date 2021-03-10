import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-utm-popup',
  templateUrl: './utm-popup.component.html',
  styles: []
})
export class UtmPopupComponent implements OnInit {

  @Input() type;

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {

  }

  dismissed() {
    return this.cookieService.getCookie('utm-popup-dismissed');
  }

  dismiss() {
    this.cookieService.setCookie('utm-popup-dismissed', true, 3);
  }

  navigate() {
    this.dismiss();
    this.router.navigate(['/product/dna']);
  }
}
