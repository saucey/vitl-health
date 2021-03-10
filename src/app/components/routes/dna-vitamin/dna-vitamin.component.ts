import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {SwiperComponent, SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-dna-vitamin',
  templateUrl: './dna-vitamin.component.html',
  styles: []
})
export class DnaVitaminComponent implements OnInit {

  vitamins = [
    {
      name: 'Vitamin A',
      description: 'Affects eyesight, reproduction, immunity and skin health.',
      amount: null,
      imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-A.jpg?v=1',
      sources: []
    },
    {
      name: 'Vitamin B6',
      amount: null,
      description: 'Plays a key role in energy levels, metabolism and brain health.',
      imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-B6.jpg',
      sources: []
    },
    {
      name: 'Vitamin B9 (Folate)',
      description: 'Particularly important in pregnancy and also involved in immune health.',
      amount: null,
      imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-B9.jpg',
      sources: []
    },
    {
      name: 'Vitamin B12',
      description: 'Only found in animal products and has a big impact on energy levels.',
      amount: null,
      imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-B12.jpg',
      sources: []
    },
    {
      name: 'Vitamin C',
      description: 'This immune system hero also acts as an antioxidant, keeping cells healthy.',
      amount: null,
      imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-C.jpg',
      sources: []
    },
    {
      name: 'Vitamin D',
      description: 'The ‘sunshine vitamin’ is mainly obtained from direct exposure to sunlight.',
      amount: null,
      imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-D.jpg',
      sources: []
    },
    {
      name: 'Vitamin E',
      description: 'Its main role is to act as an antioxidant, protecting cells from damage.',
      amount: null,
      imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-E.jpg',
      sources: []
    },
    {
      name: 'Biotin',
      description: 'Affects skin and hair health, as well as neurological function.',
      amount: null,
      imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Biotin.jpg',
      sources: []
    },
    {
      name: 'Calcium',
      description: 'Essential for strong bones and teeth, and also affects hormone regulation.',
      amount: null,
      imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Calcium.jpg',
      sources: []
    },
    {
      name: 'Iron',
      description: 'Affects energy levels and helps transport oxygen around the body.',
      amount: null,
      imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Iron.jpg',
      sources: []
    },
    {
      name: 'Omega 3 & 6',
      description: 'These essential fatty acids are involved in a huge number of bodily processes.',
      amount: null,
      imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Omega-3-and-6.jpg',
      sources: []
    },
    {
      name: 'Choline',
      description: 'This nutrient affects memory, muscle movement and fat metabolism.',
      amount: null,
      imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Choline.jpg',
      sources: []
    },
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
      description: 'You will receive an email to access your results and personalised recommendations',
      iconUrl: 'https://static.vitl.com/images/icons/icon-result.svg'
    }
  ];

  product; 
  activeExpandItem = 1;
  activeExpandFaq = -1;
  similarProducts = [43, 45];

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

  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private cartService: CartService
  ) {
    this.product = this.route.snapshot.data.product;
    this.globalService.setTitle(this.product.pageTitle);
    this.globalService.setMetaTag({
      name: 'description',
      content: this.product.pageDescription
    });
  }

  ngOnInit() {
 
  }

  add() {
    this.globalService.startLoading();
     this.cartService.addPlan(this.product.plans[0], 1).then(() => {
      this.globalService.stopLoading();
      this.cartService.showCart();
    }, () => this.globalService.stopLoading());
  }

  toggleExpandFaq(val: number) {
    this.activeExpandFaq = this.activeExpandFaq !== val ? val : -1;
  }

  toggleExpand(val: number) {
    this.activeExpandItem = this.activeExpandItem !== val ? val : -1;
  }
}
