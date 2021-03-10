import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SwiperComponent} from 'ngx-swiper-wrapper';
import {GlobalService} from '../../../services/global.service';
import {ContentService} from '../../../services/content.service';
import {CartService} from '../../../services/cart.service';
import * as lanaQueries from '../../../queries/lana';
import {ApiService} from '../../../services/api.service';
import {ModalService, ModalTypes} from '../../../modules/modal/services/modal.service';
import {CookieService} from '../../../services/cookie.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-consultation-result',
    templateUrl: './consultation-result.component.html',
    styles: []
})
export class ConsultationResultComponent implements OnInit, OnDestroy {

    @ViewChild(SwiperComponent) componentRef?: SwiperComponent;

    result;
    warningScreen;
    slides = [];
    slide = '';

    pills;

    // isFreeTrial = false;
    // isSave50 = false;

    circles = Array(100);

    swiperConfig = {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        allowTouchMove: false,
        pagination: false,
        init: true,
        breakpoints: {
            768: {
                slidesPerView: 1,
                allowTouchMove: false,
                pagination: {
                    el: '.carousel2__dots-wrap',
                    type: 'bullets',
                    bulletClass: 'carousel2__dot',
                    bulletActiveClass: 'is-active',
                    clickable: true
                }
            }
        }
    };

    private ngUnsubscribe$ = new Subject();

    constructor(
        private route: ActivatedRoute,
        private globalService: GlobalService,
        private contentService: ContentService,
        private cartService: CartService,
        private apiService: ApiService,
        private router: Router,
        private modalService: ModalService,
        private cookieService: CookieService
    ) {
        this.result = route.snapshot.data.result;
        this.warningScreen = this.contentService.parseScreen(this.result.warningScreen);
        this.initSlides();
    }

    initSlides() {
        if (this.result.positivePillars.length) {
            this.slides.push('good-news');
        }
        if (this.result.negativePillars.length) {
            this.slides.push('bad-news');
        }
        if (this.warningScreen) {
            this.slides.push('next-steps');
            this.slides.push('warning-screen');
        } else {
            this.slides.push('next-steps');
        }
        this.slide = this.slides[0];
    }


    ngOnInit() {
        this.globalService.setTitle('Your result');
        this.globalService.setMetaTag({
            name: 'description',
            content: ''
        });
        this.apiService.query(lanaQueries.GetRecommendedPills).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(data => {
            this.pills = data.data.lana_recommendedPills;

            // if (this.cookieService.getCookie('personalisedPlusPartnership') === 'save-50' && this.pills.length > 0) {
            //   this.isSave50 = true;
            // } else if (this.cookieService.getCookie('personalisedPlusPartnership') === 'free-trial' && this.pills.length > 0) {
            //     this.isFreeTrial = true;
            // }
        });
    }

    nextSlide() {
        this.slide = this.slides[this.slides.indexOf(this.slide) + 1];
    }

    // claimFreeTrial() {
    //     this.cartService.applyCoupon('VITS2019').then(
    //         () => {
    //             // mark Goal Announcement on BE as shown - workaround to stop popup from showing
    //             this.apiService.query(lanaQueries.getGoalsAnnouncements).subscribe(data => {
    //                 // console.log(data);
    //             });
    //             this.router.navigateByUrl("/myvitl");
    //             this.cartService.showCart();
    //         });
    // }

    // claimSave50() {
    //   this.cartService.applyCoupon('VITS502019').then(
    //     () => {
    //         // mark Goal Announcement on BE as shown - workaround to stop popup from showing
    //         this.apiService.query(lanaQueries.getGoalsAnnouncements).subscribe(data => {
    //             // console.log(data);
    //         });
    //         this.router.navigateByUrl("/myvitl");
    //         this.cartService.showCart();
    //     });
    // }

  showNutritionModal(index: number) {
    this.modalService.create(ModalTypes.NutritionInfo, {
        title: this.pills[index].label,
        titleDivider: false,
        data: this.pills[index]['ingredients']
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
