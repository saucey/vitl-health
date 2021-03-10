import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PageResolver} from './resolvers/page.resolver';

import {ProductCategoriesResolver} from './resolvers/product-categories.resolver';
import {ProductCategoryResolver} from './resolvers/product-category.resolver';
import {NewProductCategoryResolver} from './resolvers/new-product-category.resolver'
import {ProductResolver} from './resolvers/product.resolver';
import {HealthGoalResolver} from './resolvers/health-goal.resolver';
import {ConfirmationResolver} from './resolvers/confirmation.resolver';
import {ResultResolver} from './resolvers/result.resolver';
import {BlogCategoryResolver} from './resolvers/blog-category.resolver';
import {BlogArticleResolver} from './resolvers/blog-article.resolver';
import {FaqResolver} from './resolvers/faq.resolver';
import {GoalResolver} from './resolvers/goal.resolver';

import {CanLoginGuard} from './guards/can-login.guard';

import {HomeComponent} from './components/routes/home/home.component';
import {ConsultationComponent} from './components/routes/consultation/consultation.component';
import {ContactComponent} from './components/routes/contact/contact.component';
import {ProductsComponent} from './components/routes/products/products.component';
import {ProductCategoryComponent} from './components/routes/product-category/product-category.component';
import {NewProductCategoryComponent} from './components/routes/new-product-category/new-product-category.component';
import {ProductComponent} from './components/routes/product/product.component';
import {HealthGoalComponent} from './components/routes/health-goal/health-goal.component';
import {ConfirmationComponent} from './components/routes/confirmation/confirmation.component';
import {BlogComponent} from './components/routes/blog/blog.component';
import {BlogCategoryComponent} from './components/routes/blog-category/blog-category.component';
import {BlogArticleComponent} from './components/routes/blog-article/blog-article.component';
import {FeedbackComponent} from './components/routes/feedback/feedback.component';
import {ReferralComponent} from './components/routes/referral/referral.component';
import {ReferredComponent} from './components/routes/referred/referred.component';
import {EmailComponent} from './components/routes/email/email.component';
import {EmailUnsubscribeComponent} from './components/routes/email-unsubscribe/email-unsubscribe.component';
import {PageComponent} from './components/routes/page/page.component';
import {NotFoundComponent} from './components/routes/not-found/not-found.component';
import {LoginComponent} from './components/routes/login/login.component';
import {MyvitlComponent} from './components/routes/myvitl/myvitl.component';
import {AboutComponent} from './components/routes/about/about.component';
import {QualityComponent} from './components/routes/quality/quality.component';
import {ScienceComponent} from './components/routes/science/science.component';
import {ComparePersonalisedProductsComponent} from './components/routes/myvitl/compare-personalised-products/compare-personalised-products.component';

