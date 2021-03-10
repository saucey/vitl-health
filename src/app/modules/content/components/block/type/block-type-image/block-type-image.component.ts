import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {GlobalService} from '../../../../../../services/global.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-block-type-image',
  templateUrl: './block-type-image.component.html',
  styles: []
})
export class BlockTypeImageComponent implements OnInit, OnDestroy {

  ratios = {
    'normal': 0.5625,
    'x-small': 0.25,
    'small': 0.4142502071,
    'large': 1,
    'x-large': 1.7777777778
  };
  breakpoint;

  @Input() block;
  private ngUnsubscribe$ = new Subject();

  constructor(
      private breakPointObserver: BreakpointObserver,
      private globalService: GlobalService
  ) { }

  ngOnInit() {

    this.breakPointObserver.observe([
        '(max-width: 768px)',
        '(min-width: 769px and max-width: 992px)',
        '(min-width: 993px)'
    ]).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((state: BreakpointState) => {
      if (state.breakpoints['(max-width: 768px)']) {
        this.breakpoint = 'xs';
      } else if (state.breakpoints['(min-width: 769px and max-width: 992px)']) {
        this.breakpoint = 'sm';
      } else if (state.breakpoints['(min-width: 993px)']) {
        this.breakpoint = 'lg';
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  getHeight() {

    if (this.breakpoint) {

      let vw;
      let height = 0;
      let ratio = this.ratios['normal'];

      if (this.block.style && this.block.style.item_size) {
        ratio = this.ratios[this.block.style.item_size] || 0;
      }

      if (this.globalService.isBrowser()) {
        vw = window.innerWidth;
      } else {
        vw = 320;
      }

      switch (this.breakpoint) {
        case 'xs' : height = vw * ratio; break;
        case 'sm' : height = vw * ratio; break;
        case 'lg' : height = 768 * ratio; break;
      }

      return Math.round(height);

    }

  }

}
