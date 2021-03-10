import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {HasResult, ResultsQuery} from '../../../queries/theone';
import {CartService} from '../../../services/cart.service';
import {ProductService} from '../../../services/product.service';
import {GlobalService} from '../../../services/global.service';
import {AuthService} from '../../../services/auth.service';
import {LanaService} from '../../../services/lana.service';
import {CookieService} from '../../../services/cookie.service';
import { trigger, transition, animate, state, style } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-theone-result',
  templateUrl: './theone-result.component.html',
  styles: [],
  animations: [
    trigger('fade', [
        state('*', style( {
            opacity: 1
        })),
        transition(':enter', [
            style({ opacity: 0 }),
            animate('1000ms ease', style({ opacity: 1 }))
        ])
    ])
  ]
})
export class TheoneResultComponent implements OnInit, OnDestroy {

  user: any;
  pill: any;
  product: any;
  gummyProduct: any;
  topGoals: Array<any> = [];
  allGoals: Array<any> = [];
  nutrients: Array<any> = [];
  claims: Array<any> = [];
  ready = false;
  show = false;
  start;
  minLoadTime = 1;
  source: string;
  authSub: any;
  canLoad;
  partnership = 'generic';
  gummy = false;
  digestionGoal = null;
  hasOnlyDigestionGoal = false;

  resultsLoaded = false;
  resultsVisible = false;
  private ngUnsubscribe$ = new Subject();

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private productService: ProductService,
    private cartService: CartService,
    private globalService: GlobalService,
    private lanaService: LanaService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.globalService.setTitle('Your result');
    this.globalService.setMetaTag({
      name: 'description',
      content: ''
    });
    if (this.globalService.isBrowser()) {
      this.start = new Date().getTime();
      this.globalService.refetchInit().then(() => {
        this.authSub = this.authService.getUser().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((user) => {
          this.authSub.unsubscribe();
          if (user && user.type === 'user') {
            this.user = user;
            this.canLoad = true;
            this.loadResult();
          } else {
            this.authService.setPostLoginRedirect('/essential-one/result');
            this.router.navigateByUrl('/login');
          }
        });
      });
      if (this.cookieService.getCookie('essentialOnePartnership')) {
        this.partnership = this.cookieService.getCookie('essentialOnePartnership');
        if (this.isFreeTrial()) {
          this.globalService.emitEvent('setHeaderCtaLabel', { label: 'Start free trial' });
        } else {
          this.globalService.emitEvent('setHeaderCtaLabel', { label: 'Buy now' });
        }
      }
    }
  }

  ngOnDestroy() {
    this.canLoad = false;
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }



  isFreeTrial() {
    return [ 'generic', 'essential-one-free-delivery', 'essential-one-save-30', 'essential-one-save-50' ].indexOf(this.partnership) === -1;
  }

  loadResult() {
    this.apiService.query(HasResult).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(({data}) => {
      if (this.canLoad) {
        if (data.user.hasResult) {
          this.loadProduct();
        } else {
          setTimeout(() => this.loadResult(), 500);
        }
      }
    });
  }

  loadProduct() {

    this.apiService.query(ResultsQuery, { contextIdentifier: 'essential-one' }).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(({data}) => {
      this.user = data.user;

      // filter allGoals based on minimum score threshold of 0.15
      this.allGoals = this.user.allGoals.filter(goal => goal.score >= 0.15);

      // set max 3 topGoals and filter out digestion from remaining ones (if present)
      this.topGoals = this.allGoals.slice(0, 3);
      this.allGoals = this.allGoals.slice(3);
      this.allGoals.filter(goal => goal.id !== 'digestion');

      // check if user has digestion as top goal
      const digestionGoalIndex = this.topGoals.findIndex(topGoal => topGoal.id === 'digestion');
      const hasDigestionGoal = digestionGoalIndex > -1;

      // save local flag for later
      if (hasDigestionGoal) {
        this.digestionGoal = this.topGoals[digestionGoalIndex];
      }

      // digestion is the only goal, show screen for Personalised Product as there is no available TEO
      if (hasDigestionGoal && this.topGoals.length === 1) {
        this.hasOnlyDigestionGoal = true;
      }

      // digestion is not the only goal, swap digestion with next best one (if available)
      if (hasDigestionGoal && !this.hasOnlyDigestionGoal) {

        this.topGoals.splice(digestionGoalIndex, 1);

        if (this.allGoals.length > 0) {
          const newTopGoal = this.allGoals.shift();

          this.topGoals = [...this.topGoals, newTopGoal];
        }
      }

      this.productService.getProduct(this.user.products[0].id, this.isFreeTrial(), this.partnership).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((product) => {
        this.globalService.emitTrackingEvent('viewProduct', product);
        this.product = product;

        const now = new Date().getTime();
        if (now > (this.start + this.minLoadTime)) {
          this.displayResult(data);
        } else {
          setTimeout(() => {
            this.displayResult(data);
          }, this.minLoadTime - (now - this.start));
        }
      });
    });

  }

  displayResult(result: any) {
    this.pill = result.user.pills[0];
    this.nutrients = result.user.nutrients;
    this.claims = result.config.claims;
    this.resultsLoaded = true;
  }

  navigateToPersonalised() {
    const newTopGoals = [...this.topGoals];

    // put digestion goal back in
    if (newTopGoals.length === 3) {
      newTopGoals.pop();
    }
    newTopGoals.push(this.digestionGoal);

    this.globalService.startLoading();
    this.lanaService.selectGoals(newTopGoals).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => this.router.navigateByUrl('/myvitl/personalised'));
  }

  getYear() {
    return new Date().getFullYear();
  }

  // loadGummy() {
  //   this.productService.getProduct('gummy-test-11', this.isFreeTrial(), this.partnership).subscribe((product) => {
  //       this.gummyProduct = product;
  //   });
  // }

  // selectGummy() {
  //   this.product = this.gummyProduct;
  //   this.resultsVisible = !this.resultsVisible;
  //   this.gummy = true;
  // }

}
