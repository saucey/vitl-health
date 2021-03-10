import { Injectable } from '@angular/core';
import * as userQueries from '../queries/user';
import {ApiService} from './api.service';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import * as accountQueries from '../queries/account';
import {GlobalService} from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  user;

  constructor(private apiService: ApiService, private globalService: GlobalService) {
      this.user = this.apiService.watchQuery(userQueries.GetAccount, {});
  }

  getAccount() {
      return this.user.valueChanges.map(({data}) => data.user);
  }

  loadAccount() {
      return this.apiService.query(userQueries.GetAccount).map(({data}) => data.user);
  }

  getOrder(id) {
      return this.apiService.query(accountQueries.GetOrder, { id: id }).map(({data}) => data.user.order);
  }

  pauseSubscription(order, date) {

      const utc = moment(date, 'X').format();
      this.globalService.startLoading();
      return this.apiService.mutate(accountQueries.PauseSubscription, { id: order.id, restartDate: utc }).map(({data}) => data.account_pauseSubscription)
          .toPromise()
          .then(() => {
              this.globalService.stopLoading();
              this.user.refetch();
          }, (reason) => {
              this.globalService.stopLoading();
              throw reason;
          });

  }

  restartSubscription(order) {

      this.globalService.startLoading();
      return this.apiService.mutate(accountQueries.RestartSubscription, { id: order.id }).map(({data}) => data.account_reactivateSubscription)
          .toPromise()
          .then(() => {
              this.globalService.stopLoading();
              this.user.refetch();
          }, (reason) => {
              this.globalService.stopLoading();
              throw reason;
          });
  }

  upgradeSubscription(context: string, frequency: string) {
    this.globalService.startLoading();
    return this.apiService.mutate(accountQueries.ChangeSubscriptionFrequency, { context: context, frequency: frequency }).map(({data}) => data.account_changeSubscriptionFrequency)
      .toPromise()
      .then(() => {
        this.globalService.stopLoading();
        this.user.refetch();
      },
        (reason) => {
          this.globalService.stopLoading();
          throw reason;
        })

  }

  claimOffer(order, offer, mode) {

      this.globalService.startLoading();
      return this.apiService.mutate(accountQueries.ClaimOffer, { id: order.id, offerId: offer.id, offerMode: mode }).map(({data}) => data.account_claimOffer)
          .toPromise()
          .then(() => {
              this.globalService.stopLoading();
              this.user.refetch();
          }, (reason) => {
              this.globalService.stopLoading();
              throw reason;
          });

  }

  cancelSubscription(order, feedback: Array<string>, additionalFeedback: string) {

      this.globalService.startLoading();
      return this.apiService.mutate(accountQueries.CancelSubscription, { id: order.id, feedback: feedback, additionalFeedback: additionalFeedback }).map(({data}) => data.account_cancelSubscription)
          .toPromise()
          .then(() => {
              this.globalService.stopLoading();
              this.user.refetch();
          }, (reason) => {
              this.globalService.stopLoading();
              throw reason;
          });

  }

  updateDeliveryAddress(order, deliveryAddress) {

      this.globalService.startLoading();
      return this.apiService.mutate(accountQueries.AddDeliveryAddress, { orderId: order.id, address: deliveryAddress }).map(({data}) => data.account_addDeliveryAddress)
          .toPromise()
          .then(() => {
              this.globalService.stopLoading();
              this.user.refetch();
          }, (reason) => {
              this.globalService.stopLoading();
              throw reason;
          });

  }

  updatePersonalDetails(details) {

      this.globalService.startLoading();
      return this.apiService.mutate(accountQueries.UpdateUser, { data: details }).map(({data}) => data.user_updateUser)
          .toPromise()
          .then(() => {
              this.globalService.stopLoading();
              this.user.refetch();
          }, (reason) => {
              this.globalService.stopLoading();
              throw reason;
          });

  }

  updateCommunicationPreferences(preferences) {

    this.globalService.startLoading();
    return this.apiService.mutate(accountQueries.UpdateCommunicationPreferences, { preferences: preferences }).map(({data}) => data.user_updateCommunicationPreferences)
        .toPromise()
        .then(() => {
            this.globalService.stopLoading();
            this.user.refetch();
        }, (reason) => {
            this.globalService.stopLoading();
            throw reason;
        });

  }

    referFriend(emails) {

          this.globalService.startLoading();
          return this.apiService.mutate(accountQueries.ReferFriend, { emails: emails }).map(({data}) => data.user_referFriend)
              .toPromise()
              .then(() => {
                  this.globalService.stopLoading();
                  this.user.refetch();
              }, (reason) => {
                  this.globalService.stopLoading();
                  throw reason;
              });

    }

    addPaymentMethod(paymentMethod, setDefault) {

        this.globalService.startLoading();
        return this.apiService.mutate(accountQueries.AddPaymentMethod, { paymentMethod: paymentMethod, setDefault: setDefault }).map(({data}) => data.user_addPaymentMethod)
            .toPromise()
            .then(() => {
                this.globalService.stopLoading();
                this.user.refetch();
            }, (reason) => {
                this.globalService.stopLoading();
                throw reason;
            });

    }

    updatePaymentMethod(id, postcode, setDefault) {

        this.globalService.startLoading();
        return this.apiService.mutate(accountQueries.UpdatePaymentMethod, { id: id, postcode: postcode, setDefault: setDefault }).map(({data}) => data.user_updatePaymentMethod)
            .toPromise()
            .then(() => {
                this.globalService.stopLoading();
                this.user.refetch();
            }, (reason) => {
                this.globalService.stopLoading();
                throw reason;
            });

    }

    deletePaymentMethod(id) {

        this.globalService.startLoading();
        return this.apiService.mutate(accountQueries.DeletePaymentMethod, { id: id }).map(({data}) => data.user_deletePaymentMethod)
            .toPromise()
            .then(() => {
                this.globalService.stopLoading();
                this.user.refetch();
            }, (reason) => {
                this.globalService.stopLoading();
                throw reason;
            });

    }

}
