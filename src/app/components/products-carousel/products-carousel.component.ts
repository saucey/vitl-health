import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { GlobalService } from '../../services/global.service';
import { CartService } from '../../services/cart.service';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styles: []
})
export class ProductsCarouselComponent implements OnInit, OnDestroy {

  @Input() type: 'similar' | 'popular' | 'custom';
  @Input() enableAddToBasket = false;
  @Input() exclude;
  @Input() group;
  @Input() productIDs;
  products;

  carouselConfig2: SwiperConfigInterface = {
    slidesPerView: 2,
    spaceBetween: 60,
    loop: false,
    init: true,
    followFinger: false,
    pagination: {
      el: '.carousel-dots--recommended',
      type: 'bullets',
      bulletClass: 'carousel-dot',
      bulletActiveClass: 'is-active',
      clickable: true
    },
    breakpoints: {
      768: {
        init: true,
        slidesPerView: 1,
        loop: true,
        followFinger: true
      },
    }
  };

  carouselConfig3: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 60,
    loop: false,
    init: true,
    followFinger: false,
    pagination: {
      el: '.carousel-dots--recommended',
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

  private ngUnsubscribe$ = new Subject();

  constructor(
    private productService: ProductService,
    private globalService: GlobalService,
    private cartService: CartService
  ) {}

  ngOnInit() {

    switch (this.type) {
      case 'popular' :
        this.productService.getPopularProducts(this.exclude)
          .pipe(takeUntil(this.ngUnsubscribe$)).subscribe((popularProducts) => this.products = popularProducts);
        break;
      case 'similar' :
        this.productService.getProductsByCategory(this.group, this.exclude)
          .pipe(takeUntil(this.ngUnsubscribe$)).subscribe((products) => this.products = products);
        break;
      case 'custom' :
        this.products = [];
        this.productIDs.forEach(productID => this.productService.getProductById(productID).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(product => this.products.push(product)));
        break;
    }
  }

  addToBasket(product) {
    const selectedPlan = product.plans.find(plan => plan.default);

    this.globalService.startLoading();
    this.cartService.addPlan(selectedPlan).then(() => {
      this.globalService.stopLoading();

      this.cartService.showCart();
    }, () => this.globalService.stopLoading());
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
