import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {BlogService} from '../../../services/blog.service';
import {GlobalService} from '../../../services/global.service';
import {SegmentService} from '../../../services/segment.service';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.css']
})
export class BlogCategoryComponent implements OnInit, OnDestroy {

    categories;
    category;
    articles = [];
    top = [];
    hasNext: boolean;
    current: number;
    loadingMore = false;
    private ngUnsubscribe$ = new Subject();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private blogService: BlogService,
        private globalService: GlobalService,
        private segmentService: SegmentService,
    ) {

        this.categories = this.route.snapshot.data.blogConfig.categories;

        this.router.events.filter(event => event instanceof NavigationEnd).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {

            this.top = this.route.snapshot.data.blogConfig.top;
            this.category = this.route.snapshot.data.blogConfig.category;
            this.articles = this.category.articleList.articles;
            this.hasNext = this.category.articleList.hasNext;
            this.current = this.category.articleList.current;
            this.globalService.setTitle(this.category.label, 'Vitl life');
            this.globalService.setMetaTag({
                name: 'description',
                content: this.category.description
            });

        });

    }

    ngOnDestroy() {
      this.ngUnsubscribe$.next();
      this.ngUnsubscribe$.complete();
    }

    ngOnInit() {
      this.segmentService.pageVisit('Blog category - ' + this.category.label);
    }

    loadMore() {
        if (this.hasNext) {
            this.loadingMore = true;
            this.blogService.getCategory(this.category.slug, this.current + 1).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((category) => {
                this.loadingMore = false;
                this.category = category;
                this.articles = this.articles.concat(this.category.articleList.articles);
                this.hasNext = this.category.articleList.hasNext;
                this.current = this.category.articleList.current;
            }, () => this.loadingMore = false);
        }

    }

}
