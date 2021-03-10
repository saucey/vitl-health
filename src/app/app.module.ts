import { BrowserModule, Title, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { HttpBatchLinkModule } from 'apollo-angular-link-http-batch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LottieAnimationViewModule } from 'ng-lottie';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

import { Angulartics2Module } from 'angulartics2';

import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { CookieService as BrowserCookieService } from 'ngx-cookie-service';

export const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    scrollbar: false,
    pagination: {
        el: '.carousel2__dots-wrap',
        type: 'bullets',
        bulletClass: 'carousel2__dot',
        bulletActiveClass: 'is-active',
        clickable: true
    },
    breakpoints: {
       768: {
           slidesPerView: 1
       }
    }
};

declare global {
  interface Window { analytics: any; }
}

import { AppRoutingModule } from './app-routing.module';

import {PageResolver} from './resolvers/page.resolver';
import {ProductCategoriesResolver} from './resolvers/product-categories.resolver';
import {ProductCategoryResolver} from './resolvers/product-category.resolver';
import {NewProductCategoryResolver} from './resolvers/new-product-category.resolver';
import {ProductResolver} from './resolvers/product.resolver';
import {HealthGoalResolver} from './resolvers/health-goal.resolver';
import {BlogCategoryResolver} from './resolvers/blog-category.resolver';
import {BlogArticleResolver} from './resolvers/blog-article.resolver';
import {UserResolver} from './resolvers/user.resolver';
import {CartResolver} from './resolvers/cart.resolver';
import {CheckoutResolver} from './resolvers/checkout.resolver';
import {ConfirmationResolver} from './resolvers/confirmation.resolver';
import {ResultResolver} from './resolvers/result.resolver';
import {ComparePersonalisedProductsResolver} from './resolvers/compare-personalised-products.resolver';
import {CompareDnaTestsResolver} from './resolvers/compare-dna-tests.resolver';
import {FaqResolver} from './resolvers/faq.resolver';
import {GoalResolver} from './resolvers/goal.resolver';
import {DashboardResolver} from './resolvers/dashboard.resolver';

import {PageService} from './services/page.service';
import {NavigationService} from './services/navigation.service';
import {ProductService} from './services/product.service';
import {GlobalService} from './services/global.service';
import {BlogService} from './services/blog.service';
import {StripeService} from './services/stripe.service';
import {LanaService} from './services/lana.service';
import {CookieService} from './services/cookie.service';
import {SegmentService} from './services/segment.service';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/routes/home/home.component';
import { ConsultationComponent } from './components/routes/consultation/consultation.component';
import { ContactComponent } from './components/routes/contact/contact.component';
import { PageComponent } from './components/routes/page/page.component';
import { ProductsComponent } from './components/routes/products/products.component';
import { ProductCategoryComponent } from './components/routes/product-category/product-category.component';
import { NewProductCategoryComponent } from './components/routes/new-product-category/new-product-category.component';
import { ProductComponent } from './components/routes/product/product.component';
import { HealthGoalComponent } from './components/routes/health-goal/health-goal.component';
import { ConfirmationComponent } from './components/routes/confirmation/confirmation.component';
import { BlogComponent } from './components/routes/blog/blog.component';
import { BlogCategoryComponent } from './components/routes/blog-category/blog-category.component';
import { BlogArticleComponent } from './components/routes/blog-article/blog-article.component';
import { KitComponent } from './components/routes/kit/kit.component';
import { ReferralComponent } from './components/routes/referral/referral.component';
import { ReferredComponent } from './components/routes/referred/referred.component';
import { EmailComponent } from './components/routes/email/email.component';
import { EmailUnsubscribeComponent } from './components/routes/email-unsubscribe/email-unsubscribe.component';
import { NotFoundComponent } from './components/routes/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ApiService } from './services/api.service';
import { LoginComponent } from './components/routes/login/login.component';

