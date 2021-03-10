import {Component, Input, OnInit, Inject, PLATFORM_ID, OnDestroy} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { interval } from 'rxjs/observable/interval';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-image-transition',
  templateUrl: './image-transition.component.html',
  styles: []
})
export class ImageTransitionComponent implements OnInit, OnDestroy {
  @Input() images = [];
  @Input() imagesMobile = [];
  @Input() class;
  @Input() interval = 5000;
  private ngUnsubscribe$ = new Subject();

  pos = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
        interval(Number(this.interval)).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => this.pos = (this.pos < this.images.length - 1 ? this.pos + 1 : 0));
    }
  }

  hasMobileImages() {
    return Array.isArray(this.imagesMobile) &&  this.imagesMobile.length > 0;
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
