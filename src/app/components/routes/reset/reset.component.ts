import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {ModalService} from '../../../modules/modal/services/modal.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styles: []
})
export class ResetComponent implements OnInit {

  userId: string;
  token: string;

  @ViewChild('resetForm') resetForm: NgForm;

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
      this.globalService.setTitle('Reset password');
      this.globalService.setMetaTag({ name: 'description', content: '' });
  }

  submit() {

      if (this.resetForm.value.password !== this.resetForm.value.password_confirm) {

          this.modalService.alert('Passwords do not match');

      } else if (this.resetForm.valid) {

          this.globalService.startLoading();
          this.authService.reset(this.userId, this.token, this.resetForm.value.password).then(
              () => this.router.navigateByUrl(this.authService.getPostLoginRedirect()),
              () => this.globalService.stopLoading()
          );

      } else {

          this.modalService.alert('Uh oh! Looks like something wasn\'t right please try again');

      }

  }

}
