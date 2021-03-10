import {Component, ViewChild} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {ModalService} from '../../../modules/modal/services/modal.service';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: './black-friday.component.html',
})
export class BlackFridayComponent {
  @ViewChild('emailForm') emailForm: NgForm;
  accept = false;

  constructor(
    private globalService: GlobalService,
    private modalService: ModalService,
  ) {
    this.globalService.setTitle('Black Friday 2019');
    this.globalService.setMetaTag({
      name: 'description',
    });
  }

  scroll() {

    let coords = document.getElementById('formHeader').getBoundingClientRect();

    window.scrollTo(0, coords.top);
  }

  submitForm() {
    if (!this.accept) {
      this.modalService.alert('Please tick to confirm you are happy to join the Vitl mailing list.');
    } else if (this.emailForm.valid) {
      window.analytics.identify({
        email: this.emailForm.value.email
      }, () => {
        window.analytics.track('Lead gen', {
          recipient: this.emailForm.value.email
        });
      });

      this.modalService.success("Please check your inbox!")
    } else {
      this.modalService.alert('There was an issue with the email address. Please try again');
    }
  }
}
