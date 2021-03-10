import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { GlobalService } from '../../../services/global.service';
import { SegmentService } from '../../../services/segment.service';
import {SwiperComponent, SwiperConfigInterface} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-compare-dna-tests',
  templateUrl: './compare-dna-tests.component.html',
    styles: []
})
export class CompareDnaTestsComponent {

  fromAmount = '';
  activeExpandFaq = -1;
  activeExpandBenefits = [false, false];
  hasPromo = false;

  dnaTests = [
    {
      id: 45,
      label: 'Nutrition DNA Test',
      description: 'The most comprehensive test providing over 40 reports on your body’s dietary, fitness and lifestyle preferences.',
      imgUrl: 'https://static-prod.vitl.com/images/dna/dna-nutrition-box.png',
      route: '/product/dna',
      benefits: [
        'Results in just 2-3 weeks',
        'Personalised dietary & lifestyle recommendations',
        'Vitamins & nutrients',
        'Diet & intolerances',
        'Skin & hair',
        'Fitness & body composition',
        'Pregnancy & fertility',
        'Sleep & energy'
      ],
      bgColor: 'teal',
      product: null
    },
    {
      id: 75,
      label: 'Vitamin DNA Test',
      description: 'Focus specifically on optimising your nutrition with 12 reports on vitamin and mineral absorption.',
      imgUrl: 'https://static-prod.vitl.com/images/dna/dna-vitamin-box.png',
      route: '/product/dna-vitamin-test',
      benefits: [
        'Results in just 2-3 weeks',
        'Personalised dietary & lifestyle recommendations',
        'Vitamins & nutrients'
      ],
      bgColor: 'teal',
      product: null
    }
  ];

  hiw = [
    {
      label: 'Order your DNA Nutrition Test',
      description: 'You will receive our letterbox-friendly kit within 3-5 business days',
      iconUrl: 'https://static.vitl.com/images/icons/icon-dna-box.svg'
    },
    {
      label: 'Take your saliva sample',
      description: 'Use the swab to take a saliva sample from inside your cheek then send it back in the prepaid post bag',
      iconUrl: 'https://static.vitl.com/images/icons/icon-swab.svg'
    },
    {
      label: 'Results in just 2-3 weeks',
      description: 'You will receive an email to access your results and personalised recommendations <a class="link" href="https://static.vitl.com/files/Sample-DNA-Report.pdf">view sample report</a>',
      iconUrl: 'https://static.vitl.com/images/icons/icon-result.svg'
    }
  ];

  carouselConfig: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: false,
    init: true,
    followFinger: false,
    pagination: {
      el: '.carousel-dots--dna',
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

  carouselConfigHiw: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 40,
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

  carouselConfigReviews: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 25,
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
      992: {
        init: true,
        slidesPerView: 1,
        loop: true,
        followFinger: true
      },
    }
  }

  constructor(
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private globalService: GlobalService,
    private segmentService: SegmentService
  ) {

    this.segmentService.pageVisit('DNA tests');
    this.globalService.setTitle('DNA tests');
    this.globalService.setMetaTag({
      name: 'description',
      content: 'DNA Tests'
    });

    this.dnaTests[0].product = this.route.snapshot.data.products[0];
    this.dnaTests[1].product = this.route.snapshot.data.products[1];
    this.fromAmount = this.dnaTests[1].product.fromAmount;

    // this.hasPromo = this.route.snapshot.data.hasPromo;

    // if (this.hasPromo) {
    //   this.dnaTests[0].product.plans[0].offerPrice = '£69.00';
    // }
  }

  toggleExpandFaq(val: number) {
    this.activeExpandFaq = this.activeExpandFaq !== val ? val : -1;
  }

  handleScrollToElementId(id) {
    this.viewportScroller.scrollToAnchor(id);
  }
}