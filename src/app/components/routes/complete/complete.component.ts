import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {ModalService} from '../../../modules/modal/services/modal.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styles: []
})
export class CompleteComponent implements OnInit {

  userId: string;
  token: string;

  @ViewChild('completeForm') completeForm: NgForm;

  constructor(
      private authService: AuthService,
      private router: Router,
      private globalService: GlobalService,
      private modalService: ModalService,
      private route: ActivatedRoute
  ) {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.token = this.route.snapshot.paramMap.get('token');
  }

  ngOnInit() {
    this.globalService.setTitle('Complete account set up');
    this.globalService.setMetaTag({ name: 'description', content: '' });
  }

  submit() {

    if (this.completeForm.value.password !== this.completeForm.value.password_confirm) {

      this.modalService.alert('Passwords do not match');

    } else if (this.completeForm.valid) {

      this.globalService.startLoading();
      this.authService.complete(this.userId, this.token, this.completeForm.value.password).then(
          () => this.router.navigateByUrl(this.authService.getPostLoginRedirect()),
          () => this.globalService.stopLoading()
      );

    } else {

      this.modalService.alert('Uh oh! Looks like something wasn\'t right please try again');

    }

  }

}
