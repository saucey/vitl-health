import { Directive, Input, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appGradientBars]'
})
export class GradientBarsDirective implements OnInit {

  @Input() appGradientBars;

  constructor(private el: ElementRef) { }

  ngOnInit() {

    if (this.appGradientBars) {

      const breakpoints = this.appGradientBars.map((bar, index) => {
        return bar + ' ' + ((index / (this.appGradientBars.length - 1)) * 100) + '%';
      });

      this.el.nativeElement.style['background'] = 'linear-gradient(to right, ' + breakpoints.join(',') + ')';

    }

  }

}