import { PlanSelectorComponent } from './components/plan-selector/plan-selector.component';
import { ButtonLoaderDirective } from './directives/button-loader.directive';
import { ConsultationContainerDirective } from './directives/consultation-container';
import { MyvitlComponent } from './components/routes/myvitl/myvitl.component';
import { ConsultationResultComponent } from './components/routes/consultation-result/consultation-result.component';
import { AboutComponent } from './components/routes/about/about.component';
import { QualityComponent } from './components/routes/quality/quality.component';
import { ScienceComponent } from './components/routes/science/science.component';
import { MyvitlContentComponent } from './components/routes/myvitl-content/myvitl-content.component';
import { OrdersComponent } from './components/routes/account/orders/orders.component';
import { DetailsComponent } from './components/routes/account/details/details.component';
import { DashboardComponent } from './components/routes/myvitl/dashboard/dashboard.component';
import { ResultComponent } from './components/routes/myvitl/result/result.component';
import { PersonalisedProductsComponent } from './components/routes/myvitl/personalised-products/personalised-products.component';
import { ComparePersonalisedProductsComponent } from './components/routes/myvitl/compare-personalised-products/compare-personalised-products.component';
import { GoalsComponent } from './components/routes/myvitl/goals/goals.component';
import { GoalComponent } from './components/routes/myvitl/goal/goal.component';
import { PillarScoreDirective } from './directives/pillar-score.directive';
import {ContentResolver} from './resolvers/content.resolver';
import { SelectPlanComponent } from './components/routes/myvitl/select-plan/select-plan.component';
import { ManageReferralsComponent } from './components/routes/myvitl/manage-referrals/manage-referrals.component';
import {AccountResolver} from './resolvers/account.resolver';
import { AccountComponent } from './components/routes/account/account.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderManageComponent } from './components/order-manage/order-manage.component';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { FeedbackComponent } from './components/routes/feedback/feedback.component';
import { CategoryPreviewComponent } from './components/category-preview/category-preview.component';
import { DnaComponent } from './components/routes/dna/dna.component';
import { DnaVitaminComponent } from './components/routes/dna-vitamin/dna-vitamin.component';
import { Dna2Component } from './components/routes/dna-2/dna-2.component';
import { CompareDnaTestsComponent } from './components/routes/compare-dna-tests/compare-dna-tests.component';
import { BloodComponent } from './components/routes/blood/blood.component';
import { BloodOldComponent } from './components/routes/blood-old/blood-old.component';
import { PersonalisedComponent } from './components/routes/personalised/personalised.component';
import { BottleComponent } from './components/routes/bottle/bottle.component';
import { ImageTransitionComponent } from './components/image-transition/image-transition.component';
import { ProductsCarouselComponent } from './components/products-carousel/products-carousel.component';
import { CommunicationComponent } from './components/routes/account/communication/communication.component';
import { AccountDashboardComponent } from './components/routes/account/account-dashboard/account-dashboard.component';
import { GeneralFeedbackComponent } from './components/routes/general-feedback/general-feedback.component';
import { RegisterComponent } from './components/routes/register/register.component';
import { ForgotComponent } from './components/routes/forgot/forgot.component';
import { ResetComponent } from './components/routes/reset/reset.component';
import { PaymentMethodsComponent } from './components/routes/account/payment-methods/payment-methods.component';
import { GoalPreviewComponent } from './components/goal-preview/goal-preview.component';
import { BannerComponent } from './components/banner/banner.component';
import { VitaminsListComponent } from './components/vitamins-list/vitamins-list.component';
import {ExpertCarouselComponent} from './components/expert-carousel/expert-carousel.component';
import {EmailUnsubscribeResolver} from './resolvers/email-unsubscribe.resolver';
import { ExpertSquaresComponent } from './components/expert-squares/expert-squares.component';
import {environment} from '../environments/environment';
import {WindowRef} from './services/windowref.service';
import {LiveChatService} from './services/live-chat.service';
import { TheoneResultComponent } from './components/routes/theone-result/theone-result.component';
import {TheoneResolver} from './resolvers/theone.resolver';
import { TheoneResultsLoaderComponent } from './components/theone/theone-results-loader/theone-results-loader.component';
import { TheoneResultsPillComponent } from './components/theone/theone-results-pill/theone-results-pill.component';
import { TheoneResultsOrderComponent } from './components/theone/theone-results-order/theone-results-order.component';
import { TheoneResultsGoalsComponent } from './components/theone/theone-results-goals/theone-results-goals.component';
import { TheoneResultsBottleComponent } from './components/theone/theone-results-bottle/theone-results-bottle.component';
import { EssentialOneComponent } from './components/routes/essential-one/essential-one.component';
import { TheoneResultsTestimonialsComponent } from './components/theone/theone-results-testimonials/theone-results-testimonials.component';
import { TheoneResultsLoaderPillComponent } from './components/theone/theone-results-loader-pill/theone-results-loader-pill.component';
import { SocialShareComponent } from './components/social-share/social-share.component';
import { CompleteComponent } from './components/routes/complete/complete.component';
import { TheoneResultsGoalComponent } from './components/theone/theone-results-goal/theone-results-goal.component';
import {UrlSerializer} from '@angular/router';
import {LowerCaseUrlSerializer} from './classes/urlSerializer';
import { CheckoutModule } from './modules/checkout/checkout.module';
import {SharedModule} from './modules/shared/shared.module';
import {ConfigService} from './services/config.service';
import {ContentModule} from './modules/content/content.module';
import {ModalModule} from './modules/modal/modal.module';
import {LowerCasePipe} from '@angular/common';
import { ExchangeComponent } from './components/routes/exchange/exchange.component';
import { KitStatusComponent } from './components/kit-status/kit-status.component';
import { RecyclingComponent } from './components/routes/recycling/recycling.component';

