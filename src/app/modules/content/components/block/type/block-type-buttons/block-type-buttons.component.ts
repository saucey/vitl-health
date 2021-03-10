import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from '../../../../../../services/product.service';


@Component({
  selector: 'app-block-type-buttons',
  templateUrl: './block-type-buttons.component.html',
  styles: []
})
export class BlockTypeButtonsComponent implements OnInit, OnDestroy {

  @Input() block;
  private ngUnsubscribe$ = new Subject();

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.block.buttons.map(val => {
      this.productService.getProductById(val.action.value).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(response => {
        if (response.plans.length === 1) {
          const selectedProductPlan = response.plans.find(plan => plan.default);
          val.action.selectedProductPlan = selectedProductPlan;
          val.title = 'Add to basket';
          val.action.type = 'addToBasket';
        }
      });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
