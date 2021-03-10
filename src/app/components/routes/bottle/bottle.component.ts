import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {SwiperComponent, SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-bottle',
  templateUrl: './bottle.component.html',
  styles: []
})
export class BottleComponent {

  product;

  carouselConfig: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 100,
    loop: false,
    init: true,
    followFinger: false,
    pagination: {
      el: '.carousel-dots',
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

  add() {
    this.globalService.startLoading();
     this.cartService.addPlan(this.product.plans[0], 1).then(() => {
      this.globalService.stopLoading();
      this.cartService.showCart();
    }, () => this.globalService.stopLoading());
  }
}
