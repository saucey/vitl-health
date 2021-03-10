import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {Router} from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-world-health-day',
  templateUrl: './world-health-day.component.html',
  styles: []
})
export class WorldHealthDayComponent implements OnInit, OnDestroy {

  private ngUnsubscribe$ = new Subject();

  goals = [
    {
      name: 'Quit sugar',
      src: 'https://static-prod.vitl.com/new/images/source/1531240692-reduce-sugar@1x.png?width=30'
    },
    {
      name: 'Digestion',
      src: 'https://static-prod.vitl.com/new/images/source/1531240731-digestion@1x.png?width=30'
    },
    {
      name: 'Detox',
      src: 'https://static-prod.vitl.com/new/images/source/1531240649-detox@1x.png?width=30'
    },
    {
      name: 'Sleep',
      src: 'https://static-prod.vitl.com/new/images/source/1531240702-sleep@1x.png?width=30'
    },
    {
      name: 'Fitness',
      src: 'https://static-prod.vitl.com/new/images/source/1531240591-athlete-performance@1x.png?width=30'
    },



    {
      name: 'Allergy control',
      src: 'https://static-prod.vitl.com/new/images/source/1531240609-food-intolerance@1x.png?width=30'
    },
    {
      name: 'Reduce stress',
      src: 'https://static-prod.vitl.com/new/images/source/1531240739-reduce-stress@1x.png?width=30'
    },
    {
      name: 'Skin',
      src: 'https://static-prod.vitl.com/new/images/source/1531240722-skin@1x.png?width=30'
    },
    {
      name: 'Immunity',
      src: 'https://static-prod.vitl.com/new/images/source/1531240711-immunity@1x.png?width=30'
    },
    {
      name: 'Weight',
      src: 'https://static-prod.vitl.com/new/images/source/1531240775-weight-loss@1x.png?width=30'
    },





    {
      name: 'Hair',
      src: 'https://static-prod.vitl.com/new/images/source/1531240660-hair-loss@1x.png?width=30'
    },
    {
      name: 'Energy',
      src: 'https://static-prod.vitl.com/new/images/source/1531240762-energy@1x.png?width=30'
    },
    {
      name: 'Fertility',
      src: 'https://static-prod.vitl.com/new/images/source/1531240682-fetility@1x.png?width=30'
    },
    {
      name: 'Pregnancy',
      src: 'https://static-prod.vitl.com/new/images/source/1531240637-pregnancy1@1x.png?width=30'
    },
    {
      name: 'Post-natal',
      src: 'https://static-prod.vitl.com/new/images/source/1531240622-post-natal@1x.png?width=30'
    },
  ];

  constructor(
      private globalService: GlobalService,
      private router: Router
  ) {}

  ngOnInit() {
    this.globalService.emitEvent('setHeaderCtaLabel', {label: 'Get started'} );
    this.globalService.events.filter(event => event.type === 'headerCta').pipe(takeUntil(this.ngUnsubscribe$)).subscribe((event) => {
      this.router.navigateByUrl('/consultation');
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
