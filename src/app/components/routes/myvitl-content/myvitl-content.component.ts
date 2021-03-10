import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {ContentService} from '../../../services/content.service';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-myvitl-content',
  templateUrl: './myvitl-content.component.html',
  styles: []
})
export class  MyvitlContentComponent implements OnInit, OnDestroy {

  screen;
  private ngUnsubscribe$ = new Subject();

  nav = [];

  constructor(private router: Router, private route: ActivatedRoute, private contentService: ContentService, private globalService: GlobalService) {
      this.router.events.filter(event => event instanceof NavigationEnd).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((event: any) => {
          this.screen = this.route.snapshot.data.screen;
      });
      this.globalService.events.filter(event => event.type === 'swapContent').pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
          this.screen = event.data;
      });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}


