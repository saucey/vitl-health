import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import { LottieAnimationViewModule } from 'ng-lottie';


import {KitRegisterLayoutComponent} from './pages/kit-register-layout.component';
import {KitTypeComponent} from './pages/kitType/kit-type.component';
import {KitBarcodeComponent} from './pages/kitBarcode/kit-barcode.component';
import {KitRegistrationRoutingModule} from './kit-registration-routing.module';
import {AccountConfirmationComponent} from './pages/account/account-confirmation.component';
import {UserDetailsComponent} from './pages/account/user-details.component';
import {AccountComponent} from './pages/account/account.component';
import {LoginComponent} from './pages/account/login.component';
import {KitRegisterConfirmationComponent} from './pages/kitRegisteredConfirmation/kit-register-confirmation.component';
import {RegisterComponent} from './pages/account/register.component';
import {AccountResolver} from '../../resolvers/account.resolver';

@NgModule({
    declarations: [
        KitRegisterLayoutComponent,
        KitTypeComponent,
        KitBarcodeComponent,
        AccountConfirmationComponent,
        UserDetailsComponent,
        AccountComponent,
        LoginComponent,
        RegisterComponent,
        KitRegisterConfirmationComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        KitRegistrationRoutingModule,
        SharedModule,
        LottieAnimationViewModule,
    ],

    providers: [
        AccountResolver
    ]
})


export class KitRegistrationModule {}
