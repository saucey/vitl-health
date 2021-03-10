import {Input, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ContentModule} from '../content/content.module';
import { LottieAnimationViewModule } from 'ng-lottie';

import {ModalComponent} from './components/modal.component';
import {AlertComponent} from './components/alert/alert.component';
import {DnaModalComponent} from './components/dnaModal/dna-modal.component';
import {BloodModalComponent} from './components/bloodModal/blood-modal.component';
import {InputComponent} from './components/input/input.component';
import {BasketComponent} from './components/basket/basket.component';
import {AddressFinderComponent} from './components/address-finder/address-finder.component';
import {AddressConfirmComponent} from './components/address-confirm/address-confirm.component';
import {CurrencySelectorComponent} from './components/currency-selector/currency-selector.component';
import {ContentComponent} from './components/content/content.component';
import { PauseSubscriptionComponent } from './components/pause-subscription/pause-subscription.component';
import { CancelSubscriptionComponent } from './components/cancel-subscription/cancel-subscription.component';
import { AddressManualComponent } from './components/address-manual/address-manual.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { InlinePageComponent } from './components/inline-page/inline-page.component';
import { GoalAnnouncementComponent } from './components/goal-announcement/goal-announcement.component';
import { ManageGoalsComponent } from './components/manage-goals/manage-goals.component';
import { EssentialOneGoalComponent } from './components/essential-one-goal/essential-one-goal.component';
import { GummyTestComponent } from './components/gummy-test/gummy-test.component';
import {NutritionalInfoModalComponent} from './components/nutritionalInfoModal/nutritional-info-modal';
import {UpsellComponent} from './components/upsell/upsell.component';
import {UpgradeConsultationComponent} from './components/upgrade-consultation/upgrade-consultation.component';
import {PillDetailsComponent} from './components/pill-details/pill-details.component';

@NgModule({
  providers: [
    { provide: 'AlertComponent', useValue: AlertComponent },
    { provide: 'DnaModalComponent', useValue: DnaModalComponent },
    { provide: 'BloodModalComponent', useValue: BloodModalComponent },
    { provide: 'NutritionalInfoComponent', useValue: NutritionalInfoModalComponent },
    { provide: 'ModalInputComponent', useValue: InputComponent },
    { provide: 'BasketComponent', useValue: BasketComponent },
    { provide: 'AddressFinderComponent', useValue: AddressFinderComponent },
    { provide: 'AddressConfirmComponent', useValue: AddressConfirmComponent },
    { provide: 'AddressManualComponent', useValue: AddressManualComponent },
    { provide: 'CurrencySelectorComponent', useValue: CurrencySelectorComponent },
    { provide: 'ContentComponent', useValue: ContentComponent },
    { provide: 'PauseSubscriptionComponent', useValue: PauseSubscriptionComponent },
    { provide: 'CancelSubscriptionComponent', useValue: CancelSubscriptionComponent },
    { provide: 'PaymentMethodComponent', useValue: PaymentMethodComponent },
    { provide: 'InlinePageComponent', useValue: InlinePageComponent },
    { provide: 'GoalAnnouncementComponent', useValue: GoalAnnouncementComponent },
    { provide: 'ManageGoalsComponent', useValue: ManageGoalsComponent },
    { provide: 'EssentialOneGoalComponent', useValue: EssentialOneGoalComponent },
    { provide: 'GummyTestComponent', useValue: GummyTestComponent },
    { provide: 'UpsellComponent', useValue: UpsellComponent },
    { provide: 'UpgradeConsultationComponent', useValue: UpgradeConsultationComponent },
    { provide: 'PillDetailsComponent', useValue: PillDetailsComponent }
  ],
  declarations: [
    ModalComponent,
    AlertComponent,
    InputComponent,
    BasketComponent,
    AddressFinderComponent,
    AddressConfirmComponent,
    AddressManualComponent,
    CurrencySelectorComponent,
    ContentComponent,
    PauseSubscriptionComponent,
    CancelSubscriptionComponent,
    PaymentMethodComponent,
    InlinePageComponent,
    GoalAnnouncementComponent,
    ManageGoalsComponent,
    EssentialOneGoalComponent,
    DnaModalComponent,
    BloodModalComponent,
    NutritionalInfoModalComponent,
    GummyTestComponent,
    UpsellComponent,
    UpgradeConsultationComponent,
    PillDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContentModule,
    LottieAnimationViewModule
  ],
  entryComponents: [
    ModalComponent,
    AlertComponent,
    InputComponent,
    BasketComponent,
    AddressFinderComponent,
    AddressConfirmComponent,
    AddressManualComponent,
    CurrencySelectorComponent,
    ContentComponent,
    PauseSubscriptionComponent,
    CancelSubscriptionComponent,
    PaymentMethodComponent,
    InlinePageComponent,
    GoalAnnouncementComponent,
    ManageGoalsComponent,
    EssentialOneGoalComponent,
    DnaModalComponent,
    BloodModalComponent,
    NutritionalInfoModalComponent,
    GummyTestComponent,
    UpsellComponent,
    UpgradeConsultationComponent,
    PillDetailsComponent
  ]
})
export class ModalModule { }
