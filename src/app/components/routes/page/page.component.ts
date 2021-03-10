import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Page } from '../../../classes/page';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, OnDestroy {

  page: Page;
  private ngUnsubscribe$ = new Subject();

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private globalService: GlobalService
  ) {
      this.router.events.filter(event => event instanceof NavigationEnd).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
          this.page = this.route.snapshot.data.page;
          this.globalService.setTitle(this.page.title);
          this.globalService.setMetaTag({
              name: 'description',
              content: this.page.description
          });
      });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
