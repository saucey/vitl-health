import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-type-image-slider',
  templateUrl: './block-type-image-slider.component.html',
  styles: []
})
export class BlockTypeImageSliderComponent implements OnInit {

  swiperConfig = {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true
  };

  @Input() block;

  constructor() { }

  ngOnInit() {
  }

}
