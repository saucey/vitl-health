import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {ActivatedRoute, Router} from '@angular/router';
import {KitRegistrationService} from '../services/kit-registration.service';
import {AccountService} from '../../../services/account.service';
import {User} from '../../../classes/user';
import {AuthService} from '../../../services/auth.service';
import {SegmentService} from '../../../services/segment.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-kit-register-layout',
    templateUrl: './kit-register-layout.component.html',
})
export class KitRegisterLayoutComponent implements OnInit, OnDestroy {

  private user;
  private ngUnsubscribe$ = new Subject();

    constructor(
        private globalService: GlobalService,
        private router: Router,
        private kitRegistrationService: KitRegistrationService,
        private authService: AuthService,
        private segmentService: SegmentService,
    ) {
        this.authService.getUser().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((user) => {
            this.user = user;
        });
    }

    ngOnInit() {
      this.segmentService.pageVisit('Register kit');
      this.globalService.setTitle('Register your Vitl test kit here');
        this.globalService.setMetaTag(
            {
                name: 'description',
                content: 'Register your Vitl DNA Nutrition Test or Vitamin Blood Test here for free before you send back your sample for analysis'
            });
        this.kitRegistrationService.resetState();
        this.router.navigateByUrl('/kit');
    }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

    get kit() {
        return this.kitRegistrationService.kit;
    }

    get email() {
        if (this.kit && this.barcode && this.user) {
            return this.user.email;
        }
    }

    get barcode() {
        return this.kitRegistrationService.barcode;
    }
}
