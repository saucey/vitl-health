import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {ModalService} from '../../../modules/modal/services/modal.service';
import {SegmentService} from '../../../services/segment.service';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styles: []
})
export class ForgotComponent implements OnInit, AfterViewInit {

    emailSent = false;

    lottieConfig = {
        path: 'https://static.vitl.com/assets/tick.json',
        autoplay: false,
        loop: false,
        speed: 2
    };

    @ViewChild('forgotForm') forgotForm: NgForm;

    private anim: any;

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private globalService: GlobalService,
        private modalService: ModalService,
        private segmentService: SegmentService
    ) {
    }

    ngOnInit() {
      this.segmentService.pageVisit('Forgot password');
      this.globalService.setTitle('Forgot password');
        this.globalService.setMetaTag({name: 'description', content: ''});


    }

    ngAfterViewInit() {
        const interval = setInterval(_ => {
            if (typeof this.forgotForm.controls['email'] !== 'undefined') {
                this.forgotForm.controls['email'].setValue(this.globalService.email);
                clearInterval(interval);
            }
        });
    }

    handleAnimation(anim: any) {
        this.anim = anim;
    }

    submit() {

        if (this.forgotForm.valid) {
            this.globalService.startLoading();
            this.authService.forgot(this.forgotForm.value.email).then(
                () => {
                    this.globalService.stopLoading();
                    this.emailSent = true;
                    setTimeout(() => {
                        this.anim.play();
                    }, 250);
                },
                () => this.globalService.stopLoading()
            );
        } else {
            this.modalService.alert('Uh oh! Looks like something wasn\'t right please try again');
        }

    }

}
