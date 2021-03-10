import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {SwiperComponent, SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {SegmentService} from '../../../services/segment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  carouselConfig: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 15,
    loop: false,
    init: true,
    followFinger: false,
    pagination: {
      el: '.carousel-dots--hiw',
      type: 'bullets',
      bulletClass: 'carousel-dot',
      bulletActiveClass: 'is-active',
      clickable: true
    },
    breakpoints: {
      767: {
        init: true,
        slidesPerView: 1,
        loop: true,
        followFinger: true
      },
    }
  };

  carouselConfigBenefits: SwiperConfigInterface = {
    slidesPerView: 4,
    spaceBetween: 0,
    loop: false,
    init: true,
    followFinger: false,
    pagination: {
      el: '.carousel-dots--benefits',
      type: 'bullets',
      bulletClass: 'carousel-dot',
      bulletActiveClass: 'is-active',
      clickable: true
    },
    breakpoints: {
      767: {
        init: true,
        slidesPerView: 1,
        loop: true,
        followFinger: true
      },
    }
  };

  carouselConfigExperts: SwiperConfigInterface = {
    slidesPerView: 4,
    spaceBetween: 10,
    loop: false,
    init: true,
    followFinger: false,
    pagination: {
      el: '.carousel-dots--experts',
      type: 'bullets',
      bulletClass: 'carousel-dot',
      bulletActiveClass: 'is-active',
      clickable: true
    },
    breakpoints: {
      767: {
        init: true,
        slidesPerView: 1,
        loop: true,
        followFinger: true
      },
    }
  };

  carouselConfigReviews: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: false,
    init: true,
    followFinger: false,
    pagination: {
      el: '.carousel-dots--reviews',
      type: 'bullets',
      bulletClass: 'carousel-dot',
      bulletActiveClass: 'is-active',
      clickable: true
    },
    breakpoints: {
      767: {
        init: true,
        slidesPerView: 1,
        loop: true,
        followFinger: true
      },
    }
  };

  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private segmentService: SegmentService
  ) { }

  ngOnInit() {
    this.segmentService.pageVisit('Home');
    this.globalService.setTitle('Personalised vitamins, DNA kits, blood tests & more');
    this.globalService.setMetaTag({
      name: 'description',
      content: 'Feel 100% more often with filler-free, non-GMO nutritional supplements made from the highest quality vitamins & minerals to keep your body functioning its best'
    });
  }

  openConsultation() {
    this.router.navigateByUrl('/consultation');
  }
}
