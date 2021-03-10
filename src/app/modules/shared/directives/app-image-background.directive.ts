import { Directive, Input, OnInit, DoCheck } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import {AppImageDirective} from './app-image.directive';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appImageBackground]'
})
export class AppImageBackgroundDirective extends AppImageDirective implements OnInit, DoCheck {

  @Input() appImageBackground;

  ngOnInit() {

      if (this.category && this.key) {
          this.getStaticImage().then((image) => this.appImageBackground = image);
      }

      this.ngDoCheck();

  }

  ngDoCheck() {

      this.widthLg = (undefined !== this.widthLg ? this.widthLg : this.width);
      this.heightLg = (undefined !== this.heightLg ? this.heightLg : this.height);

      let retina = false;
      if (isPlatformBrowser(this.platformId)) {
          retina = (window.devicePixelRatio > 1 ? true : false);
      }

      if (this.appImageBackground && this.appImageBackground.url) {
          this.applyImage(this.getSrc(this.appImageBackground, (retina ? 2 : 1)));
      }

  }

  getImageKey() {
      return makeStateKey<any>('image.background.' + this.category + '.' + this.key);
  }

  applyImage(src) {
      this.el.nativeElement.style['background-image'] = 'url(' + src + ')';
  }

}
