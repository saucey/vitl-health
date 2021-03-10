import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SigninComponent} from './pages/signin/signin.component';
import {AccountComponent} from './pages/signin/account.component';
import {GuestComponent} from './pages/signin/guest.component';
import {DeliveryComponent} from './pages/delivery/delivery.component';
import {SearchComponent} from './pages/delivery/search.component';
import {ManualComponent} from './pages/delivery/manual.component';
import {PaymentComponent} from './pages/payment/payment.component';
import {ReviewComponent} from './pages/review/review.component';
import {SelectComponent as DeliverySelectComponent} from './pages/delivery/select.component';
import {SelectComponent as PaymentSelectComponent} from './pages/payment/select.component';
import {AddComponent} from './pages/payment/add.component';
import {CheckoutLayoutComponent} from './pages/checkout-layout.component';
import {CanCheckoutGuard} from './guards/can-checkout.guard';

const routes: Routes = [

    { path: 'checkout', component: CheckoutLayoutComponent, canActivate: [ CanCheckoutGuard ], children: [
        { path: '', component: SigninComponent, children: [
                { path: '', component: AccountComponent },
                { path: 'guest', component: GuestComponent }
            ] },
        { path: 'delivery', component: DeliveryComponent, children: [
                { path: '', component: SearchComponent },
                { path: 'select', component: DeliverySelectComponent },
                { path: 'manual', component: ManualComponent }
            ] },
        { path: 'payment', component: PaymentComponent, children: [
                { path: '', component: AddComponent },
                { path: 'select', component: PaymentSelectComponent }
            ] },
        { path: 'review', component: ReviewComponent }
    ]}

    // {
    //     path: 'checkout',
    //     component: LayoutComponent,
    //     canActivate: [ CanCheckoutGuard ],
    //     resolve: {
    //         checkoutConfig: CheckoutResolver
    //     },
    //     data: { headerStyle: 'partial', hideFooter: true, noindex: true },
    //     children: [
    //         { path: '', component: SigninComponent }
    //     ]
    // },
];

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forChild(routes) ],
    providers: []
})
export class CheckoutRoutingModule {}
