import { Component, OnInit, Input, SimpleChanges, OnDestroy } from '@angular/core';
import {GlobalService} from '../../../../services/global.service';
import {ApiService} from '../../../../services/api.service';
import {ProductService} from '../../../../services/product.service';
import {CookieService} from '../../../../services/cookie.service';
import {ModalService, ModalTypes} from '../../../../modules/modal/services/modal.service';
import {SubmitForm} from '../../../../queries/misc';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-personalised-products',
  templateUrl: './personalised-products.component.html',
    styles: []
})
export class PersonalisedProductsComponent implements OnInit, OnDestroy {

  personalisedPlus = null;
  essentialOne = null;
  dataLoaded = false;

  @Input() products;
  @Input() activeSubscriptions = null;
  private ngUnsubscribe$ = new Subject();

  constructor(
    private globalService: GlobalService,
    private apiService: ApiService,
    private productService: ProductService,
    private cookieService: CookieService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.getFullProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.productIds && changes.productIds.currentValue) {
      this.getFullProducts();
    }

  }

  getFullProducts() {
    const products = [];
    const partnerships = {
      essentialOne: this.cookieService.getCookie('essentialOnePartnership'),
      personalisedPlus: this.cookieService.getCookie('personalisedPlusPartnership')
    };
    const freeTrials = {
      essentialOne: this.globalService.checkFreeTrial('essentialOne', partnerships.essentialOne),
      personalisedPlus: this.globalService.checkFreeTrial('personalisedPlus', partnerships.personalisedPlus)
    };

    this.products.map(item => {
      const productPromise = new Promise((resolve, reject) => {
        this.productService.getProduct(item.id, freeTrials[item.type], partnerships[item.type] ? partnerships[item.type] : null).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(fullProduct => resolve(fullProduct));
      });
      products.push(productPromise);
    });

    Promise.all(products).then((res) => {
      this.essentialOne = res.find(product => product.grouping === 'essential-one');
      this.personalisedPlus = res.find(product => product.grouping === 'personalised');
      this.dataLoaded = true;

      this.essentialOne.isFreeTrial = freeTrials.essentialOne;
      this.personalisedPlus.isFreeTrial = freeTrials.personalisedPlus;

      // this.checkActiveSubscriptions();
    });
  }

  checkActiveSubscriptions() {
    if (this.activeSubscriptions) {
      this.personalisedPlus.action = this.activeSubscriptions.find(sub => sub.productId === this.personalisedPlus.id) ? 'none'
        : this.activeSubscriptions.find(sub => sub.productName.toLowerCase().includes('personalised pack')) ? 'update'
        : 'buy';
      this.essentialOne.action = this.activeSubscriptions.find(sub => sub.productId === this.essentialOne.id) ? 'none'
        : this.activeSubscriptions.find(sub => sub.productName.toLowerCase().includes('essential one')) ? 'update'
        : 'buy';
    } else {
      this.personalisedPlus.action = 'buy';
      this.essentialOne.action = 'buy';
    }
  }

  openPillPopup(pill) {
    this.modalService.create(ModalTypes.PillDetails, {
      data: {...pill}
    });
  }

  updatePack() {
    this.globalService.startLoading();
    this.apiService.mutate(SubmitForm, { id: 'updatePack' }).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(({data}) => {
      this.globalService.stopLoading();
      this.checkActiveSubscriptions();
    }, () => this.globalService.stopLoading());
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
