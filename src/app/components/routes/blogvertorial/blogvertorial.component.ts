import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {SegmentService} from '../../../services/segment.service';

@Component({
  templateUrl: './blogvertorial.component.html',
  styleUrls: ['./css/mesh.min.css', './css/styles.css']
})
export class BlogvertorialComponent {

  w = window;

  carouselConfig: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: false,
    init: true,
    followFinger: false,
    pagination: {
      el: '.blood-s4-carousel-slide-dots',
      type: 'bullets',
      bulletClass: 'carousel-dot',
      bulletActiveClass: 'is-active',
      clickable: true,

    },
    breakpoints: {
      800: {
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
      el: '.blood-s5-carousel-slide-dots',
      type: 'bullets',
      bulletClass: 'carousel-dot',
      bulletActiveClass: 'is-active',
      clickable: true,

    },
    breakpoints: {
      800: {
        slidesPerView: 1,
        loop: true,
        followFinger: true
      },
    }
  };

  constructor(
    private globalService: GlobalService,
    private segmentService: SegmentService,
  ) {
    this.segmentService.pageVisit("Blogvertorial");
    this.globalService.setTitle("Do we Really Need Supplements?");
    this.globalService.setMetaTag({
      name: 'description',
    });
  }
}
