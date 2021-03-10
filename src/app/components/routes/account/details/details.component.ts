import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AccountService} from '../../../../services/account.service';
import {ModalService} from '../../../../modules/modal/services/modal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: []
})
export class DetailsComponent implements OnInit, OnDestroy {

  form: FormGroup;

  user;
  update;
  canUpdate = false;
  private ngUnsubscribe$ = new Subject();

  constructor(
      private accountService: AccountService,
      private modalService: ModalService,
      private fb: FormBuilder
  ) {}

  ngOnInit() {
      this.form = this.fb.group({
          firstName: ['', Validators.compose([Validators.required, Validators.pattern(/^\S*$/)])],
          lastName: [''],
          email: ['', Validators.compose([Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)])],
          dob: ['', Validators.pattern('[0-9]+')],
          password: [null, Validators.minLength(6)]
      });
      this.accountService.getAccount().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((user) => {
          this.user = user;
          this.form.setValue({
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              email: this.user.email,
              dob: this.user.dob,
              password: null
          });
      });
  }

  get f() {
      return this.form.controls;
  }

  submit({ value, valid, errors }) {
      if (valid) {
          this.accountService.updatePersonalDetails(value).then(() => {
              this.modalService.success('Details updated');
          });
      } else {
          this.modalService.alert('Please correct form errors');
      }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
