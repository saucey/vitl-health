import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {KitRegistrationService} from '../../services/kit-registration.service';
import {GlobalService} from '../../../../services/global.service';
import {ModalService, ModalTypes} from '../../../modal/services/modal.service';
import {PageService} from '../../../../services/page.service';
import {ActivatedRoute} from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements AfterViewInit, OnDestroy {

    @ViewChild('userDetailsForm') userDetailsForm: NgForm;

    private dnaInformedConsent;
    private bloodInformedConsent;
    private account;
    termsAccepted = false;
    private ngUnsubscribe$ = new Subject();

    constructor(
        private kitRegistrationService: KitRegistrationService,
        private route: ActivatedRoute,
        private globalService: GlobalService,
        private pageService: PageService,
        private modalService: ModalService,
    ) {
        this.account = this.kitRegistrationService.account;
    }

    ngAfterViewInit(): void {

        this.pageService.getPage('dna-informed-consent').pipe(takeUntil(this.ngUnsubscribe$)).subscribe((page) => this.dnaInformedConsent = page);
        this.pageService.getPage('blood-informed-consent').pipe(takeUntil(this.ngUnsubscribe$)).subscribe((page) => this.bloodInformedConsent = page);

        setTimeout(_ => {
            this.userDetailsForm.controls['firstName'].setValue(this.account.firstName);
            this.userDetailsForm.controls['lastName'].setValue(this.account.lastName);
            this.userDetailsForm.controls['gender'].setValue(this.account.gender);
            this.userDetailsForm.controls['phone'].setValue(this.account.phone);
            this.userDetailsForm.controls['dob'].setValue(this.account.dob);
        });
    }

    onUserDetailsSubmit() {
        if (!this.termsAccepted) {
            this.modalService.alert('Please read and accept the informed consent document');
        } else {
            if (this.userDetailsForm.valid && this.userDetailsForm.controls['dob'].value) {
                this.kitRegistrationService.submitUserDetailsForm(this.userDetailsForm);
            } else {
                this.modalService.alert('Uh oh! Looks like something wasn\'t right. Please try again');
            }
        }
    }

    viewSummary() {
        let doc;

        if (this.kitRegistrationService.kit.code === 'dna') {
            doc = this.dnaInformedConsent;
        } else if (this.kitRegistrationService.kit.code === 'blood') {
            doc = this.bloodInformedConsent;

        }

        this.modalService.create(ModalTypes.LargeInlinePage, {
            title: doc.title,
            data: {
                summary: doc.description,
                body: doc.content
            }
        });
    }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
