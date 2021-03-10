import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {KitRegisterLayoutComponent} from './pages/kit-register-layout.component';
import {KitTypeComponent} from './pages/kitType/kit-type.component';
import {KitBarcodeComponent} from './pages/kitBarcode/kit-barcode.component';
import {AccountConfirmationComponent} from './pages/account/account-confirmation.component';
import {UserDetailsComponent} from './pages/account/user-details.component';
import {AccountComponent} from './pages/account/account.component';
import {LoginComponent} from './pages/account/login.component';

import {LoggedInGuard} from './guards/logged-in.guard';
import {RegisterComponent} from './pages/account/register.component';
import {CanAccountConfirmationGuard} from './guards/can-account-confirmation.guard';

const routes: Routes = [
    {
        path: '',
        component: KitRegisterLayoutComponent,
        children: [
            {path: '', component: KitTypeComponent},
            {path: 'barcode', component: KitBarcodeComponent},
            {path: 'account', component: AccountComponent, canActivate: [LoggedInGuard]},
            {path: 'account/login', component: LoginComponent},
            {path: 'account/register', component: RegisterComponent},
            {path: 'account/confirmation', component: AccountConfirmationComponent, canActivate: [CanAccountConfirmationGuard]},
            {path: 'account/details', component: UserDetailsComponent}
        ],
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
    providers: []
})

export class KitRegistrationRoutingModule {}
