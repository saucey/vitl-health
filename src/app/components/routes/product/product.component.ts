import { OnDestroy } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {GlobalService} from '../../../services/global.service';
import {SegmentService} from '../../../services/segment.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

    @Input() showHero = true;
    @Input() showPopular = true;
    private ngUnsubscribe$ = new Subject();

    product;
    popularProducts;
    qualityAccordionIndex = 0;
    pillAccordionIndex;
    stripAccordionIndex;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private globalService: GlobalService,
        private segmentService: SegmentService
    ) {

        this.router.events.filter(event => event instanceof NavigationEnd).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
            this.product = this.route.snapshot.data.product;
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

    ngOnDestroy() {
      this.ngUnsubscribe$.next();
      this.ngUnsubscribe$.complete();
    }

}
