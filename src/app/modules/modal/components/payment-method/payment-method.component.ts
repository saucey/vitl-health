import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {StripeService} from '../../../../services/stripe.service';
import {GlobalService} from '../../../../services/global.service';
import {AccountService} from '../../../../services/account.service';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styles: []
})
export class PaymentMethodComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('cardInfo') cardInfo: ElementRef;
  @ViewChild('cardForm') cardForm: NgForm;

  @Input() data;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  error: string;
  card: any;

  constructor(
      private stripeService: StripeService,
      private modalService: ModalService,
      private globalService: GlobalService,
      private accountService: AccountService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.stripeService.createCard().then((card) => {
      this.card = card;
      this.card.mount(this.cardInfo.nativeElement);
    });
  }

  ngOnDestroy() {
      if (this.card) {
          this.card.destroy();
      }
  }

  addPaymentMethod() {

    if (this.cardForm.valid) {
      this.globalService.startLoading();
      this.stripeService.createToken(this.card).then(({error, token}) => {
        if (error) {
          this.modalService.alert(error.message);
          this.globalService.stopLoading();
        } else {
          this.accountService.addPaymentMethod({
            type: 'card',
            token: token.id,
            name: this.cardForm.value.name,
            postcode: this.cardForm.value.postcode
          }, Boolean(this.cardForm.value.setDefault)).then(() => {
            this.callback.emit();
          }, () => this.globalService.stopLoading());
        }
      });
    } else {
      this.modalService.alert('Please correct form errors');
    }

  }

  cancel() {
    this.close.emit();
  }

}
