import {ComponentFactoryResolver, ElementRef, Inject, Injectable, PLATFORM_ID, ViewContainerRef} from '@angular/core';
import {ModalComponent} from '../components/modal.component';
import {isPlatformBrowser} from '@angular/common';
import {PauseSubscriptionComponent} from '../components/pause-subscription/pause-subscription.component';
import {CancelSubscriptionComponent} from '../components/cancel-subscription/cancel-subscription.component';
import {PaymentMethodComponent} from '../components/payment-method/payment-method.component';
import {InlinePageComponent} from '../components/inline-page/inline-page.component';
import {GoalAnnouncementComponent} from '../components/goal-announcement/goal-announcement.component';
import {ManageGoalsComponent} from '../components/manage-goals/manage-goals.component';
import {EssentialOneGoalComponent} from '../components/essential-one-goal/essential-one-goal.component';
import {DnaModalComponent} from '../components/dnaModal/dna-modal.component';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { UpsellComponent } from '../components/upsell/upsell.component';
import { UpgradeConsultationComponent } from '../components/upgrade-consultation/upgrade-consultation.component';
import { PillDetailsComponent } from '../components/pill-details/pill-details.component';

export enum ModalTypes {
    Alert = 'alert',
    Success = 'success',
    Confirm = 'confirm',
    Input = 'input',
    Basket = 'basket',
    AddressFinder = 'addressFinder',
    AddressConfirm = 'addressConfirm',
    AddressManual = 'addressManual',
    CurrencySelector = 'currencySelector',
    Content = 'content',
    PauseSubscription = 'pauseSubscription',
    CancelSubscription = 'cancelSubscription',
    PaymentMethod = 'paymentMethod',
    InlinePage = 'inlinePage',
    LargeInlinePage = 'largeInlinePage',
    GoalAnnouncement = 'goalAnnouncement',
    ManageGoals = 'manageGoals',
    EssentialOne = 'essentialOne',
    DNA = 'dna',
    Blood = 'blood',
    GummyTest = 'gummyTest',
    NutritionInfo = 'nutritionalInfo',
    Upsell = 'upsell',
    UpgradeConsultation = 'upgradeConsultation',
    PillDetails = 'pillDetails'
}

const modals = {
    alert: { component: 'AlertComponent', styles: ['small', 'danger'] },
    success: { component: 'AlertComponent', styles: ['small', 'success'] },
    confirm: { component: 'AlertComponent', styles: ['small'] },
    dna: { component: 'DnaModalComponent', styles: ['dna'] },
    blood: { component: 'BloodModalComponent', styles: ['blood'] },
    nutritionalInfo: { component: 'NutritionalInfoComponent', styles: ['nutrition-info'] },
    input: { component: 'ModalInputComponent', style: 'small' },
    basket: { component: 'BasketComponent', style: 'halfScreen' },
    addressFinder: { component: 'AddressFinderComponent' },
    addressConfirm: { component: 'AddressConfirmComponent' },
    addressManual: { component: 'AddressManualComponent', style: 'large' },
    currencySelector: { component: 'CurrencySelectorComponent', style: 'small' },
    content: { component: 'ContentComponent', style: 'large' },
    pauseSubscription: { component: 'PauseSubscriptionComponent', style: 'large' },
    cancelSubscription: { component: 'CancelSubscriptionComponent', style: 'large' },
    paymentMethod: { component: 'PaymentMethodComponent' },
    inlinePage: { component: 'InlinePageComponent' },
    largeInlinePage: { component: 'InlinePageComponent', style: 'large' },
    goalAnnouncement: { component: 'GoalAnnouncementComponent', style: 'large' },
    manageGoals: { component: 'ManageGoalsComponent', style: 'manageGoals' },
    essentialOne: { component: 'EssentialOneGoalComponent', style: 'theone' },
    gummyTest: { component: 'GummyTestComponent', style: 'theone-gummy' },
    upsell: { component: 'UpsellComponent', style: 'upsell'},
    upgradeConsultation: { component: 'UpgradeConsultationComponent', style: 'upgrade-consultation'},
    pillDetails: { component: 'PillDetailsComponent', style: 'pill-details'}
};

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    rootViewContainer: ViewContainerRef;

    modals = [];
    alerts = [];
    activeModal: any;
    historyRestored = true;

    constructor(
        private componentFactory: ComponentFactoryResolver,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {
        if (this.isBrowser()) {
            window.addEventListener('keydown', (event) => {
                if (event.code === 'Escape') {
                    this.closeActiveModal();
                }
            });
        }
    }

    isBrowser() {
        return isPlatformBrowser(this.platformId);
    }

    setRootViewContainerRef(viewContainerRef) {
        this.rootViewContainer = viewContainerRef;
    }

    create(type: string, options = {}) {
        const modal = this.setupModal(type, options);
        this.displayModal(modal);
        return modal;
    }

    restoreHistory() {
        if (!this.historyRestored) {
            history.back();
            this.historyRestored = true;
        }
    }

    setupModal(type: string, options) {
        const factory = this.componentFactory.resolveComponentFactory(ModalComponent);
        const modal = factory.create(this.rootViewContainer.injector);
        modal.instance.setOptions(options);
        modal.instance.onViewInit.subscribe((inner: ElementRef) => {
            this.modals.push(modal);
            disableBodyScroll(inner.nativeElement);
        });
        modal.instance.onClose.subscribe(() => {
            modal.destroy();
            this.modals.splice(this.modals.indexOf(modal), 1);
            if (!this.modals.length) {
                clearAllBodyScrollLocks();
            }
        });
        modal.instance.loadConfig(modals[type]);
        return modal;
    }


    displayModal(modal: any) {
        if (this.isBrowser()) {
            this.rootViewContainer.insert(modal.hostView);
            this.activeModal = modal;

            history.pushState(null, null, document.URL);
            this.historyRestored = false;

            const closeModal = () => {
                this.historyRestored = true;
                this.closeModal(modal);
                window.removeEventListener('popstate', closeModal, false);
            };

            window.addEventListener('popstate', closeModal, false);
        }
    }


    closeModal(modal: any) {
        modal.instance.close();
        this.restoreHistory();
    }

    closeActiveModal() {
        if (this.activeModal) {
            this.activeModal.instance.close();

            this.restoreHistory();
        }
    }

    alert(message: string) {
        if (!this.alerts.length) {
            const modal = this.create(ModalTypes.Alert, {
                title: 'Oops!',
                titleDivider: false,
                data: {
                    message: message
                },
                ctas: [
                    { label: 'Close', callback(m: ModalComponent) {
                            m.close();
                        }}
                ]
            });
            modal.instance.onClose.subscribe(() => {
                this.alerts.splice(this.alerts.indexOf(modal), 1);
            });
            this.alerts.push(modal);
        }
    }

    success(message: string) {
        return this.create(ModalTypes.Success, {
            title: 'Success!',
            titleDivider: false,
            data: {
                message: message
            },
            ctas: [
                { label: 'Close', callback(modal: ModalComponent) {
                        modal.close();
                    }}
            ]
        });
    }

    confirm(message: string) {
        return new Promise((resolve) => {
            this.create(ModalTypes.Confirm, {
                title: 'Confirm',
                data: {
                    message: message
                },
                ctas: [
                    {
                        label: 'Ok', callback: (modal: ModalComponent) => {
                            modal.close();
                            resolve();
                        }
                    },
                    {
                        label: 'Cancel', callback: (modal: ModalComponent) => {
                            modal.close();
                        }
                    }
                ]
            });
        });
    }

}
