import {Directive, DoCheck, ElementRef, Input, OnChanges} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Directive({
  selector: '[appStyle]'
})
export class StyleDirective implements DoCheck {

  baseFontSize = 14;
  actualFontSize = 14;

  @Input() appStyle;

  constructor(private el: ElementRef, private breakPointObserver: BreakpointObserver) {
      this.breakPointObserver.observe(['(min-width: 992px)']).subscribe((state: BreakpointState) => {
          this.actualFontSize = (state.matches ? 24 : 14);
      });
  }

  ngDoCheck() {

    const elementStyle = this.el.nativeElement.style;

    if (this.appStyle) {

        elementStyle['font-size'] = ((this.appStyle.font_size / this.baseFontSize) * this.actualFontSize) + 'px';
        elementStyle['font-weight'] = this.appStyle.font_weight;
        elementStyle['text-align'] = this.appStyle.text_align;
        elementStyle['color'] = this.appStyle.text_color;
        elementStyle['background-color'] = this.appStyle.background_color;
        elementStyle['border-color'] = this.appStyle.border_color;
        elementStyle['border-width'] = this.appStyle.border_width;

    }







          // if(scope.style.border_color) {
          //     element.css("border-style", "solid");
          //     element.css("border-color", scope.style.border_color);
          //     element.css("border-width", "1 px");
          // }
          //
          // if(scope.style.border_width) {
          //     element.css("border-style", "solid");
          //     element.css("border-width", scope.style.border_width + "px");
          // }

  }

}
