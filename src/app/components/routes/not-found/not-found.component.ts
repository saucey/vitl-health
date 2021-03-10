import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import * as blogQueries from '../../../queries/blog';
import {GlobalService} from '../../../services/global.service';
import { Response } from 'express';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {

    swiperConfig = {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.carousel2__dots-wrap',
            type: 'bullets',
            bulletClass: 'carousel2__dot',
            bulletActiveClass: 'is-active',
            clickable: true
        }
    };

  articles = [];

  private ngUnsubscribe$ = new Subject();

  constructor(
      private apiService: ApiService,
      private globalService: GlobalService,
      private injector: Injector
  ) {

    this.apiService.query(blogQueries.GetArticles, { page: 1, limit: 3 }).map(({data}) => data.blog_articles.articles).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((articles) => {
      this.articles = articles;
    });

    if (this.globalService.isBrowser() === false) {
        this.injector.get(RESPONSE).status(404);
    }

  }

  ngOnInit() {
      this.globalService.setTitle('Page not found');
      this.globalService.setMetaTag({
          name: 'description',
          content: ''
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
