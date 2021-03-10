import { Component, OnDestroy, OnInit } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {CartService} from '../../../services/cart.service';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-referred',
  templateUrl: './referred.component.html',
  styleUrls: ['./referred.component.css']
})

export class ReferredComponent implements OnInit, OnDestroy {

  product;
  private ngUnsubscribe$ = new Subject();

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private cartService: CartService,
      private globalService: GlobalService
  ) {
      this.router.events.filter(event => event instanceof NavigationEnd).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
          this.product = this.route.snapshot.data.product;
      });
  }

  ngOnInit() {
      this.globalService.setTitle('You\'ve been referred');
      this.globalService.setMetaTag({ name: 'description', content: '' });
  }

  showBasket() {
    this.cartService.showCart();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
