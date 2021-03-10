import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {ModalService} from '../../../modules/modal/services/modal.service';
import {SegmentService} from '../../../services/segment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;

  constructor(
      private authService: AuthService,
      private router: Router,
      private globalService: GlobalService,
      private modalService: ModalService,
      private segmentService: SegmentService,
  ) { }

  ngOnInit() {
    this.segmentService.pageVisit("Login");
    this.globalService.setTitle('Login');
      this.globalService.setMetaTag({ name: 'description', content: '' });
  }

  get email() {
    return this.loginForm.value.email;
  }

  onForgotClick() {
      this.globalService.email = this.email;
  }

  login() {

    if (this.loginForm.valid) {

        this.globalService.startLoading();
        this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then(
            () => this.router.navigateByUrl(this.authService.getPostLoginRedirect()),
            () => this.globalService.stopLoading()
        );

    } else {

        this.modalService.alert('Uh oh! Looks like something wasn\'t right please try again');

    }

  }

}
