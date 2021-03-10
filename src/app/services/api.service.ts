import { Injectable, EventEmitter, Inject, PLATFORM_ID, Injector } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpLink } from 'apollo-angular-link-http';
import { Apollo} from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../../environments/environment';
import { onError } from 'apollo-link-error';
import ApolloLinkTimeout from 'apollo-link-timeout';
import { HttpHeaders } from '@angular/common/http';
import { ApolloLink, from, FetchResult } from 'apollo-link';
import {CookieService} from './cookie.service';
import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import {ModalService} from '../modules/modal/services/modal.service';

const STATE_KEY = makeStateKey<any>('apollo.state');

@Injectable()
export class ApiService {

  public events: EventEmitter<any> = new EventEmitter();
  public cache: InMemoryCache;

  constructor(
      private apollo: Apollo,
      private httpLink: HttpLink,
      private modalService: ModalService,
      private router: Router,
      private readonly transferState: TransferState,
      private cookieService: CookieService,
      private injector: Injector,
      @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.cache = new InMemoryCache();

      if (isPlatformBrowser(this.platformId)) {
          const state = this.transferState.get<any>(STATE_KEY, null);
          this.cache.restore(state);
      } else {
          this.transferState.onSerialize(STATE_KEY, () => {
            return this.cache.extract();
          });
      }

      const error = onError(({ graphQLErrors, networkError }) => {

          if (networkError && networkError.message === 'Timeout exceeded') {
              this.modalService.alert('Sorry something went wrong, please try again');
          } else {
              if (graphQLErrors) {
                  graphQLErrors.map((data: any) => {
                      // @TODO: Redo this in a less hacky way
                      if (data.message && data.message !== 'You must be logged in to redeem a personalised coupon') {
                          this.modalService.alert(data.message);
                      }
                  });
              } else if (networkError) {
                  if (networkError['status'] === 409) {
                      this.clearToken();
                      this.router.navigateByUrl('/login');
                  } else {
                      this.modalService.alert(networkError.message);
                  }
              } else {
                  this.modalService.alert(networkError.message);
              }
          }
      });

      const auth = new ApolloLink((operation, forward) => {

          let headers = new HttpHeaders();

          if (this.hasToken()) {
              headers = headers.set('Authorization', this.getToken());
          }

          if (this.hasCurrency()) {
              headers = headers.set('currency', this.getCurrency());
          }

          if (isPlatformBrowser(platformId) === false) {
              headers = headers.set('client-ip', injector.get(REQUEST).headers['x-forwarded-for']);
          }

          headers = headers.set('source', 'website');

          operation.setContext({
              headers: headers
          });

          return forward(operation);

      });

      const after = new ApolloLink((operation, forward) => {
          return forward(operation).map(response => {
              const context = operation.getContext();
              const { response: { headers } } = context;
              if (headers) {
                  this.setCurrency(headers.get('currency'));
                  const token = headers.get('Authorization');
                  if (token) {
                      this.setToken(token);
                  }
              }
              return response;
          });
      });

      const http = httpLink.create({
          uri: environment.api_endpoint,
          // batchInterval: 20
      });

      const timeout = new ApolloLinkTimeout(120000);

      this.apollo.create({
          link: from([ error, timeout, auth, after, http ]),
          cache: this.cache,
          defaultOptions: {
              watchQuery: {
                  errorPolicy: 'all'
              }
          }
      });

  }

  getToken() {

      return this.cookieService.getCookie('token');

  }

  getCurrency() {

      return this.cookieService.getCookie('currency');

  }

  hasToken() {

      return (this.getToken() ? true : false);

  }

  hasCurrency() {

      return (this.getCurrency() ? true : false);

  }

  setToken(token: string) {

      const old_token = this.getToken();

      this.cookieService.setCookie('token', token);

      if (token !== old_token) {
        this.events.emit({ type: 'tokenChanged' });
      }

  }

  setCurrency(currency: string) {

      const old_currency = this.getCurrency();

      this.cookieService.setCookie('currency', currency);

      if (currency !== old_currency) {
          this.events.emit({ type: 'currencyChanged' });
      }

  }

  clearToken() {
      this.cookieService.clearCookie('token');
  }

  watchQuery(query, variables, cache = false) {

      return this.apollo.watchQuery<any>({
          query: query,
          variables: variables,
          fetchPolicy: (cache ? 'cache-first' : 'network-only')
      });

  }

  query(query, variables = {}, cache = false, update = null) {

    return this.apollo.query<any>({
        query: query,
        variables: variables,
        fetchPolicy: (cache ? 'cache-first' : 'network-only')
    });

  }

  mutate(mutation, variables = {}, update = null) {

      return this.apollo.mutate({
          mutation: mutation,
          variables: variables,
          update: update
      });

  }

}
