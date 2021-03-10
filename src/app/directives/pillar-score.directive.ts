import { Directive, Input, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPillarScore]'
})
export class PillarScoreDirective implements OnInit {

  @Input() appPillarScore;

  ctx: CanvasRenderingContext2D;
  fps = 60;
  length = 3000;
  progress = 0;
  d = 190;
  r: number;
  cx: number;
  cy: number;
  radians = 0.01745329252;
  numCircles = 48;
  baseFillColor = 'rgba(255,255,255,0.5)';
  arcStrokeColor = 'rgba(255,255,255,1)';
  arcEndColor = 'rgba(255,255,255,1)';

  constructor(private el: ElementRef) {}

  ngOnInit() {

    this.ctx = this.el.nativeElement.getContext('2d');

    this.r = (this.d / 2) - 6;
    this.cx = this.d / 2;
    this.cy = this.d / 2;

    this.animateScore();

  }

  animateScore() {

    this.ctx.clearRect(0, 0, 200, 200);
    this.drawBase();
    this.drawArc();
    window.setTimeout(() => {
      if (this.progress < 1) {
        this.progress += (1.0 / (this.length / this.fps));
        this.animateScore();
      }
    }, 1000 / this.fps);

  }

  drawBase() {

      this.ctx.beginPath();
      this.ctx.fillStyle = this.baseFillColor;
      for (let i = 0 ; i < this.numCircles ; i++) {
          let x = this.cx + this.r * Math.cos((i / this.numCircles) * 360 * this.radians);
          let y = this.cy + this.r * Math.sin((i / this.numCircles) * 360 * this.radians);
          this.ctx.moveTo(x, y);
          this.ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      }
      this.ctx.fill();

  }

  drawArc() {

      const value = this.getProg() * this.appPillarScore;

      this.ctx.moveTo(this.cx, this.cy);
      this.ctx.beginPath();
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = this.arcStrokeColor;
      this.ctx.lineWidth = 5;
      this.ctx.arc(this.cx, this.cy, this.r, Math.PI * -0.5, Math.PI * ((value * 2) - 0.5));
      this.ctx.stroke();

      this.ctx.moveTo(this.cx, this.cy);
      this.ctx.beginPath();
      this.ctx.fillStyle = this.arcEndColor;
      let x = this.cx + this.r * Math.cos(((value * 360) - 90) * this.radians);
      let y = this.cy + this.r * Math.sin(((value * 360) - 90) * this.radians);
      this.ctx.arc(x, y, 6, 0, Math.PI * 2);
      this.ctx.fill();

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
