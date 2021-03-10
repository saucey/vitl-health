import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { SegmentService } from '../../../services/segment.service';

import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-health-goal',
  templateUrl: './health-goal.component.html'
})
export class HealthGoalComponent implements OnInit, OnDestroy {

  private ngUnsubscribe$ = new Subject();

  carouselConfigBenefits: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 40,
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
  product;
  productOneOffOnly;
  content;
  selectedTab;
  selectedTabContent;

  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private segmentService: SegmentService
  ) {

    this.router.events.filter(event => event instanceof NavigationEnd).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
      this.product = this.route.snapshot.data.product;
      // for AB test
      this.productOneOffOnly = Object.assign({}, this.route.snapshot.data.product);
      this.productOneOffOnly.plans = this.productOneOffOnly.plans.filter(plan => plan.type === 'one_off');
      this.productOneOffOnly.plans[0].default = true;
      // end AB test
      this.content = this.product.content;
      this.selectedTabContent = this.content.facts.items[0];
      this.selectedTab = this.content.facts.items[0].category;
      this.globalService.setTitle(this.product.pageTitle);
      this.globalService.setMetaTag({
        name: 'description',
        content: this.product.pageDescription
      });
      this.globalService.emitTrackingEvent('viewContent', {
        type: 'product',
        id: this.product.id,
        label: this.product.label
      });
    });


  }

  ngOnInit() {
    this.segmentService.pageVisit('Product - ' + this.product.label);
  }

  toggleTab(val: string) {
    this.selectedTab = this.content.facts.items[val].category;
    this.selectedTabContent = this.content.facts.items[val];
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
