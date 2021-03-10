import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ConfigService} from '../../../../services/config.service';
import {NgForm} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-address-manual',
  templateUrl: './address-manual.component.html',
  styles: []
})
export class AddressManualComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('addressForm') addressForm: NgForm;
  @Input() data;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  countries: Array<any> = [];
  private ngUnsubscribe$ = new Subject();

  constructor(private configService: ConfigService) { }
  ngOnInit() {

  }

  ngAfterViewInit() {
    this.configService.getConfig().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(config => {
      this.countries = config.countries;
      this.addressForm.controls['firstName'].setValue(this.data.deliveryAddress.firstName);
      this.addressForm.controls['lastName'].setValue(this.data.deliveryAddress.lastName);
      this.addressForm.controls['postcode'].setValue(this.data.deliveryAddress.postcode);
      this.addressForm.controls['address'].setValue(this.data.deliveryAddress.address);
      this.addressForm.controls['town'].setValue(this.data.deliveryAddress.town);
      this.addressForm.controls['country'].setValue(this.data.deliveryAddress.country);
    });
  }

  update() {
    this.callback.emit(this.addressForm.value);
  }

  cancel() {
    this.close.emit();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
