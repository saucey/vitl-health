import { Directive, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Directive({
  selector: '[appRecommendationScore]'
})
export class RecommendationScoreDirective implements OnInit, AfterViewInit {

  @Input() appRecommendationScore;
  @Input() baseFillColor = '#c7c7c7';
  @Input() strokeFillColor = '#FFD326';
  @Input() numCircles = 12;

  ctx: CanvasRenderingContext2D;

  width: number;
  height = 5;
  progress = 0;
  fps = 30;
  length = 1000;

  constructor(private el: ElementRef, private breakPointObserver: BreakpointObserver) {}

  ngOnInit() {

  }

  ngAfterViewInit() {

      this.breakPointObserver.observe(['(min-width: 1201px)']).subscribe((state: BreakpointState) => {
          const width = (state.matches ? 623 : 300);
          this.ctx = this.el.nativeElement.getContext('2d');
          this.ctx.canvas.width = width;
          this.ctx.clearRect(0, 0, this.width, this.height);
          this.drawBase(width);
          this.animateScore(width);
      });

  }

  animateScore(width: number) {

      this.drawScore(width);
      window.setTimeout(() => {
          if (this.progress < 1) {
              this.progress += (1.0 / (this.length / this.fps));
              this.animateScore(width);
          }
      }, 1000 / this.fps);

  }

  drawBase(width: number) {

      let x, y;
      this.ctx.beginPath();
      this.ctx.fillStyle = this.baseFillColor;
      for (let i = 0; i <= this.numCircles; i++) {
        x = (width * (i / this.numCircles)) + ((-1.25 * i) + 2.5);
        y = 2.5;
        this.ctx.moveTo(x, y);
        this.ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      }
      this.ctx.fill();

  }

  drawScore(width: number) {

      const value = this.getProg() * this.appRecommendationScore;
      this.ctx.beginPath();
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = this.strokeFillColor;
      this.ctx.lineWidth = 5;
      this.ctx.moveTo(2.5, 2.5);
      this.ctx.lineTo(width * value, 2.5);
      this.ctx.stroke();

  }

  getProg() {
      let t = this.progress;
      const d = 1.0, c = 1.0, b = 0;
      if ((t /= d / 2) < 1) {
          return c / 2 * t * t + b;
      } else {
          return -c / 2 * ((--t) * ( t - 2) - 1) + b;
      }
  }

}
