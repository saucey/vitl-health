import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {AccountService} from '../../../../services/account.service';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-cancel-subscription',
  templateUrl: './cancel-subscription.component.html',
  styles: []
})
export class CancelSubscriptionComponent implements OnInit, OnDestroy {

  @Input() data;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @ViewChild('feedbackForm') feedbackForm: NgForm;
  private ngUnsubscribe$ = new Subject();

  user;
  screen;
  selectedOffer;
  offerType = 'later';
  feedback;
  additionalFeedback;

  constructor(private accountService: AccountService, private modalService: ModalService) {
    this.accountService.getAccount().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    if (this.data.order.cancellationOffers && this.data.order.cancellationOffers.length) {
      this.screen = 'offers';
      this.data.order.cancellationOffers.reverse();
      this.selectedOffer = this.data.order.cancellationOffers[0];
    } else {
      this.screen = 'feedback';
    }
  }

  selectOffer() {
    this.screen = 'offer';
  }

  claimOffer() {
    this.accountService.claimOffer(this.data.order, this.selectedOffer, this.offerType).then((order) => {
      this.callback.emit();
    });
  }

  leaveFeedback() {
    this.screen = 'feedback';
  }

  setFeedback() {

    if (Object.values(this.feedbackForm.value).filter((element) => element).length) {
      this.feedback = this.feedbackForm.value;
      this.screen = 'cancel';
    } else {
      this.modalService.alert('Please select at least one option');
    }

  }

  cancelSubscription() {

    const feedback = Object.keys(this.feedback).filter((key) => this.feedback[key]);

    this.accountService.cancelSubscription(this.data.order, feedback, this.additionalFeedback).then((order) => {
      this.screen = 'final';
    });

  }

  closeModal() {
    this.callback.emit();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
