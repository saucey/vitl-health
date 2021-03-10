import {Injectable} from '@angular/core';
import {LowerCasePipe} from '@angular/common';
import {environment} from '../../environments/environment';
import {ConfigService} from './config.service';
import {AuthService} from './auth.service';
import {GlobalService} from './global.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  scriptSrc = 'https://js.stripe.com/v3/';
  stripe: any;
  elements: any;
  paymentRequestButton: any;

  stripe$: any;

  elementsStyle = {
    base: {
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        fontStyle: 'normal',
        fontWeight: '400',
        fontFamily: 'SofiaProMedium',
        lineHeight: '60px',
        color: '#333333',
        '::placeholder': {
            color: '#ADAA9B'
        }
    }
  };

  constructor(
      private authService: AuthService,
      private configService: ConfigService,
      private lowerCasePipe: LowerCasePipe,
      private globalService: GlobalService
  ) { }

  loadStripe() {

      this.stripe$ = new Promise((resolve) => {
          const scriptElement = document.createElement('script');
          scriptElement.type = 'text/javascript';
          scriptElement.src = this.scriptSrc;
          scriptElement.onload = () => {
              const stripe = Stripe(environment.stripeKey);
              const elements = stripe.elements({
                  fonts: [{
                      cssSrc: 'https://static.vitl.com/assets/fonts/fonts.css'
                  }]
              });
              resolve({
                  stripe: stripe,
                  elements: elements
              });
          };
          document.getElementsByTagName('body')[0].appendChild(scriptElement);
      });

      return this.stripe$;

  }

  getStripe() {
      if (this.stripe$) {
          return this.stripe$;
      } else {
          return this.loadStripe();
      }
  }

  createCard() {
      return this.getStripe().then(({elements}) => {
          return elements.create('card', {
              hidePostalCode: true,
              style: this.elementsStyle
          });
      });
  }

  createToken(card) {
      return this.getStripe().then(({stripe}) => {
          return stripe.createToken(card);
      });
  }

  createPaymentRequest(amount: number) {

      return new Promise(resolve => {
          const configSub = this.configService.getConfig().subscribe(config => {
              configSub.unsubscribe();
              const options = {
                  country: config.country,
                  currency: this.lowerCasePipe.transform(config.currency),
                  total: {
                      label: 'Vitl',
                      amount: Math.round(amount * 100)
                  },
                  requestPayerName: true,
                  requestPayerEmail: true,
                  requestShipping: true
              };
              this.getStripe().then(({stripe}) => {
                  resolve(stripe.paymentRequest(options));
              });
          });

      });

  }

  updatePaymentRequest(paymentRequest: any, amount: number) {

      const configSub = this.configService.getConfig().subscribe(config => {
          configSub.unsubscribe();
          paymentRequest.update({
              currency: this.lowerCasePipe.transform(config.currency),
              total: {
                  label: 'Vitl',
                  amount: Math.round(amount * 100)
              }
          });
      });

  }

  getPaymentRequestButton(request: any) {

      return new Promise(resolve => {
          const configSub = this.configService.getConfig().subscribe(config => {
              configSub.unsubscribe();
              if (!this.paymentRequestButton) {
                  this.getStripe().then(({elements}) => {
                      this.paymentRequestButton = elements.create('paymentRequestButton', {
                          paymentRequest: request,
                          style: {
                              paymentRequestButton: {
                                  type: config.options.order.stripePaymentRequestType,
                                  theme: config.options.order.stripePaymentRequestTheme,
                                  height: '52px'
                              }
                          }
                      });
                      resolve(this.paymentRequestButton);
                  });
              } else {
                  resolve(this.paymentRequestButton);
              }
          });
      });

  }

}
