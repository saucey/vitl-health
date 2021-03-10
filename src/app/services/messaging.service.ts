import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import * as moment from 'moment-timezone';
import { mergeMapTo } from 'rxjs/operators';

import 'rxjs/add/operator/take';
import {ApiService} from './api.service';

import {RegisterDeviceToken} from '../queries/user';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private apiService: ApiService, private afMessaging: AngularFireMessaging) {}

  updateToken(token) {
      this.apiService.mutate(RegisterDeviceToken, { token: token, timezone: this.getTimezone() }).subscribe();
  }

  getTimezone() {
      return moment.tz.guess();
  }

  getPermission() {
      this.afMessaging.requestPermission.pipe(mergeMapTo(this.afMessaging.tokenChanges)).subscribe((token) => {
          console.log('Permission granted! Save to the server!', token);
          this.updateToken(token);
      }, (err) => { console.log('Unable to get permission to notify.', err); });
  }

}
