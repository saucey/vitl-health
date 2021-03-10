import { Component } from '@angular/core';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styles: []
})
export class ReferralComponent {

  carouselConfig: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 82,
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
      992: {
        init: true,
        slidesPerView: 1,
        loop: true,
        followFinger: true
      },
    }
  };

  faqs = [
    {
      question: 'I referred someone but I can’t see the credit in my account, please help!?',
      answer: 'You will see the referral credit on your dashboard as soon as your friends place their first order using the unique coupon code (or the link you sent them). Your credit is visible on the top left hand side of your dashboard and will automatically update as soon as more of your friends sign up!'
    },
    {
      question: 'I have referral credit in my account. Can I apply it to my subscription?',
      answer: 'Yep! Your referral credit will automatically be deducted from your next invoice, so no need to do anything other than sit back and save money!'
    },
    {
      question: 'Can I use my credit on any product?',
      answer: 'You can use your credit on any of our subscription products, including the quarterly Vitamin Blood Test subscription and any personalised vitamin subscriptions. Hooray!'
    }
  ];
  activeExpandItem = -1;

  constructor(
  ) { }

  toggleExpand(val: number) {
    this.activeExpandItem = this.activeExpandItem !== val ? val : -1;
  }

}
