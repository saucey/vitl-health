import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
import {AccountService} from '../../../services/account.service';
import {ApiService} from '../../../services/api.service';
import * as miscQueries from '../../../queries/misc';
import {GlobalService} from '../../../services/global.service';
import {PageService} from '../../../services/page.service';
import {ModalService, ModalTypes} from '../../../modules/modal/services/modal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-kit',
  templateUrl: './kit.component.html',
  styleUrls: ['./kit.component.css']
})
export class KitComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('kitForm') kitForm: NgForm;

  kitRegistered;

  accept = false;

  type: string;

  kitTypes = [
      {
        code: 'dna',
        label: 'DNA'
      },
      {
        code: 'blood',
        label: 'Blood'
      }
  ];

  genders = [
      {
        code: 'm',
        label: 'Male'
      },
      {
        code: 'f',
        label: 'Female'
      }
  ];

  lottieConfig = {
     path: 'https://static.vitl.com/assets/tick.json',
     autoplay: false,
     loop: false,
     speed: 2
  };

  private anim: any;
  bloodInformedConsent;
  dnaInformedConsent;
  private ngUnsubscribe$ = new Subject();

  constructor(
      private accountService: AccountService,
      private apiService: ApiService,
      private globalService: GlobalService,
      private modalService: ModalService,
      private pageService: PageService,
      private route: ActivatedRoute
  ) {}

  handleAnimation(anim: any) {
      this.anim = anim;
  }

  ngOnInit() {
      this.globalService.setTitle('Register your Vitl test kit here');
      this.globalService.setMetaTag({ name: 'description', content: 'Register your Vitl DNA Nutrition Test or Vitamin Blood Test here for free before you send back your sample for analysis' });
      this.pageService.getPage('dna-informed-consent').pipe(takeUntil(this.ngUnsubscribe$)).subscribe((page) => this.dnaInformedConsent = page);
      this.pageService.getPage('blood-informed-consent').pipe(takeUntil(this.ngUnsubscribe$)).subscribe((page) => this.bloodInformedConsent = page);
      this.type = this.route.snapshot.data.type || 'dna';
  }

  ngAfterViewInit() {
      this.accountService.getAccount().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((user) => {
          this.kitForm.controls['type'].setValue(this.type);
          this.kitForm.controls['firstName'].setValue(user.firstName);
          this.kitForm.controls['lastName'].setValue(user.lastName);
          this.kitForm.controls['gender'].setValue(user.gender);
          this.kitForm.controls['phone'].setValue(user.phone);
          this.kitForm.controls['dob'].setValue(user.dob);
      });
  }

  explainBarcode() {

      let body = '';

      if (this.kitForm.controls['type'].value === 'dna') {

          body = '<p class="copy copy--medium mb-20 text-left">Your barcode is printed in several places within your kit</p><ol class="list list--ordered mb-30">' +
              '<li>The instruction leaflet</li>' +
              '<li>The sample tube</li>' +
              '</ol>' +
              '<img src="https://static.vitl.com/assets/images/barcode-dna.jpg" width="100%" />';

      } else {

          body = '<p class="copy copy--medium mb-20 text-left">Your barcode is printed in several places within your kit</p><ol class="list list--ordered mb-30">' +
              '<li>The instruction leaflet</li>' +
              '<li>The sample request form</li>' +
              '</ol>' +
              '<img src="https://static.vitl.com/assets/images/barcode-blood.jpg" width="100%" />';

      }

      this.modalService.create(ModalTypes.InlinePage, {
          title: 'Finding your barcode',
          data: {
              body: body
          }
      });

  }

  explainPhone() {
      this.modalService.create(ModalTypes.InlinePage, {
          title: 'Why do we need this?',
          data: {
              body: '<p class="copy copy--medium mb-20">This will only be used to contact you in case of an anomalous result</p>'
          }
      });
  }

  viewSummary() {

      if (this.kitForm.controls['type'].value === 'dna') {

          this.modalService.create(ModalTypes.LargeInlinePage, {
              title: this.dnaInformedConsent.title,
              data: {
                  summary: this.dnaInformedConsent.description,
                  body: this.dnaInformedConsent.content
              }
          });

      } else {

          this.modalService.create(ModalTypes.LargeInlinePage, {
              title: this.dnaInformedConsent.title,
              data: {
                  summary: this.bloodInformedConsent.description,
                  body: this.dnaInformedConsent.content
              }
          });

      }


  }

  registerKit() {

      if (!this.accept) {

          this.modalService.alert('Please accept the terms and conditions');

      } else if (this.kitForm.valid) {

          this.globalService.startLoading();
          this.apiService.mutate(miscQueries.RegisterKit, this.kitForm.value).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
              this.globalService.stopLoading();
              window.scrollTo(0, 0);
              this.kitRegistered = {
                type: this.kitForm.value.type,
                typeLabel: (this.kitForm.value.type === 'dna' ? 'DNA' : 'Blood'),
                firstName: this.kitForm.value.firstName
              };
              setTimeout(() => {
                  this.anim.play();
              }, 250);
          }, () => this.globalService.stopLoading());

      } else {

          Object.values(this.kitForm.controls).forEach((control) => {
              control.markAsTouched({ onlySelf: true });
          });

          this.modalService.alert('Please correct form errors');

      }


  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
