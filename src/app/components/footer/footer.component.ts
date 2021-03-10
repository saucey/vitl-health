import { Component, OnDestroy } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';
import {NavigationService} from '../../services/navigation.service';
import {GlobalService} from '../../services/global.service';
import {CartService} from '../../services/cart.service';
import {ModalService} from '../../modules/modal/services/modal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnDestroy {

  currency: string;
  email: string;

  private ngUnsubscribe$ = new Subject();

  constructor(
      private navigation: NavigationService,
      private globalService: GlobalService,
      private modalService: ModalService,
      private cartService: CartService
  ) {

    this.globalService.initCall().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(({data}) => {
      this.currency = data.config.currency;
    });

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  getYear() {
      return new Date().getFullYear();
  }

  getPageLinks() {
      return this.navigation.getFooterLinksPages();
  }

  getProductLinks() {
      return this.navigation.getFooterLinksProducts();
  }

  registerNewsletter() {
      if (this.email) {
          this.globalService.registerNewsletter(this.email).then(() => this.email = '');
      } else {
          this.modalService.alert('Email address is not valid');
      }
  }

  hideFooter() {
      return this.globalService.hideFooter();
  }

  changeCurrency() {
      this.globalService.changeCurrency().then(() => {
          this.globalService.startLoading();
          setTimeout(() => window.location.reload(), 1000);
      });
  }

  getCurrencySymbol() {
      return getCurrencySymbol(this.currency, 'narrow');
  }

  addPromoCode() {
      this.cartService.addCoupon().then(() => this.cartService.showCart());
  }

}
