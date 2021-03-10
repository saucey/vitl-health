import { Component, OnDestroy, OnInit } from '@angular/core';
import {AccountService} from '../../../../services/account.service';
import {ModalService, ModalTypes} from '../../../../modules/modal/services/modal.service';
import {ModalComponent} from '../../../../modules/modal/components/modal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styles: []
})
export class PaymentMethodsComponent implements OnInit, OnDestroy {

  user;
  paymentMethods;
  selectedCardIndex = 0;
  private ngUnsubscribe$ = new Subject();

  constructor(
      private accountService: AccountService,
      private modalService: ModalService
  ) {
      this.accountService.getAccount().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((user) => {
          this.user = user;
          this.paymentMethods = this.user.paymentMethods;
      });
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  ngOnInit() {
  }

  deletePaymentMethod(method) {

      this.modalService.confirm('Are you sure you want to delete this payment method?').then(() => {
        this.accountService.deletePaymentMethod(method.id).then(() => this.modalService.success('Payment method deleted'));
      });

  }

  updatePaymentMethod(method) {

      this.modalService.create(ModalTypes.PaymentMethod, {
          title: 'Update payment method',
          data: {
              postcode: method.postcode,
              setDefault: false,
              mode: 'update'
          },
          ctas: [
              {
                  label: 'Update',
                  callback: (modal: ModalComponent, data: any) => {
                      this.accountService.updatePaymentMethod(method.id, data.postcode, data.setDefault).then(() => {
                          modal.close();
                          this.modalService.success('Payment method updated');
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

  addNewCard() {

      this.modalService.create(ModalTypes.PaymentMethod, {
        title: 'Add payment method',
        data: {
            mode: 'add'
        },
        callback: (modal: ModalComponent) => {
            modal.close();
            this.modalService.success('Payment method added');
        }
      });

  }

  getImageSource(type) {

    return `https://static.vitl.com/2.0/payment-methods/${type}.png`;

  }

}
