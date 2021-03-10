import { Component, OnDestroy, OnInit } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {ModalService, ModalTypes} from '../../../modules/modal/services/modal.service';
import {ModalComponent} from '../../../modules/modal/components/modal.component';
import {SegmentService} from '../../../services/segment.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.css']
})
export class BlogArticleComponent implements OnInit, OnDestroy {

  article;
  private ngUnsubscribe$ = new Subject();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private globalService: GlobalService,
        private modalService: ModalService,
        private segmentService: SegmentService
    ) {
        this.router.events.filter(event => event instanceof NavigationEnd).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
            this.article = this.route.snapshot.data.blogArticle;
            this.article.content = unescape(this.article.content);
            this.globalService.setTitle(this.article.title.replace(/&nbsp;/gm, ' '), 'Vitl life');
            this.globalService.setMetaTag({
                name: 'description',
                content: this.article.summary
            });
        });
    }

    ngOnInit() {
      this.segmentService.pageVisit('Blog article - ' + this.article.title);
    }

    ngOnDestroy() {
      this.ngUnsubscribe$.next();
      this.ngUnsubscribe$.complete();
    }

    registerNewsletter() {

        this.modalService.create(ModalTypes.Input, {
            title: 'Please enter your email address to receive our weekly newsletter',
            data: {
                value: '',
                placeholder: 'Email address'
            },
            ctas: [
                { label: 'Submit' }
            ],
            callback: (modal: ModalComponent, email: string) => {
                if (email) {
                    this.globalService.registerNewsletter(email).then(() => {
                        modal.close();
                    });
                } else {
                    this.modalService.alert('Email address is not valid');
                }
            }
        });

    }

}
