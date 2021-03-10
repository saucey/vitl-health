import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {CartService} from '../../services/cart.service';
import {GlobalService} from '../../services/global.service';
import * as moment from 'moment';
import {ModalComponent} from '../../modules/modal/components/modal.component';
import {ModalService, ModalTypes} from '../../modules/modal/services/modal.service';
import {ProductService} from '../../services/product.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styles: []
})

export class OrderManageComponent implements OnInit, OnDestroy {

  @Input() order;
  @Input() expanded;
  private ngUnsubscribe$ = new Subject();

  constructor(
    private accountService: AccountService,
    private cartService: CartService,
    private globalService: GlobalService,
    private modalService: ModalService,
    private productService: ProductService
  ) {
  }
  ngOnInit() {

  }

  manage() {

  }

  pause() {

    this.modalService.create(ModalTypes.PauseSubscription, {
      title: 'Pause your subscription',
      data: {
        order: this.order,
        restartDate: moment().add(4, 'weeks').unix()
      },
      ctas: [
        {
          label: 'Pause',
          callback: (modal: ModalComponent, data: any) => {
            this.accountService.pauseSubscription(this.order, data.restartDate).then((order) => {
              modal.close();
              this.modalService.success('Your subscription has been paused');
            });
          }
        },
        {
          label: 'Cancel',
          callback: (modal: ModalComponent) => {
            modal.close();
          }
        }
      ]
    });

  }

  restart() {

    this.modalService.confirm('Are you sure you want to restart this subscription from today?').then(() => {
      this.accountService.restartSubscription(this.order).then(() => {
        this.modalService.success('Your subscription has been restarted');
      });
    });

  }

  cancel() {

    this.modalService.create(ModalTypes.CancelSubscription, {
      data: {
        order: this.order
      },
      callback: (modal: ModalComponent) => {
        modal.close();
      }
    });

  }

  reorder() {
    this.globalService.startLoading();
    const sub = this.productService.getPlan(this.order.planId).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((plan) => {
      sub.unsubscribe();
      this.cartService.addPlan(plan).then(() => {
          this.globalService.stopLoading();
          this.cartService.showCart();
        },
        () => this.globalService.stopLoading());
    });
  }

  updateDeliveryAddress() {
    this.modalService.create(ModalTypes.AddressManual, {
      title: 'Update delivery address',
      data: {
        deliveryAddress: this.order.deliveryAddress
      },
      callback: (modal: ModalComponent, address: any) => {
        this.accountService.updateDeliveryAddress(this.order, address).then((order) => {
          modal.close();
          this.modalService.success('Delivery address updated');
        });
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
