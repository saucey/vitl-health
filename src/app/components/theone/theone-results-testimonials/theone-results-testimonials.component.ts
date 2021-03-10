import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {SwiperConfigInterface} from '../../../../../node_modules/ngx-swiper-wrapper';
import { SwiperComponent } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-theone-results-testimonials',
  templateUrl: './theone-results-testimonials.component.html',
  styles: []
})
export class TheoneResultsTestimonialsComponent implements OnInit, AfterViewInit {

  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;

  testimonials = [
      {
        quote: 'I’ve tried so many popular brands … nothing else makes such a difference. I would highly recommend to anyone.',
        image: 'testimonial-francesco',
        name: 'Francesco F'
      },
      {
          quote: 'I started on my personalised vitamins after identifying what I needed exactly and the change has been AMAZING. My energy levels are through the roof.',
          image: 'testimonial-yasmin',
          name: 'Yasmin K'
      },
      {
          quote: 'Great customer service, and fantastic products. I have already started feeling better!',
          image: 'testimonial-simon',
          name: 'Simon F'
      }
  ];

    carouselConfig: SwiperConfigInterface = {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: false,
        init: true,
        followFinger: false,
        pagination: {
            el: '.expert-carousel__dots-wrap',
            type: 'bullets',
            bulletClass: 'expert-carousel__dot',
            bulletActiveClass: 'is-active',
            clickable: true
        },
        breakpoints: {
            992: {
                init: true,
                slidesPerView: 3,
                loop: true,
                followFinger: true
            },
            768: {
                slidesPerView: 2,
                loop: true,
                followFinger: true
            },
            480: {
                slidesPerView: 1,
                loop: true,
                followFinger: true
            }
        }
    };

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
      this.componentRef.directiveRef.init();
  }

}
