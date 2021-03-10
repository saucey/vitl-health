import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SigninComponent} from './pages/signin/signin.component';
import {CheckoutLayoutComponent} from './pages/checkout-layout.component';
import {CheckoutRoutingModule} from './checkout-routing.module';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {GuestComponent} from './pages/signin/guest.component';
import {AccountComponent} from './pages/signin/account.component';
import {DeliveryComponent} from './pages/delivery/delivery.component';
import {SearchComponent} from './pages/delivery/search.component';
import {ManualComponent} from './pages/delivery/manual.component';
import {PaymentComponent} from './pages/payment/payment.component';
import {ReviewComponent} from './pages/review/review.component';
import {ProgressDirective} from './directives/progress.directive';
import {SelectComponent as DeliverySelectComponent} from './pages/delivery/select.component';
import {SelectComponent as PaymentSelectComponent} from './pages/payment/select.component';
import {AddComponent} from './pages/payment/add.component';

@NgModule({
  declarations: [
    ProgressDirective,
    CheckoutLayoutComponent,
    SigninComponent,
    AccountComponent,
    GuestComponent,
    DeliveryComponent,
    SearchComponent,
    DeliverySelectComponent,
    ManualComponent,
    PaymentComponent,
    AddComponent,
    PaymentSelectComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
