import { Component, Inject, PLATFORM_ID, HostListener, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {NavigationStart, NavigationEnd, Router, ActivatedRoute} from '@angular/router';
import {NavigationService} from '../../services/navigation.service';
import {AuthService} from '../../services/auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/forkJoin';
import {User} from '../../classes/user';
import {Cart} from '../../classes/cart';
import {CartService} from '../../services/cart.service';
import {GlobalService} from '../../services/global.service';
import Navigation from '../../static-data/navigation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const HEADER_BREAKPOINT = 500;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})

export class HeaderComponent implements OnDestroy {

  @ViewChild('headerNavigation') headerNavigation;

  navType;
  activeExpandItem = -1;
  navShopCategories;
  navActiveShopCategoryID;
  navAccountItems;
  navMobileIsOpen = false;
  shopButtonIsHover = false;
  shopDropdownIsHover = false;
  isNavInit = true;
  navToggleTimer;
  active = false;
  scrolled = false;
  page_offset: number;
  user: User;
  cart: Cart;
  ctaLabel = 'Add to basket';
  banner = '';
  popup = '';
  private ngUnsubscribe$ = new Subject();

  constructor(
      private renderer: Renderer2,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private navigationService: NavigationService,
      private authService: AuthService,
      private cartService: CartService,
      private globalService: GlobalService,
      @Inject(PLATFORM_ID) private platformId: Object
  ) {

      router.events.filter(event => event instanceof NavigationStart).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
        this.closeNewNav();
      });

      router.events.filter(event => event instanceof NavigationEnd).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((event: NavigationEnd) => {
        if (event.url.split('/')[1] === 'myvitl') {
          this.navType = 'account';
        } else {
          this.navType = 'shopfront';
        }

        this.banner = this.activatedRoute.snapshot.queryParamMap.get('utm_show_banner');
        this.popup = this.activatedRoute.snapshot.queryParamMap.get('utm_show_popup');
      });

      this.authService.getUser().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(user => this.user = user);
      this.cartService.getCart().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(cart => this.cart = cart);

      this.navShopCategories = Navigation.shopCategories;
      this.navAccountItems = Navigation.account;
  }

  handleMyVitlNavClick(item) {
    if (item.actionType === 'navigate') {
      this.router.navigate([item.actionValue]);
    } else {
      switch (item.actionValue) {
        case 'addCoupon':
          this.addCoupon();
          break;
        case 'logout':
          this.logout();
      }
    }
  }

  showCart() {
    this.cartService.showCart();
  }

  logout() {
    this.authService.logout();
  }

  @HostListener('window:scroll', ['$event'])
  toggleHeader(event) {

    this.scrolled = window.pageYOffset > 0;
  }

  toggleNavMobile() {
    this.navMobileIsOpen = !this.navMobileIsOpen;

    if (this.navMobileIsOpen) {
      this.renderer.addClass(document.body, 'body-fixed');
    } else {
      this.renderer.removeClass(document.body, 'body-fixed');
    }

    if (this.isNavInit) {
      this.isNavInit = false;
    }
  }

  closeNewNav() {
    this.shopButtonIsHover = false;
    this.shopDropdownIsHover = false;
    this.navMobileIsOpen = false;
  }

  toggleShopButton(val: boolean) {

    if (val) {
      this.shopButtonIsHover = val;
      this.navActiveShopCategoryID = this.navShopCategories[0].id;
    } else {
      if (this.navToggleTimer) { clearTimeout(this.navToggleTimer); }

      this.navToggleTimer = setTimeout(() => {
        this.shopButtonIsHover = false;
      }, 200);
    }
  }

  toggleShopDropdown(val: boolean) {
    this.shopDropdownIsHover = val;
  }

  toggleExpand(val: number) {
    if (this.activeExpandItem === val) {
      this.activeExpandItem = -1;
    } else {
      this.activeExpandItem = val;
    }
  }

  openConsultation() {
    // todo remove after sweatcoin campaign
    const showTEOResultsOnly = this.globalService.headerStyle() === 'landing-page';
-   this.globalService.openConsultation(showTEOResultsOnly);
    // end todo
    // this.globalService.openConsultation();
  }

  addCoupon() {
    this.cartService.addCoupon().then(() => this.cartService.showCart());
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
