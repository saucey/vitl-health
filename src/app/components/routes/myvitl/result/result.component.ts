import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {GlobalService} from '../../../../services/global.service';
import {LanaService} from '../../../../services/lana.service';
import {AuthService} from '../../../../services/auth.service';
import {ModalService, ModalTypes} from '../../../../modules/modal/services/modal.service';
import {ModalComponent} from '../../../../modules/modal/components/modal.component';
import {SwiperComponent, SwiperConfigInterface} from 'ngx-swiper-wrapper';

import FAQS from '../../../../static-data/faqs';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
    styles: []
})
export class ResultComponent implements OnInit, OnDestroy {

  goals: Array<any> = [];
  personalisedProducts;
  similarProducts = [45, 43];
  goalAnnouncements;
  activeSubscriptions;
  faqs = FAQS.consultationResult;
  activeExpandFaq = -1;

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
  };

  private ngUnsubscribe$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private lanaService: LanaService,
    private authService: AuthService,
    private modalService: ModalService
  ) {
    this.goals = this.route.snapshot.data.dashboard.goals;
    this.goalAnnouncements = this.route.snapshot.data.dashboard.goalAnnouncements;

    // personalised product ids
    this.personalisedProducts = this.getPersonalisedProducts(this.route.snapshot.data.dashboard.recommendations);


    this.activeSubscriptions = this.route.snapshot.data.dashboard.orders
      .filter(order => order.type === 'subscription' && order.status === 'active');
  }

  ngOnInit() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {

    if (this.goalAnnouncements) {

        for (const announcement of this.goalAnnouncements) {

            this.modalService.create(ModalTypes.GoalAnnouncement, {
                title: announcement.content.title,
                subtitle: announcement.content.subtitle,
                data: {
                    goals: announcement.goals
                },
                ctas: announcement.content.buttons.map((button) => {
                  return {
                      label: button.title,
                      callback: ((modal: ModalComponent) => {
                          switch (button.action.type) {
                              case 'dismissScreen' : modal.close(); break;
                              case 'acceptRequest' : this.acceptRequest(button.action.value).then(() => modal.close()); break;
                          }
                      })
                  };
                })
            });
        }
    }
  }

  getPersonalisedProducts(recommendations) {
    const products = recommendations
      .filter(recommendation => recommendation.action.value === '/personalised' || recommendation.action.value === '/essential-one')
      .map(recommendation => {

        const product = {
          id: recommendation.id,
          type: recommendation.action.value === '/personalised' ? 'personalisedPlus' : 'essentialOne'
        };

        return product;
      });

    return products;
  }

  acceptRequest(request) {

    this.globalService.startLoading();
    return new Promise((resolve, reject) => {
        this.authService.acceptRequest(request).then(() => {
          this.lanaService.getDashboard().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((data) => {
            this.globalService.stopLoading();
            resolve(true);
        });
        }, () => this.globalService.stopLoading());
    });

  }

  handleGoalsChange() {
    this.globalService.startLoading();
    this.lanaService.getDashboard().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((data) => {
      this.personalisedProducts = this.getPersonalisedProducts(data.recommendations);
      this.globalService.stopLoading();
    });
  }

  openPillPopup(pill) {
    this.modalService.create(ModalTypes.PillDetails, {
      data: {...pill}
    });
  }

  toggleExpandFaq(val: number) {
    this.activeExpandFaq = this.activeExpandFaq !== val ? val : -1;
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
