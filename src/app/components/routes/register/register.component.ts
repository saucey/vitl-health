import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {ModalService} from '../../../modules/modal/services/modal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') registerForm: NgForm;

  accept = false;

  constructor(
      private authService: AuthService,
      private router: Router,
      private globalService: GlobalService,
      private modalService: ModalService
  ) { }

  ngOnInit() {
      this.globalService.setTitle('Register');
      this.globalService.setMetaTag({ name: 'description', content: '' });
  }

  register() {

      if (!this.accept) {

          this.modalService.alert('Please accept the terms and conditions');

      } else if (this.registerForm.valid) {
          this.globalService.startLoading();
          this.authService.register(
              this.registerForm.value.firstName,
              this.registerForm.value.email,
              this.registerForm.value.password,
              'register'
          ).then(
              () => this.router.navigateByUrl(this.authService.getPostLoginRedirect()),
              () => this.globalService.stopLoading()
          );

      } else {

          this.modalService.alert('Uh oh! Looks like something wasn\'t right please try again');

      }

  }

}
