import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {AccountService} from '../../../../services/account.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit, OnDestroy {

  user;
  orders;
  selectedOrderId;
  lg = false;
  order;

  private ngUnsubscribe$ = new Subject();

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private accountService: AccountService,
      private breakPointObserver: BreakpointObserver
  ) {

      this.breakPointObserver.observe(['(min-width: 768px)']).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((state: BreakpointState) => this.lg = state.matches);

      this.accountService.getAccount().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((user) => {
        this.user = user;
        this.orders = user.orders;
        if (this.route.snapshot.params.id) {
            this.order = this.orders.find((order) => order.id === this.route.snapshot.params.id);
        }
      });

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  selectOrder(order) {
    if (order.allowManage) {
      if (this.lg) {
          this.selectedOrderId = order.id;
      } else {
          this.router.navigate([ '/myvitl/account/orders/', order.id ]);
      }
    }
  }

}
