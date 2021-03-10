import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from './api.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import * as userQueries from '../queries/user';

import {GlobalService} from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginRedirect = '/myvitl';

  constructor(
      private apiService: ApiService,
      private router: Router,
      private globalService: GlobalService
  ) {
      this.getUser().subscribe((user) => {
        if (user && user.type === 'user') {
          this.globalService.emitTrackingEvent('userSet', user);
        }
      });
  }

  getPostLoginRedirect() {
      return this.loginRedirect;
  }

  setPostLoginRedirect(url) {
      this.loginRedirect = url;
  }

  getUser() {
      return this.globalService.initCall().map(({data}) => data.user);
  }

  loadUser() {
      return this.apiService.query(userQueries.GetUser).map(({data}) => data.user);
  }

  checkEmail(email: string) {
      return this.apiService.query(userQueries.CheckEmail, { email: email }).toPromise();
  }

  modifyUser(query, property, params) {

    return this.apiService.mutate(query, params, (store, { data }) => {
        this.globalService.updateInitCall(store, 'user', data[property]);
    }).toPromise();

  }

  login(email: string, password: string) {

      return new Promise((resolve, reject) => {
          this.modifyUser(userQueries.LoginUser, 'user_loginUser', {
              email: email,
              password: password,
              leadAttribution: this.globalService.getUtmParams()
          }).then(
              () => {
                  this.globalService.refetchInit().then(() => resolve());
              },
              (reason) => {
                  reject();
              }
          );
      });

  }

  forgot(email: string) {

      return this.apiService.mutate(userQueries.ForgotPassword, { email: email }).toPromise();

  }

  reset(userId: string, token: string, password: string) {

      return new Promise((resolve, reject) => {
          this.modifyUser(userQueries.ResetPassword, 'user_resetPassword', {
              userId: userId,
              token: token,
              password: password
          }).then(
              () => {
                  this.globalService.refetchInit().then(() => resolve());
              },
              (reason) => {
                  reject();
              }
          );
      });

  }

  magicLogin(id: any, token: string) {

      return new Promise((resolve, reject) => {
         this.modifyUser(userQueries.MagicLogin, 'user_exchangeLoginToken', {
             id: id,
             token: token
         }).then(
             () => {
                 this.globalService.refetchInit().then(() => resolve());
             },
             (reason) => {
                 reject();
             }
         );
      });

  }

  complete(userId: string, token: string, password: string) {

      return new Promise((resolve, reject) => {
          this.modifyUser(userQueries.CompleteAccountSetup, 'user_completeAccountSetup', {
              userId: userId,
              token: token,
              password: password
          }).then(
              () => {
                  this.globalService.refetchInit().then(() => resolve());
              },
              (reason) => {
                  reject();
              }
          );
      });

  }

  register(firstName: string, email: string, password: string, signupPage: string) {

        return new Promise((resolve, reject) => {
            this.modifyUser(userQueries.CreateUser, 'user_createUser', {
                firstName: firstName,
                email: email,
                password: password,
                signupPage: signupPage,
                leadAttribution: this.globalService.getUtmParams()
            }).then(
                ({data}) => {
                    this.globalService.emitTrackingEvent('userRegistered', data.user_createUser);
                    this.globalService.refetchInit().then(() => resolve());
                },
                (reason) => {
                    reject();
                }
            );
        });

  }

  registerLead(signupPage: string) {

      return new Promise((resolve, reject) => {
          this.modifyUser(userQueries.RegisterLead, 'user_createLead', {
              signupPage: signupPage,
              leadAttribution: this.globalService.getUtmParams()
          }).then(
              ({data}) => {
                  this.globalService.refetchInit().then(() => resolve());
              },
              (reason) => {
                  reject();
              }
          );
      });

  }

  promoteLead(email: string, firstName: string) {

      return this.modifyUser(userQueries.PromoteLead, 'user_promoteLead', {
          email: email,
          firstName: firstName,
          leadAttribution: this.globalService.getUtmParams()
      });

  }

  acceptRequest(request: string) {

      return this.apiService.mutate(userQueries.AcceptRequest, {
          request: request
      }).map(({data}) => data.user_acceptRequest).toPromise().then(
          (result) => {
              if (result) {
                  return result;
              } else {
                  throw result;
              }
          },
          (reason) => { throw reason; }
      );

  }

  logout(redirect = true) {

      this.globalService.startLoading();
      return this.apiService.mutate(userQueries.LogoutUser, {}, (store, { data }) => {
          this.globalService.updateInitCall(store, 'user', null);
          this.globalService.updateInitCall(store, 'cart', null);
          this.globalService.emitEvent('logout');
      }).toPromise().then(() => {
          this.apiService.clearToken();
          const refetch = this.globalService.refetchInit();
          if (redirect) {
              this.router.navigateByUrl('/');
          } else {
              refetch.then(() => {
                  this.globalService.stopLoading();
              });
          }
      }, () => this.globalService.stopLoading());

  }

}
