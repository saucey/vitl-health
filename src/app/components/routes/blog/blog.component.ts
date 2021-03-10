import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {BlogService} from '../../../services/blog.service';
import {GlobalService} from '../../../services/global.service';
import {SegmentService} from '../../../services/segment.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {


  categories;
  articles = [];
  top = [];
  hasNext: boolean;
  current: number;
  loadingMore = false;
  private ngUnsubscribe$ = new Subject();

  constructor(
      private route: ActivatedRoute,
      private blogService: BlogService,
      private globalService: GlobalService,
      private segmentService: SegmentService,
  ) {
      this.categories = this.route.snapshot.data.blogConfig.categories;
      this.articles = this.route.snapshot.data.blogConfig.pagination.articles;
      this.top = this.route.snapshot.data.blogConfig.top;
      this.hasNext = this.route.snapshot.data.blogConfig.pagination.hasNext;
      this.current = this.route.snapshot.data.blogConfig.pagination.current;
  }

  ngOnInit() {
    this.segmentService.pageVisit('Blog');
    this.globalService.setTitle('All articles', 'Vitl life');
      this.globalService.setMetaTag({
          name: 'description',
          content: 'Find a healthy recipe, read the latest nutrition news and get top lifestyle advice from our team of health and fitness gurus'
      });
  }

  loadMore() {
    if (this.hasNext) {
      this.loadingMore = true;
      this.blogService.getAllArticles(this.current + 1).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((pagination) => {
        this.loadingMore = false;
        this.articles = this.articles.concat(pagination.articles);
        this.hasNext = pagination.hasNext;
        this.current = pagination.current;
      }, () => this.loadingMore = false);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
