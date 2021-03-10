import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../../../../services/account.service';
import {ModalService} from '../../../../modules/modal/services/modal.service';
import {Router} from '@angular/router';
import {ProductService} from '../../../../services/product.service';
import {getCurrencySymbol} from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  templateUrl: './upgrade-subscription.component.html',
  styleUrls: ['./upgrade-subscription.component.css']
})

export class UpgradeSubscriptionComponent implements OnInit, OnDestroy {
  user;
  monthlyPrice;
  quarterlyPrice;

  private ngUnsubscribe$ = new Subject();

  constructor(
    private accountService: AccountService,
    private productService: ProductService,
    private modalService: ModalService,
    private router: Router,
  ) {
  }


  ngOnInit() {
    this.productService.getAllPlans('sn03')
      .pipe(takeUntil(this.ngUnsubscribe$)).subscribe((plans) => {
        plans.forEach((plan) => {
          if (plan.frequency == 'monthly') {
            this.monthlyPrice = getCurrencySymbol(plan.currency, 'wide') + (3 * plan.subtotal).toFixed(2);
          } else if (plan.frequency == 'quarterly') {
            this.quarterlyPrice = getCurrencySymbol(plan.currency, 'wide') + (plan.subtotal).toFixed(2);
          }
        });
      });



    this.accountService.getAccount().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((user) => {
      this.user = user;
    });
  }

  upgradePack() {
    this.modalService.confirm('Are you sure you want to upgrade your personalised subscription?').then(() => {
      this.accountService.upgradeSubscription('personalised', 'quarterly').then(() => {
        this.modalService.success('Your subscription has now been updgraded to quarterly');
        this.router.navigateByUrl('/myvitl');
      },
        (reason) => {
        throw reason;
        });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