import { KitRegistrationModule } from './modules/kit-registration/kit-registration.module';
import {BackdoorComponent} from './components/routes/backdoor/backdoor.component';
import {WorldHealthDayComponent} from './components/routes/world-health-day/world-health-day.component';
import {DnaAltComponent} from './components/routes/dna-alt/dna-alt.component';
import {PlanResolver} from './resolvers/plan.resolver';
import {BloodTestGuideComponent} from './components/routes/bloodtestguide/bloodtestguide.component';
import {DnaTestGuideComponent} from './components/routes/dnatestguide/dnatestguide.component';
import {BlogvertorialComponent} from './components/routes/blogvertorial/blogvertorial.component';
import {UpgradeSubscriptionComponent} from './components/routes/myvitl/upgrade-subscription/upgrade-subscription.component';
import {PractitionersComponent} from './components/routes/practitioners/practitioners.component';
import {CovidAwarenessComponent} from './components/routes/covid-awareness/covid-awareness.component';
import {BlackFridayComponent} from './components/routes/black-friday/black-friday.component';
import {UtmPopupComponent} from './components/utm-popup/utm-popup.component';
import {CookiePopupComponent} from './components/cookie-popup/cookie-popup.component';
import {MaintenanceComponent} from './components/routes/maintenance/maintenance.component';

@NgModule({
  declarations: [
    ButtonLoaderDirective,
    ConsultationContainerDirective,
    AppComponent,
    HomeComponent,
    ConsultationComponent,
    ContactComponent,
    PageComponent,
    ProductsComponent,
    ProductCategoryComponent,
    NewProductCategoryComponent,
    ProductComponent,
    HealthGoalComponent,
    ConfirmationComponent,
    BlogComponent,
    BlogCategoryComponent,
    BlogArticleComponent,
    BlogvertorialComponent,
    KitComponent,
    ReferralComponent,
    ReferredComponent,
    EmailComponent,
    EmailUnsubscribeComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    PlanSelectorComponent,
    MyvitlComponent,
    ConsultationResultComponent,
    AboutComponent,
    QualityComponent,
    ScienceComponent,
    MyvitlContentComponent,
    OrdersComponent,
    DetailsComponent,
    DashboardComponent,
    GoalsComponent,
    GoalComponent,
    ResultComponent,
    PersonalisedProductsComponent,
    ComparePersonalisedProductsComponent,
    PillarScoreDirective,
    SelectPlanComponent,
    ManageReferralsComponent,
    UpgradeSubscriptionComponent,
    AccountComponent,
    OrderDetailsComponent,
    OrderManageComponent,
    FeedbackComponent,
    CategoryPreviewComponent,
    DnaComponent,
    DnaVitaminComponent,
    Dna2Component,
    DnaAltComponent,
    CompareDnaTestsComponent,
    BloodOldComponent,
    BloodTestGuideComponent,
    DnaTestGuideComponent,
    BloodComponent,
    PersonalisedComponent,
    BottleComponent,
    ImageTransitionComponent,
    ProductsCarouselComponent,
    CommunicationComponent,
    AccountDashboardComponent,
    GeneralFeedbackComponent,
    RegisterComponent,
    ForgotComponent,
    ResetComponent,
    PaymentMethodsComponent,
    GoalPreviewComponent,
    BannerComponent,
    VitaminsListComponent,
    UtmPopupComponent,
    CookiePopupComponent,
    ExpertCarouselComponent,
    ExpertSquaresComponent,
    TheoneResultComponent,
    TheoneResultsLoaderComponent,
    TheoneResultsPillComponent,
    TheoneResultsOrderComponent,
    TheoneResultsGoalsComponent,
    TheoneResultsBottleComponent,
    EssentialOneComponent,
    TheoneResultsTestimonialsComponent,
    TheoneResultsLoaderPillComponent,
    SocialShareComponent,
    CompleteComponent,
    TheoneResultsGoalComponent,
    ExchangeComponent,
    KitStatusComponent,
    RecyclingComponent,
    BackdoorComponent,
    WorldHealthDayComponent,
    PractitionersComponent,
    CovidAwarenessComponent,
    BlackFridayComponent,
    MaintenanceComponent
  ],
  imports: [
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    HttpBatchLinkModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    LottieAnimationViewModule,
    BrowserModule.withServerTransition({ appId: 'service-web' }),
    BrowserTransferStateModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
    Angulartics2Module.forRoot(),

    SharedModule,
    CheckoutModule,
    ContentModule,
    ModalModule,
    KitRegistrationModule,

  ],
  providers: [
    LowerCasePipe,
    PageResolver,
    ProductCategoriesResolver,
    ProductCategoryResolver,
    NewProductCategoryResolver,
    ProductResolver,
    HealthGoalResolver,
    PlanResolver,
    BlogCategoryResolver,
    BlogArticleResolver,
    UserResolver,
    CartResolver,
    CheckoutResolver,
    ConfirmationResolver,
    ResultResolver,
    ComparePersonalisedProductsResolver,
    CompareDnaTestsResolver,
    TheoneResolver,
    FaqResolver,
    GoalResolver,
    DashboardResolver,
    ContentResolver,
    AccountResolver,
    EmailUnsubscribeResolver,
    Title,
    GlobalService,
    ConfigService,
    CartService,
    AuthService,
    ApiService,
    PageService,
    NavigationService,
    ProductService,
    BlogService,
    StripeService,
    SegmentService,
    LanaService,
    CookieService,
    BrowserCookieService,
    LiveChatService,
    WindowRef,
    {
        provide: UrlSerializer,
        useClass: LowerCaseUrlSerializer
    },
    {
        provide: SWIPER_CONFIG,
        useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
