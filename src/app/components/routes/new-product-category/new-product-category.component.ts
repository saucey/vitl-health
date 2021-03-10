import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { ViewportScroller } from '@angular/common';
import {GlobalService} from '../../../services/global.service';
import { SegmentService } from '../../../services/segment.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-new-product-category',
  templateUrl: './new-product-category.component.html',
  styleUrls: ['./new-product-category.component.css']
})
export class NewProductCategoryComponent implements OnInit, OnDestroy {

    category;
    content;
    productsLayout;
  selectedProductID = null;
  private ngUnsubscribe$ = new Subject();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private globalService: GlobalService,
        private viewportScroller: ViewportScroller,
        private segmentService: SegmentService
    ) {
      this.router.events.filter(event => event instanceof NavigationEnd).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
        this.category = this.route.snapshot.data.category;
        this.content = this.category.content;
        this.productsLayout = this.content.products.items.length % 2 === 0 ? 'even' : 'odd';
        this.globalService.setTitle(this.category.pageTitle);
        this.globalService.setMetaTag({
            name: 'description',
            content: this.category.pageDescription
        });
      });
    }

    ngOnInit() {
      this.segmentService.pageVisit('Category - ' + this.category.label);
      // offset for the sticky header
      this.viewportScroller.setOffset([0, 120]);
    }

    handleScrollToElementId(id) {
      this.viewportScroller.scrollToAnchor(id);
    }

    handleSelectProduct(id) {

      if (id) {
        this.viewportScroller.scrollToAnchor(id);
      } else {
        this.viewportScroller.scrollToAnchor(this.content.products[0].id);
      }

      this.selectedProductID = id;
    }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
