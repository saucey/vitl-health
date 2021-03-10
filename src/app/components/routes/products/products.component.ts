import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {GlobalService} from '../../../services/global.service';
import {SegmentService} from '../../../services/segment.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  categories;
  private ngUnsubscribe$ = new Subject();

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private globalService: GlobalService,
      private segmentService: SegmentService,
  ) {
    this.router.events.filter(event => event instanceof NavigationEnd).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
      this.categories = this.route.snapshot.data.categories;
    });
  }

  ngOnInit() {
    this.segmentService.pageVisit('Products');
    this.globalService.setTitle('Products');
      this.globalService.setMetaTag({
          name: 'description',
          content: 'Get the nutritional support your body needs so you can feel your best - free from bulking agents and made from the highest quality, most absorbable ingredients'
      });
  }


  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