import {ConsultationResultComponent} from './components/routes/consultation-result/consultation-result.component';
import {MyvitlContentComponent} from './components/routes/myvitl-content/myvitl-content.component';
import {CanMyvitlGuard} from './guards/can-myvitl.guard';
import {DashboardComponent} from './components/routes/myvitl/dashboard/dashboard.component';
import {OrdersComponent} from './components/routes/account/orders/orders.component';
import {DetailsComponent} from './components/routes/account/details/details.component';
import {ResultComponent} from './components/routes/myvitl/result/result.component';
import {GoalComponent} from './components/routes/myvitl/goal/goal.component';
import {ManageReferralsComponent} from './components/routes/myvitl/manage-referrals/manage-referrals.component';
import {DashboardResolver} from './resolvers/dashboard.resolver';
import {ComparePersonalisedProductsResolver} from './resolvers/compare-personalised-products.resolver';
import {ContentResolver} from './resolvers/content.resolver';
import {SelectPlanComponent} from './components/routes/myvitl/select-plan/select-plan.component';
import {AccountResolver} from './resolvers/account.resolver';
import {AccountComponent} from './components/routes/account/account.component';
import {DnaComponent} from './components/routes/dna/dna.component';
import {DnaVitaminComponent} from './components/routes/dna-vitamin/dna-vitamin.component';
import {Dna2Component} from './components/routes/dna-2/dna-2.component';
import {CompareDnaTestsComponent} from './components/routes/compare-dna-tests/compare-dna-tests.component';
import {CompareDnaTestsResolver} from './resolvers/compare-dna-tests.resolver';
import {BloodComponent} from './components/routes/blood/blood.component';
import {PersonalisedComponent} from './components/routes/personalised/personalised.component';
import {BottleComponent} from './components/routes/bottle/bottle.component';
import {CommunicationComponent} from './components/routes/account/communication/communication.component';
import {AccountDashboardComponent} from './components/routes/account/account-dashboard/account-dashboard.component';
import {HasGoalsGuard} from './guards/has-goals.guard';
import {ClaimCouponGuard} from './guards/claim-coupon.guard';
import {GeneralFeedbackComponent} from './components/routes/general-feedback/general-feedback.component';
import {RegisterComponent} from './components/routes/register/register.component';
import {ForgotComponent} from './components/routes/forgot/forgot.component';
import {ResetComponent} from './components/routes/reset/reset.component';
import {CanReferredGuard} from './guards/can-referred.guard';
import {CanReferredTEOGuard} from './guards/can-referred-teo.guard';
import {PaymentMethodsComponent} from './components/routes/account/payment-methods/payment-methods.component';
import {EmailUnsubscribeResolver} from './resolvers/email-unsubscribe.resolver';
import {ClaimProductGuard} from './guards/claim-product.guard';
import {TheoneResultComponent} from './components/routes/theone-result/theone-result.component';
import {EssentialOneComponent} from './components/routes/essential-one/essential-one.component';
import {ClaimCartGuard} from './guards/claim-cart.guard';
import {CanEssentialOneRefferalGuard} from './guards/can-essential-one-refferal.guard';
import {CompleteComponent} from './components/routes/complete/complete.component';
import {CanExchangeGuard} from './guards/can-exchange.guard';
import {ExchangeComponent} from './components/routes/exchange/exchange.component';
import {RecyclingComponent} from './components/routes/recycling/recycling.component';
import {KitRegisterConfirmationComponent} from './modules/kit-registration/pages/kitRegisteredConfirmation/kit-register-confirmation.component';
import {BackdoorComponent} from './components/routes/backdoor/backdoor.component';
import {WorldHealthDayComponent} from './components/routes/world-health-day/world-health-day.component';
import {DnaAltComponent} from './components/routes/dna-alt/dna-alt.component';
import {PlanResolver} from './resolvers/plan.resolver';
import {BloodOldComponent} from './components/routes/blood-old/blood-old.component';
import {BloodTestGuideComponent} from './components/routes/bloodtestguide/bloodtestguide.component';
import {DnaTestGuideComponent} from './components/routes/dnatestguide/dnatestguide.component';
import {BlogvertorialComponent} from './components/routes/blogvertorial/blogvertorial.component';
import {UpgradeSubscriptionComponent} from './components/routes/myvitl/upgrade-subscription/upgrade-subscription.component';
import {PractitionersComponent} from './components/routes/practitioners/practitioners.component';
import {CovidAwarenessComponent} from './components/routes/covid-awareness/covid-awareness.component';
import {BlackFridayComponent} from './components/routes/black-friday/black-friday.component';
import {MaintenanceComponent} from './components/routes/maintenance/maintenance.component';


