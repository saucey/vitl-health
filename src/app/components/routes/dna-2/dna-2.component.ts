import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {SwiperComponent, SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-dna-2',
  templateUrl: './dna-2.component.html',
  styles: []
})
export class Dna2Component implements OnInit {

  product;
  transitionImages;
  transitionImagesMobile;
  traitCategories;
  activeExpandItem = 1;
  activeExpandFaq = -1;

  carouselConfig: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 82,
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

  carousel2Config: SwiperConfigInterface = {
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
  };

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
    this.transitionImages = [
      'https://static-prod.vitl.com/images/dna/dna-s3-c-1.png?width=470',
      'https://static-prod.vitl.com/images/dna/dna-s3-c-2.png?width=470',
      'https://static-prod.vitl.com/images/dna/dna-s3-c-3.png?width=470'
    ];

    this.transitionImagesMobile = this.transitionImages;
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
