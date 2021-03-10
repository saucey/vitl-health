import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appButtonLoader]'
})
export class ButtonLoaderDirective implements OnChanges {

  @Input() appButtonLoader: string;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appButtonLoader.currentValue) {
      this.el.nativeElement.disabled = true;
      this.el.nativeElement.classList.add('button--loading');
    } else {
      this.el.nativeElement.disabled = false;
      this.el.nativeElement.classList.remove('button--loading');
    }
  }

}
