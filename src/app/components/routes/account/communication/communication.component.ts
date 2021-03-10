import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../../../../services/account.service';
import {SegmentService} from '../../../../services/segment.service';
import {GlobalService} from '../../../../services/global.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styles: []
})
export class CommunicationComponent implements OnInit, OnDestroy {

  preferences;
  canUpdate = false;
  private ngUnsubscribe$ = new Subject();

  constructor(
    private accountService: AccountService,
    private globalService: GlobalService
  ) {
    this.accountService.getAccount().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((user) => {
      this.preferences = user.communicationPreferences.map((preference) => {
        return {
          id: preference.id,
          title: preference.title,
          subscribed: preference.subscribed,
          allowUnsubscribe: preference.allowUnsubscribe
        };
      });
    });
  }

  ngOnInit() {
  }

  savePreferences() {
    this.accountService.updateCommunicationPreferences(this.preferences.map((preference) => {
      return {
        id: preference.id,
        subscribed: preference.subscribed
      };
    })).then(() =>  {
      this.globalService.emitTrackingEvent('communicationPreferencesUpdated', {
        preferences: this.preferences.map((preference) => {
          return {
            title: preference.title,
            subscribed: preference.subscribed
          };
        })
      });

      this.canUpdate = false;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
