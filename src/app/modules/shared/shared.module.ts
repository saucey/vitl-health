import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {InputComponent} from './components/input/input.component';
import {TextComponent} from './components/text/text.component';
import {EmailComponent} from './components/email/email.component';
import {DateComponent} from './components/date/date.component';
import {DateInlineComponent} from './components/date-inline/date-inline.component';
import {PasswordComponent} from './components/password/password.component';
import {SelectComponent} from './components/select/select.component';
import {RadioComponent} from './components/radio/radio.component';
import {FormsModule} from '@angular/forms';
import {IMaskModule} from 'angular-imask';
import {MyDatePickerModule} from 'mydatepicker';
import {AppImageDirective} from './directives/app-image.directive';
import {AppImageBackgroundDirective} from './directives/app-image-background.directive';
import {ToDatePipe} from './pipes/to-date.pipe';
import {ToCountryPipe} from './pipes/to-country.pipe';
import {BypassSecurityPipe} from './pipes/bypass-security.pipe';
import {BypassSecurityUrlPipe} from './pipes/bypass-security-url';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {EncodeHtmlPipe} from './pipes/encode-html.pipe';
import {RecommendationScoreDirective} from './directives/recommendation-score.directive';
import {Nl2BrPipe, Nl2BrPipeModule} from 'nl2br-pipe';

@NgModule({
    providers: [
        DatePipe,
        CapitalizePipe
    ],
    declarations: [
        InputComponent,
        TextComponent,
        EmailComponent,
        DateComponent,
        DateInlineComponent,
        PasswordComponent,
        SelectComponent,
        RadioComponent,
        AppImageDirective,
        AppImageBackgroundDirective,
        RecommendationScoreDirective,
        ToDatePipe,
        ToCountryPipe,
        BypassSecurityPipe,
        BypassSecurityUrlPipe,
        CapitalizePipe,
        EncodeHtmlPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        IMaskModule,
        MyDatePickerModule,
        Nl2BrPipeModule
    ],
    exports: [
        FormsModule,
        InputComponent,
        TextComponent,
        EmailComponent,
        DateComponent,
        DateInlineComponent,
        PasswordComponent,
        SelectComponent,
        RadioComponent,
        AppImageDirective,
        AppImageBackgroundDirective,
        RecommendationScoreDirective,
        ToDatePipe,
        ToCountryPipe,
        BypassSecurityPipe,
        BypassSecurityUrlPipe,
        CapitalizePipe,
        EncodeHtmlPipe,
        Nl2BrPipe
    ]
})
export class SharedModule { }
