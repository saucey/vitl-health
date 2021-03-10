import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {CookieService} from '../../../services/cookie.service';
import {SegmentService} from '../../../services/segment.service';

@Component({
  selector: 'app-personalised',
  templateUrl: './personalised.component.html',
  styles: []
})
export class PersonalisedComponent implements OnInit {

  product;

  priceText;

  freeTrial = false;

  save50 = false;

  carouselConfig: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: false,
    init: true,
    followFinger: false,
    pagination: {
      el: '.personalised-s2-carousel-slide-dots',
      type: 'bullets',
      bulletClass: 'carousel-dot',
      bulletActiveClass: 'is-active',
      clickable: true
    },
    navigation: {
      nextEl: '#personalised-s2--next-el',
      prevEl: '#personalised-s2--prev-el'
    },
    breakpoints: {
      992: {
        slidesPerView: 1,
        loop: true,
        followFinger: true
      },
    }
  };

  carousel2Config: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: false,
    init: true,
    followFinger: false,
    pagination: {
      el: '.personalised-s3--carousel-slide-dots',
      type: 'bullets',
      bulletClass: 'carousel-dot',
      bulletActiveClass: 'is-active',
      clickable: true
    },
    breakpoints: {
      992: {
        init: true,
        slidesPerView: 1,
        loop: true,
        followFinger: true
      },
    }
  };

  carousel3Config: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: false,
    init: true,
    followFinger: false,
    pagination: {
      el: '.personalised-s6--carousel-slide-dots',
      type: 'bullets',
      bulletClass: 'carousel-dot',
      bulletActiveClass: 'is-active',
      clickable: true
    },
    navigation: {
      nextEl: '#personalised-s6--next-el',
      prevEl: '#personalised-s6--prev-el'
    },
    breakpoints: {
      992: {
        init: true,
        slidesPerView: 1,
        loop: true,
        followFinger: true
      },
    }
  };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private cookieService: CookieService,
    private segmentService: SegmentService,

  ) {
    this.globalService.setTitle('Personalised');
    this.globalService.setMetaTag({
      name: 'description',
      content: 'Using advanced diagnostic technology - delivered through a free mobile app - we create personalised packs of high quality supplements to get you at your best'
    });
  }

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
    if (this.product) {
      this.priceText = this.product.plans[0].offerPrice ? this.product.plans[0].offerPrice : this.product.plans[0].rrp;
    }

    this.freeTrial = this.route.snapshot.data.freeTrial;
    this.save50 = this.route.snapshot.data.save50;

    if (this.save50) {
      this.cookieService.setExpirableCookie('personalisedPlusPartnership', 'save-50', 14);
      this.segmentService.pageVisit('Personalised - Save 50%');
    } else if (this.freeTrial) {
      this.cookieService.setExpirableCookie('personalisedPlusPartnership', 'free-trial', 14);
      this.segmentService.pageVisit('Personalised - Free trial');
    }

    localStorage.setItem('consultationProduct', 'PP');
  }

  openConsultation() {
    this.router.navigateByUrl('/consultation');
  }

}
