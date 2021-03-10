import { Component, OnDestroy, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import * as accountQueries from '../../../queries/account';
import {GlobalService} from '../../../services/global.service';
import {ModalService} from '../../../modules/modal/services/modal.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styles: []
})
export class FeedbackComponent implements OnInit, OnDestroy {

  feedback: string;
  submitting = false;
  private ngUnsubscribe$ = new Subject();

  constructor(
      private apiService: ApiService,
      private globalService: GlobalService
  ) { }

  ngOnInit() {
  }

  submitFeedback() {
    this.globalService.startLoading();
    return this.apiService.mutate(accountQueries.SendFeedback, { source: 'website', feedback: this.feedback }).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      this.globalService.stopLoading();
      this.submitting = true;
      this.feedback = null;
    }, () => {
        this.submitting = false;
        this.globalService.stopLoading();
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
