import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {ApiService} from '../../../services/api.service';
import * as accountQueries from '../../../queries/account';
import {ModalService} from '../../../modules/modal/services/modal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-general-feedback',
  templateUrl: './general-feedback.component.html',
  styles: []
})
export class GeneralFeedbackComponent implements OnInit, OnDestroy {

  feedback: string;
  feedback_id: number;
  submitting = false;
  private ngUnsubscribe$ = new Subject();

  constructor(
      private apiService: ApiService,
      private globalService: GlobalService,
      private modalService: ModalService,
      private route: ActivatedRoute
  ) {

  }

  ngOnInit() {

      this.globalService.setTitle('Feedback');
      this.globalService.setMetaTag({ name: 'description', content: '' });

      if (this.globalService.isBrowser()) {
          this.globalService.startLoading();
          this.apiService.mutate(accountQueries.SendFeedback, {
              source: this.route.snapshot.params.type,
              email: this.route.snapshot.queryParamMap.get('email'),
              option: this.route.snapshot.params.option
          }).map(({data}) => data.user_sendFeedback).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((id) => {
              this.feedback_id = id;
              this.globalService.stopLoading();
          }, () => this.globalService.stopLoading());
      }

  }

  submitFeedback() {

      this.submitting = true;
      this.globalService.startLoading();
      this.apiService.mutate(accountQueries.UpdateFeedback, {
          id: this.feedback_id,
          source: this.route.snapshot.params.type,
          email: this.route.snapshot.queryParamMap.get('email'),
          option: this.route.snapshot.params.option,
          feedback: this.feedback
      }).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
          this.globalService.stopLoading();
          this.modalService.success('Thank you, your feedback has been submitted');
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