const routes: Routes = [
  // maintenance start
  // {path: 'maintenance', component: MaintenanceComponent},
  // {path: '**', redirectTo: 'maintenance'},
  // maintenance end
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [CanLoginGuard], data: {noindex: true}},
  {path: 'register', component: RegisterComponent, data: {noindex: true}},
  {path: 'forgot', component: ForgotComponent, data: {noindex: true}},
  {path: 'recover/:userId/:token', component: ResetComponent, data: {noindex: true}},
  {path: 'complete/:userId/:token', component: CompleteComponent, data: {noindex: true}},
  {
    path: 'exchange/:id/:token', canActivate: [CanExchangeGuard], data: {noindex: true}, children: [
      {path: '**', component: ExchangeComponent}
    ]
  },

  {path: 'consultation', component: ConsultationComponent},

  {
    path: 'contact', component: ContactComponent, resolve: {
      faqs: FaqResolver
    }
  },

  {
    path: 'referral', component: ReferralComponent
  },
  
  {
    path: 'products', component: ProductsComponent, resolve: {
      categories: ProductCategoriesResolver
    }
  },
  {
    path: 'products/health-goals', component: NewProductCategoryComponent, data: {slug: 'health-goals'}, resolve: {
      category: NewProductCategoryResolver
    }
  },
  {
    path: 'products/womens-health', component: NewProductCategoryComponent, data: {slug: 'womens-health'}, resolve: {
      category: NewProductCategoryResolver
    }
  },
  {
    path: 'products/dna', component: CompareDnaTestsComponent, data: {ids: [45, 75]}, resolve: {
      products: CompareDnaTestsResolver
    }
  },
  {
    path: 'products/dna-promo', component: CompareDnaTestsComponent, data: {ids: [45, 75], hasPromo: true}, resolve: {
      products: CompareDnaTestsResolver
    }
  },
  {
    path: 'products/:slug', component: ProductCategoryComponent, resolve: {
      category: ProductCategoryResolver
    }
  },

  {
    path: 'product/rise-and-energise', component: HealthGoalComponent, data: {id: 67}, resolve: {
      product: HealthGoalResolver
    }
  },
  {
    path: 'product/sweet-sleep', component: HealthGoalComponent, data: {id: 68}, resolve: {
      product: HealthGoalResolver
    }
  },
  {
    path: 'product/get-up-and-glow', component: HealthGoalComponent, data: {id: 69}, resolve: {
      product: HealthGoalResolver
    }
  },
  {
    path: 'product/immunity', component: HealthGoalComponent, data: {id: 72, oneOffOnly: true}, resolve: {
      product: HealthGoalResolver
    }
  },

  // one-off buy option only - used for Google Adwords
  {
    path: 'product/health-goals/rise-and-energise', component: HealthGoalComponent, data: {id: 67, oneOffOnly: true}, resolve: {
      product: HealthGoalResolver
    }
  },
  {
    path: 'product/health-goals/sweet-sleep', component: HealthGoalComponent, data: {id: 68, oneOffOnly: true}, resolve: {
      product: HealthGoalResolver
    }
  },
  {
    path: 'product/health-goals/get-up-and-glow', component: HealthGoalComponent, data: {id: 69, oneOffOnly: true}, resolve: {
      product: HealthGoalResolver
    }
  },

  {
    path: 'product/dna', component: DnaComponent, data: {resolveById: true, id: 45}, resolve: {
      product: ProductResolver
    }
  },
  {
    path: 'product/dna-vitamin-test', component: DnaVitaminComponent, data: {resolveById: true, id: 75}, resolve: {
      product: ProductResolver
    }
  },
  {
    path: 'product/dna-nutrition-test', component: Dna2Component, data: {resolveById: true, id: 45}, resolve: {
      product: ProductResolver
    }
  },
  {path: 'product/dna-test-kit', redirectTo: 'product/dna'},
  {
    path: 'product/blood', component: BloodComponent, data: {resolveById: true, id: 43}, resolve: {
      product: ProductResolver
    }
  },
  {
    path: 'bloodtestguide', component: BloodTestGuideComponent
  },
  {
    path: 'dnatestguide', component: DnaTestGuideComponent
  },
  {
    path: 'product/blood-old', component: BloodOldComponent, data: {resolveById: true, id: 43}, resolve: {
      product: ProductResolver
    }
  },
  {path: 'product/blood-test-kit', redirectTo: 'product/blood'},
  {path: 'product/personalised', component: PersonalisedComponent, data: {resolveById: true, id: 7}, resolve: {product: ProductResolver}},
  {path: 'personalised-free-trial', component: PersonalisedComponent, data: {headerStyle: 'landing-page', hideFooter: true, freeTrial: true}},


  {path: 'product/essential-one', component: EssentialOneComponent, data: {partnership: 'generic', navType: 'essential-one', freeTrial: false}},
  // {path: 'product/essential-one', redirectTo: 'essential-one-free-trial'},
  {path: 'essential-one', redirectTo: 'product/essential-one'},
  {path: 'product/bottle', component: BottleComponent, data: {resolveById: true, id: 70}, resolve: {product: ProductResolver}},
  {path: 'product/:slug', component: ProductComponent, resolve: {product: ProductResolver}},

  {path: 'about', component: AboutComponent},
  {path: 'quality', component: QualityComponent},
  {path: 'science', component: ScienceComponent},
  {path: 'recycle', component: RecyclingComponent},
  {path: 'backdoor', component: BackdoorComponent},


  {path: '', data: {headerStyle: 'partial', hideFooter: true, noindex: true}, loadChildren: 'app/modules/checkout/checkout.module#CheckoutModule'},

  {path: 'kit/confirmation', component: KitRegisterConfirmationComponent},
  {path: 'kit', data: {headerStyle: 'partial', hideFooter: true, noindex: true}, loadChildren: 'app/modules/kit-registration/kit-registration.module#KitRegistrationModule'},

  {
    path: 'confirmation', component: ConfirmationComponent, data: {noindex: true}, resolve: {
      confirmation: ConfirmationResolver
    }
  },

  {path: 'essential-one-free-trial', component: EssentialOneComponent, data: {headerStyle: 'landing-page', hideFooter: true, partnership: 'paid-social', freeTrial: true}},
  {path: 'essential-one-save-30', component: EssentialOneComponent, data: {headerStyle: 'landing-page', hideFooter: true, partnership: 'essential-one-save-30', freeTrial: false}},

  {path: 'essential-one-trial', component: EssentialOneComponent, data: {headerStyle: 'landing-page', hideFooter: true, partnership: 'essential-one-price-test', freeTrial: true}},
  {path: 'referred/essential-one/:token', component: EssentialOneComponent, data: {resolveById: true, id: 1, noindex: true, headerStyle: 'landing-page', hideFooter: true, partnership: 'essential-one-referral', freeTrial: true}, canActivate: [CanReferredTEOGuard]},
  {path: 's/:code', component: EssentialOneComponent, data: {headerStyle: 'landing-page', hideFooter: true, partnership: 'referral', freeTrial: true}, canActivate: [CanEssentialOneRefferalGuard]},

  // {path: 'o2priorityjuneoffer', component: EssentialOneComponent, data: {headerStyle: 'landing-page', hideFooter: true, partnership: 'o2priorityjuneoffer', freeTrial: true}},
  // {path: 'o2priorityjuneoffer2', component: EssentialOneComponent, data: {headerStyle: 'landing-page', hideFooter: true, partnership: 'o2priorityjuneoffer2', freeTrial: true}},
  // {path: 'gruum', component: EssentialOneComponent, data: {headerStyle: 'landing-page', hideFooter: true, partnership: 'gruum', freeTrial: true}},
  // {path: 'gousto', component: EssentialOneComponent, data: {headerStyle: 'landing-page', hideFooter: true, partnership: 'gousto', freeTrial: true}},
  // {path: 'sweatcoin', component: EssentialOneComponent, data: {headerStyle: 'landing-page', hideFooter: true, partnership: 'sweatcoin', freeTrial: true}},
  // {path: 'virgin', component: EssentialOneComponent, data: {headerStyle: 'landing-page', hideFooter: true, partnership: 'virgin', freeTrial: true}},
  {path: 'investor', component: EssentialOneComponent, data: {headerStyle: 'landing-page', hideFooter: true, partnership: 'investor', freeTrial: true}},
  {path: 'iknowj', component: EssentialOneComponent, data: {headerStyle: 'landing-page', hideFooter: true, partnership: 'iknowj', freeTrial: true}},
  {path: 'crowd', component: EssentialOneComponent, data: {headerStyle: 'landing-page', hideFooter: true, partnership: 'crowd', freeTrial: true}},
  {path: '360athletic', component: EssentialOneComponent, data: {headerStyle: 'landing-page', hideFooter: true, partnership: '360athletic', freeTrial: true}},

  {path: 'world-health-day', component: WorldHealthDayComponent, data: {headerStyle: 'essential-one-result'}},

  {
    path: 'compare-personalised-products', component: ComparePersonalisedProductsComponent, data: {mainNav: true}, resolve: {
      products: ComparePersonalisedProductsResolver
    }
  },

  {path: 'practitioners', component: PractitionersComponent},

  {path: 'corona-tips', component: CovidAwarenessComponent},
  // {path: 'black-friday', component: BlackFridayComponent},

  {path: 'essential-one/result', component: TheoneResultComponent, data: {headerStyle: 'essential-one-result', hideFooter: true, hideBanner: true, noindex: true}},
  {
    path: 'consultation/result', component: ConsultationResultComponent, data: {
      headerStyle: 'hidden',
      hideFooter: true,
      noindex: true
    }, canActivate: [CanMyvitlGuard], resolve: {
      result: ResultResolver
    }
  },
  {
    path: 'blog', component: BlogComponent, resolve: {
      blogConfig: BlogCategoryResolver
    }
  },
  {
    path: 'blog/:slug', component: BlogCategoryComponent, resolve: {
      blogConfig: BlogCategoryResolver
    }
  },
  {
    path: 'blog/article/:slug', component: BlogArticleComponent, resolve: {
      blogArticle: BlogArticleResolver
    }
  },

  {
    path: 'should-you-take-supplements', component: BlogvertorialComponent
  },
  {
    path: 'myvitl',
    component: MyvitlComponent,
    data: {headerStyle: 'myvitl', navType: 'myvitl', noindex: true},
    canActivate: [CanMyvitlGuard],
    children: [
      {
        path: '', component: DashboardComponent, resolve: {
          dashboard: DashboardResolver
        }, canActivate: [HasGoalsGuard]
      },
      {
        path: 'select-plan/:id', component: SelectPlanComponent, data: {resolveById: true}, resolve: {
          product: ProductResolver
        }
      },
      {
        path: 'goal/:identifier', component: GoalComponent, resolve: {
          data: GoalResolver
        }
      },
      {
        path: 'help', component: ContactComponent, resolve: {
          faqs: FaqResolver
        }
      },
      {
        path: 'upgrade-subscription', component: UpgradeSubscriptionComponent
      },
      {
        path: 'account',
        component: AccountComponent,
        resolve: {account: AccountResolver},
        children: [
          {path: '', component: AccountDashboardComponent},
          {path: 'orders', component: OrdersComponent},
          {path: 'orders/:id', component: OrdersComponent},
          {path: 'details', component: DetailsComponent},
          {path: 'payment', component: PaymentMethodsComponent},
          {path: 'feedback', component: FeedbackComponent},
          {path: 'referral', component: ManageReferralsComponent},
          {path: 'communication', component: CommunicationComponent}
        ]
      },
      {
        path: 'result', component: ResultComponent, resolve: {
          dashboard: DashboardResolver
        }, canActivate: [HasGoalsGuard]
      },
      {
        path: 'result/goal/:identifier', component: GoalComponent, data: {hideMealPlan: true}, resolve: {
          data: GoalResolver
        }
      },
      {
        path: 'compare-personalised-products', component: ComparePersonalisedProductsComponent, resolve: {
          products: ComparePersonalisedProductsResolver
        }
      },
      {
        path: '**', component: MyvitlContentComponent, resolve: {
          screen: ContentResolver
        }
      }
    ]
  },
  {path: 'feedback/:type/:option', component: GeneralFeedbackComponent, data: {noindex: true}},
  {
    path: 'referred/:token', component: ReferredComponent, data: {resolveById: true, id: 1, noindex: true}, canActivate: [CanReferredGuard], resolve: {
      product: ProductResolver
    }
  },
  {path: 'email', component: EmailComponent},
  {
    path: 'email/unsubscribe/:category/:email', component: EmailUnsubscribeComponent, resolve: {
      result: EmailUnsubscribeResolver
    }
  },
  {path: 'basket/claimdiscount/:coupon', component: HomeComponent, canActivate: [ClaimCouponGuard], data: {noindex: true}},
  {path: 'basket/claimproduct/:plan', component: HomeComponent, canActivate: [ClaimProductGuard], data: {noindex: true}},
  {path: 'basket/claimcart', component: HomeComponent, canActivate: [ClaimCartGuard], data: {noindex: true}},
  {path: 'basket/claimcart/:cartid', component: HomeComponent, canActivate: [ClaimCartGuard], data: {noindex: true}},
  {path: '404', component: NotFoundComponent, data: {noindex: true}},
  {
    path: ':slug', component: PageComponent, resolve: {
      page: PageResolver
    }
  },

  {path: '**', redirectTo: '404'}

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: []
})
export class AppRoutingModule {
}
