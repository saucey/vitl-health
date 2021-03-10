import {Directive, Input, OnInit, AfterContentInit, ElementRef, DoCheck, Renderer2, Inject, PLATFORM_ID, OnChanges} from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {GlobalService} from '../../../services/global.service';

@Directive({
  selector: '[appImage]'
})
export class AppImageDirective implements DoCheck, OnInit, AfterContentInit, OnChanges {

  @Input() appImage;
  @Input() category;
  @Input() key;
  @Input() width = 0;
  @Input() height = 0;
  @Input() widthLg;
  @Input() heightLg;
  @Input() colorize;
  @Input() truecolor;
  @Input() compress = false;
  @Input() contain = false;
  @Input() background;
  lg = false;
  error = false;
  isLoaded = false;
  constructor(
      public el: ElementRef,
      private breakPointObserver: BreakpointObserver,
      public globalService: GlobalService,
      public transferState: TransferState,
      private renderer: Renderer2,
      @Inject(PLATFORM_ID) public platformId: Object
  ) {
    this.breakPointObserver.observe(['(min-width: 768px)']).subscribe((state: BreakpointState) => this.lg = state.matches);

  }

  ngOnInit() {
    if (this.category && this.key) {
      console.log('whats this');
          this.getStaticImage().then((image) => this.appImage = image);
      }
      this.el.nativeElement.classList.add('lazyload');
      this.ngDoCheck();
  }

  ngAfterContentInit() {
      this.onError = this.onError.bind(this);
      this.renderer.listen(this.el.nativeElement, 'error', this.onError);
  }

  ngDoCheck() {
      this.widthLg = (undefined !== this.widthLg ? this.widthLg : this.width);
      this.heightLg = (undefined !== this.heightLg ? this.heightLg : this.height);
      if (this.appImage && this.appImage.url) {
          this.applyImage(this.getSrc(this.appImage), this.getSrcset(this.appImage));
      }
  }

  ngOnChanges() {
      this.widthLg = (undefined !== this.widthLg ? this.widthLg : this.width);
      this.heightLg = (undefined !== this.heightLg ? this.heightLg : this.height);
      if (this.appImage && this.appImage.url) {
          this.applyImage(this.getSrc(this.appImage), this.getSrcset(this.appImage));
      }
  }

  onError() {
      this.error = true;
  }

  getImageKey() {
      return makeStateKey<any>('image.' + this.category + '.' + this.key);
  }

  getStaticImage() {

      return new Promise((resolve) => {

          const IMAGE_STATE_KEY = this.getImageKey();
          const state = this.transferState.get<any>(IMAGE_STATE_KEY, null);

          if (state) {

              resolve(state);

          } else {

              this.globalService.initCall().subscribe(({data}) => {

                  let searchKey;

                  if (typeof this.key !== 'string') {
                      searchKey = this.key[Math.floor(Math.random() * this.key.length)];
                  } else {
                      searchKey = this.key;
                  }

                  const image = data.config[this.category].find(({key}) => key === searchKey);

                  if (image) {

                      this.transferState.onSerialize(IMAGE_STATE_KEY, () => {
                          return image.image;
                      });

                    console.log(image, 'the image');

                      resolve(image.image);

                  }

              });

          }

      });

  }

  getSrc(image, scale: number = 1) {

    const urlParts = image.url.split('.');

    urlParts[urlParts.length - 2] = urlParts[urlParts.length - 2] + '@' + scale + 'x';

    return this.addParams(urlParts.join('.'));

  }

  addParams(url) {

      const arr = [];

      if (this.lg) {
          arr.push('width=' + this.widthLg);
          arr.push('height=' + this.heightLg);
      } else {
          arr.push('width=' + this.width);
          arr.push('height=' + this.height);
      }

      if (this.colorize || this.truecolor || this.contain || this.background || this.compress) {

          if (this.colorize) {
              arr.push('colorize=' + encodeURIComponent(this.colorize));
          }

          if (this.truecolor) {
              arr.push('truecolor=true');
          }

          if (this.contain) {
              arr.push('contain=true');
          }

          if (this.compress) {
              arr.push('compress=1');
          }

          if (this.background) {
              arr.push('background=' + encodeURIComponent(this.background));
          }

      }

      return url + '?' + arr.join('&');

  }

  getSrcset(image) {
      // return this.getSrc(2) + ' 2x, ' + this.getSrc(3) + ' 3x';
      return this.getSrc(image, 2) + ' 2x';
  }

  applyImage(src, srcset) {
      if (!this.error) {
          if (!this.isLoaded) {
              this.el.nativeElement.classList.add('lazyload');
              this.isLoaded = true;
          }
          this.renderer.setAttribute(this.el.nativeElement, 'data-src', src);
          this.renderer.setAttribute(this.el.nativeElement, 'data-srcset', srcset);
      }
  }

}
