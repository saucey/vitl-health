import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {GlobalService} from '../../../services/global.service';
import {User} from '../../../classes/user';
import {SegmentService} from '../../../services/segment.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  user: User;
  faqCategories = ['About Us', 'Orders & Delivery', 'Vitamins', 'DNA', 'Blood'];
  selectedFAQCategory = this.faqCategories[0];
  faqs = {};
  activeExpandItem = -1;
  private ngUnsubscribe$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private globalService: GlobalService,
    private segmentService: SegmentService,
    ) {
      const faqData = this.route.snapshot.data.faqs;

      for (const category of this.faqCategories) {
        this.faqs[category] = faqData.filter(faq => faq.category === category);
      }
    }

  ngOnInit() {
    this.segmentService.pageVisit('Contact');
    this.globalService.setTitle('Contact us');
    this.globalService.setMetaTag({
      name: 'description',
      content: 'Read our FAQs and find out how to get in touch - whether it\'s help with your subscription, a question or simply want to say hello, we\'d love to hear from you'
    });

    this.authService.loadUser().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((user) => {
      this.user = user;
    });

  }

  toggleExpand(val: number) {
    this.activeExpandItem = this.activeExpandItem !== val ? val : -1;
  }

  toggleTab(val) {
    this.selectedFAQCategory = val;

    this.toggleExpand(-1);
  }

  loadLivechat() {
    this.globalService.emitEvent('showLiveChat');
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
}

}
