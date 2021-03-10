import {
Component,
OnInit,
    ViewContainerRef,
    Inject,
    PLATFORM_ID,
    NgZone,
    Renderer2,
    ViewChild,
    ElementRef, AfterViewChecked, OnDestroy
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';
import {ApiService} from './services/api.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import {GlobalService} from './services/global.service';
import {LiveChatService} from './services/live-chat.service';
import {WindowRef} from './services/windowref.service';

import {ModalService} from './modules/modal/services/modal.service';
import { AuthService } from './services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('loader') loaderElement: ElementRef;
  private ngUnsubscribe$ = new Subject();

  title = 'Vitl';
  goal: Observable<any>;
  canonicalLink: HTMLLinkElement;

  lottieConfig = {
      path: 'https://static.vitl.com/assets/loader.json',
      autoplay: true,
      loop: true
  };

  public constructor(
      private modalService: ModalService,
      private viewContainerRef: ViewContainerRef,
      private router: Router,
      private api: ApiService,
      private authService: AuthService,
      private globalService: GlobalService,
      private liveChatService: LiveChatService,
      private windowRef: WindowRef,
      private ngZone: NgZone,
      private renderer: Renderer2,
      @Inject(PLATFORM_ID) private platformId: Object,
      @Inject(DOCUMENT) private doc
  ) {

    modalService.setRootViewContainerRef(viewContainerRef);

    this.canonicalLink = this.doc.createElement('link');
    this.canonicalLink.setAttribute('rel', 'canonical');
    this.doc.head.appendChild(this.canonicalLink);

    this.globalService.events.filter(event => event.type === 'titleSet').pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => this.setOgTitles(event.data.title));

    this.globalService.events.filter(event => event.type === 'metaSet' && event.data.name === 'description').pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => this.setOgDescriptions(event.data.content));

  }

  ngOnInit() {

    this.router.events.filter(event => event instanceof NavigationEnd).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((evt) => {
        this.canonicalLink.setAttribute('href', this.doc.URL);
        this.globalService.setMetaTag({ property: 'og:url', content: this.doc.URL });
        if (isPlatformBrowser(this.platformId)) {
            this.windowRef.nativeWindow.scrollTo(0, 0);
        }
    });

    this.globalService.events.filter(event => event.type === 'loading').pipe(takeUntil(this.ngUnsubscribe$)).subscribe((event) => {
        this.ngZone.runOutsideAngular(() => {
           if (event.data.status) {
               this.renderer.addClass(this.loaderElement.nativeElement, 'active');
           } else {
               this.renderer.removeClass(this.loaderElement.nativeElement, 'active');
           }
        });
    });
  }

  setOgTitles(title: string) {
    this.globalService.setMetaTag({ name: 'twitter:title', content: title });
    this.globalService.setMetaTag({ property: 'og:title', content: title });
    this.globalService.setMetaTag({ name: 'apple-mobile-web-app-title', content: title });
  }

  setOgDescriptions(description: string) {
    this.globalService.setMetaTag({ name: 'twitter:description', content: description });
    this.globalService.setMetaTag({ property: 'og:description', content: description });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
