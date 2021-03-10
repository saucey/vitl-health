import { Component, OnDestroy, OnInit } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {GlobalService} from '../../../services/global.service';
import {SegmentService} from '../../../services/segment.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit, OnDestroy {

  category;
  private ngUnsubscribe$ = new Subject();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private globalService: GlobalService,
        private segmentService: SegmentService
    ) {
        this.router.events.filter(event => event instanceof NavigationEnd).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
            this.category = this.route.snapshot.data.category;
            this.globalService.setTitle(this.category.pageTitle);
            this.globalService.setMetaTag({
                name: 'description',
                content: this.category.pageDescription
            });
        });
    }

    ngOnInit() {
      this.segmentService.pageVisit('Category - ' + this.category.label);
    }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
