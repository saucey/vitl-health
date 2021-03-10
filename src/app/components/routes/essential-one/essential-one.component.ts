import { Component, OnDestroy, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {ApiService} from '../../../services/api.service';
import {ConfigService} from '../../../services/config.service';
import {SegmentService} from '../../../services/segment.service';
import {CookieService} from '../../../services/cookie.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-essential-one',
  templateUrl: './essential-one.component.html',
  styles: []
})
export class EssentialOneComponent implements OnInit, OnDestroy {

  partner: string;
  freeTrial = false;
  freeDelivery = false;
  private ngUnsubscribe$ = new Subject();

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private globalService: GlobalService,
      private apiService: ApiService,
      private configService: ConfigService,
      private segmentService: SegmentService,
      private cookieService: CookieService

  ) { }

  ngOnInit() {

    this.globalService.setTitle('The one supplement for the one you');
    this.globalService.setMetaTag({
        name: 'description',
        content: 'A single daily nutritional supplement, tailor-made for you and delivered to your door.'
    });

    this.partner = this.route.snapshot.data.partnership;
    this.freeTrial = this.route.snapshot.data.freeTrial;

    if (this.partner === 'referral') {
        this.globalService.setMetaTag({
            property: 'og:image',
            content: `https://static.vitl.com/eo/${this.route.snapshot.params.code}.png`
        });
    } else {
        this.globalService.setMetaTag({
            property: 'og:image',
            content: 'https://static-prod.vitl.com/new/images/source/1547143942-cartbottle-3x.png'
        });
    }

    if (this.globalService.isBrowser()) {
        this.cookieService.setExpirableCookie('essentialOnePartnership', this.partner, 14);
        localStorage.setItem('consultationProduct', 'EO');
        if (this.storeTracking()) {
            this.globalService.storeUtmParam('utm_source', this.partner);
            this.globalService.storeUtmParam('utm_campaign', 'Jan19');
            this.globalService.storeUtmParam('utm_medium', 'inserts');
        }
    }

      this.configService.getConfig().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(config => {
          if (config.country === 'GB') {
              this.freeDelivery = true;
          }
      });

    if (this.freeTrial) {
      this.segmentService.pageVisit('Essential One - Free trial');
    } else {
      this.segmentService.pageVisit('Essential One - ' + this.partner);
    }

  }

  showLogo() {
    return [ 'generic', 'elle', 'cosmo', 'wh', 'investor', 'paid-social', 'iknowj', 'crowd', 'essential-one-free-delivery', 'essential-one-save-30', 'referral', 'essential-one-save-50', 'essential-one-price-test', 'essential-one-referral' ].indexOf(this.partner) === -1;
  }

  storeTracking() {
    return [ 'paid-social', 'we-are-tea', 'crowd', 'generic', 'essential-one-free-delivery', 'essential-one-save-30', 'o2priorityjuneoffer', 'o2priorityjuneoffer2' ].indexOf(this.partner) === -1;
  }

  getPrice() {
    let price;
    if (this.partner == 'essential-one-price-test') {
      price = '£9.95';
      switch (this.apiService.getCurrency()) {
        case 'EUR' :
          price = '€24.95';
          break;
        case 'USD' :
          price = '$26.95';
          break;
        case 'AUD' :
          price = '$39.95';
          break;
      }
    } else {
      price = '£14.95';
      switch (this.apiService.getCurrency()) {
        case 'EUR' :
          price = '€19.95';
          break;
        case 'USD' :
          price = '$19.95';
          break;
        case 'AUD' :
          price = '$29.95';
          break;
      }
    }
      return price;
  }

  get50OffPrice() {
    let price = '£7.47';
    switch (this.apiService.getCurrency()) {
      case 'EUR' : price = '€9.97'; break;
      case 'USD' : price = '$9.97'; break;
      case 'AUD' : price = '$14.97'; break;
    }
    return price;
  }

  openConsultation() {
    this.globalService.openConsultation(true);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
