import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {GlobalService} from '../../../../services/global.service';
import {AuthService} from '../../../../services/auth.service';
import {LanaService} from '../../../../services/lana.service';
import {CookieService} from '../../../../services/cookie.service';
import {ModalService, ModalTypes} from '../../../../modules/modal/services/modal.service';
import {ModalComponent} from '../../../../modules/modal/components/modal.component';
import {KitStatus} from '../../../../classes/kit/status';
import { AccountService } from '../../../../services/account.service';
import {NgForm} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  goals: Array<any> = [];
  recommendations: Array<any> = [];
  dnaKit;
  dnaKitStatus: KitStatus;
  goalAnnouncements;
  hasGoalsChanged = false;
  hasIntegratedResult = true;
  subscriptions;
  activeSubscriptions;
  dateNow = Math.floor((new Date()).getTime() / 1000);
  similarProducts = [45, 43];
  @ViewChild('referralForm') referralForm: NgForm;
  currencySymbol = '';
  private ngUnsubscribe$ = new Subject();


  constructor(
      private globalService: GlobalService,
      private route: ActivatedRoute,
      private modalService: ModalService,
      private authService: AuthService,
      private lanaService: LanaService,
      private cookieService: CookieService,
      private router: Router,
      private accountService: AccountService,
  ) {
    this.goals = this.route.snapshot.data.dashboard.goals;
    this.recommendations = this.sortRecommendations(this.route.snapshot.data.dashboard.recommendations);
    this.goalAnnouncements = this.route.snapshot.data.dashboard.goalAnnouncements;
    this.dnaKitStatus = this.route.snapshot.data.dashboard.dnaStatus;
    this.hasIntegratedResult = this.route.snapshot.data.dashboard.hasIntegratedResult;
    this.subscriptions = this.route.snapshot.data.dashboard.orders
    .filter(order => order.type === 'subscription' && order.status !== 'cancelled' && order.status !== 'expired')
    .map(order => this.getOrderLabel(order));
    this.activeSubscriptions = this.subscriptions
      .filter(order => order.status === 'active');
    this.dnaKit = this.route.snapshot.data.dashboard.orders.find(order => order.productName.includes('DNA'));

    if (this.dnaKitStatus) {
      this.dnaKit = this.route.snapshot.data.dashboard.orders.find(order => order.productName.includes('DNA'));
      this.dnaKit.status = this.dnaKitStatus.items.find(status => status.current);
    }

    if (!this.hasIntegratedResult) {
      this.handleUpgradePopup();
    }

    this.globalService.initCall()
    .map(({data}) => data.config)
    .map(config => config.currencies.find(currency => currency.code === config.currency))
    .pipe(takeUntil(this.ngUnsubscribe$)).subscribe(currency => this.currencySymbol = currency.symbol);
  }

  // getGoals() {
  //   return this.goals ? this.goals : [];
  // }

  ngOnInit() {
      this.loadAnnouncements();
  }

  loadAnnouncements() {

      if (this.goalAnnouncements) {

          for (const announcement of this.goalAnnouncements) {

              this.modalService.create(ModalTypes.GoalAnnouncement, {
                  title: announcement.content.title,
                  subtitle: announcement.content.subtitle,
                  data: {
                      goals: announcement.goals
                  },
                  ctas: announcement.content.buttons.map((button) => {
                    return {
                        label: button.title,
                        callback: ((modal: ModalComponent) => {
                            switch (button.action.type) {
                                case 'dismissScreen' : modal.close(); break;
                                case 'acceptRequest' : this.acceptRequest(button.action.value).then(() => modal.close()); break;
                                case 'viewContent' : modal.close(); this.router.navigateByUrl('/myvitl/' + button.action.value.replace(/^\/+/g, '')); break;
                            }
                        })
                    };
                  })
              });

          }

      }

  }

  acceptRequest(request) {

      this.globalService.startLoading();
      return new Promise((resolve, reject) => {
          this.authService.acceptRequest(request).then(() => {
            this.lanaService.getDashboard().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((data) => {
              this.goals = data.goals;
              this.hasGoalsChanged = true;
              this.recommendations = this.sortRecommendations(data.recommendations);
              this.goalAnnouncements = data.goalAnnouncements;
              this.globalService.stopLoading();
              this.loadAnnouncements();
              resolve(true);
          });
          }, () => this.globalService.stopLoading());
      });

  }

  handleGoalsChange() {
    this.globalService.startLoading();
    this.lanaService.getDashboard().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((data) => {
      this.recommendations = this.sortRecommendations(data.recommendations);
      this.globalService.stopLoading();
    });
  }

  getOrderLabel(subscription) {
    if (subscription.status === 'paused') {
      subscription.displayLabel = 'Paused until';
      subscription.displayDate = subscription.dateReactivates;
    } else if (!subscription.nextDeliveryDate || !subscription.nextInvoiceItem) {
      subscription.displayLabel = 'Processing';
      subscription.displayDate = null;
    } else {
      if (this.dateNow < subscription.nextDeliveryDate && this.dateNow < subscription.nextInvoiceItem.date) {
        subscription.displayLabel = subscription.nextDeliveryDate < subscription.nextInvoiceItem.date ? 'Next pack' : 'Next invoice';
        subscription.displayDate = subscription.nextDeliveryDate < subscription.nextInvoiceItem.date ? subscription.nextDeliveryDate : subscription.nextInvoiceItem.date;
      } else {
        subscription.displayLabel = this.dateNow < subscription.nextDeliveryDate ? 'Next pack' : 'Next invoice';
        subscription.displayDate = this.dateNow < subscription.nextDeliveryDate ? subscription.nextDeliveryDate : subscription.nextInvoiceItem.date;
      }
    }

    return subscription;
  }

  sortRecommendations(arr) {
    const essentialOneId = arr.findIndex(item => item.action.value === '/essential-one');
    const essentialOne = essentialOneId > -1 ? arr.splice(essentialOneId, 1)[0] : null;
    const personalisedId = arr.findIndex(item => item.action.value === '/personalised');
    const personalised = personalisedId > -1 ? arr.splice(personalisedId, 1)[0] : null;

    if (essentialOne) {
      arr.unshift(essentialOne);
    }

    if (personalised) {
      arr.unshift(personalised);
    }

    return arr;
  }

  handleUpgradePopup() {
    const isPopupDismissed = this.cookieService.getCookie('popup-dismissed-upgrade');

      if (!isPopupDismissed) {
        this.cookieService.setExpirableCookie('popup-dismissed-upgrade', true, 30);

        this.modalService.create(ModalTypes.UpgradeConsultation, {
          data: {},
          ctas: [
            {
              label: 'Take new consultation',
              callback: (modal: ModalComponent) => {
                modal.close();
                this.router.navigateByUrl('/consultation');
              }
            },
            {
              label: 'Or just upgrade recommendations',
              callback: (modal: ModalComponent) => {
                modal.close();
                this.globalService.startLoading();
                this.lanaService.generateResult('integrated').pipe(takeUntil(this.ngUnsubscribe$)).subscribe((data) => {
                  window.location.reload();
                }
                );
              }
            }
          ]
        });

      }
  }

  openConsultation() {
    this.router.navigateByUrl('/consultation');
  }

  referFriend() {
    const emails = this.referralForm.value.email.split(',').map((email) => {
      return email.trim();
    });
    this.accountService.referFriend(emails).then(() => {
      this.referralForm.resetForm();
      this.modalService.success('Your friends have been referred!');
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}

