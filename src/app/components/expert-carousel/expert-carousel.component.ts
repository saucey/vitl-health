import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {SwiperComponent} from 'ngx-swiper-wrapper';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as miscQueries from '../../queries/misc';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-expert-carousel',
    templateUrl: './expert-carousel.component.html',
    styles: []
})

export class ExpertCarouselComponent implements OnInit, AfterViewInit, OnDestroy {

    constructor(private apiService: ApiService) {
    }

    experts;

    imagesConfig = {
        width: 200,
        height: 0,
        compress: 1,
        background: '#ffffff'
    };

  private ngUnsubscribe$ = new Subject();

    expertCarouselConfig: SwiperConfigInterface = {
        slidesPerView: 4,
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

    @ViewChild(SwiperComponent) componentRef?: SwiperComponent;

    ngOnInit() {
        const queryString = '?' + Object.entries(this.imagesConfig).map(([key, value]) => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`;
        }).join('&');

        this.apiService.query(miscQueries.GetExperts).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(({data}) => {
            this.experts = [
                {
                    image: data.monalImage.url + queryString,
                    name: 'Dr Monal Wadhera',
                    title: data.monalTitle,
                    bio: data.monalBio
                },
                {
                    image: data.monikaImage.url + queryString,
                    name: 'Dr Monika Mozere',
                    title: data.monikaTitle,
                    bio: data.monikaBio
                },
                {
                    image: data.georgieImage.url + queryString,
                    name: 'Georgie Murphy',
                    title: data.georgieTitle,
                    bio: data.georgieBio
                },
                {
                    image: data.garethImage.url + queryString,
                    name: 'Gareth Nicholas',
                    title: data.garethTitle,
                    bio: data.garethBio
                }
            ];
        });
    }

    ngAfterViewInit() {
        this.componentRef.directiveRef.init();
    }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
