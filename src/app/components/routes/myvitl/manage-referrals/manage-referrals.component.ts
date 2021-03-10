import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AccountService} from '../../../../services/account.service';
import {GlobalService} from '../../../../services/global.service';
import {ModalService} from '../../../../modules/modal/services/modal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-manage-referrals',
  templateUrl: './manage-referrals.component.html',
  styleUrls: ['./manage-referrals.component.css']
})
export class ManageReferralsComponent implements OnInit, OnDestroy {

  @ViewChild('referralForm') referralForm: NgForm;

  user;
  currencySymbol = '';
  private ngUnsubscribe$ = new Subject();

  constructor(
      private accountService: AccountService,
      private globalService: GlobalService,
      private modalService: ModalService
  ) {
      this.accountService.getAccount().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((user) => {
          this.user = user;
      });
      this.globalService.initCall()
          .map(({data}) => data.config)
          .map(config => config.currencies.find(currency => currency.code === config.currency))
          .pipe(takeUntil(this.ngUnsubscribe$)).subscribe(currency => this.currencySymbol = currency.symbol);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  getCurrencyCode() {

  }

  referFriend() {
    const emails = this.referralForm.value.email.split(',').map((email) => {
      return email.trim();
    });
    this.accountService.referFriend(emails).then(() => {
      this.referralForm.resetForm();
      this.modalService.success('Your friends have been referred!');
    });
  }

}
