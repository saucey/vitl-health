import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-type-carousel',
  templateUrl: './block-type-carousel.component.html',
  styles: []
})
export class BlockTypeCarouselComponent implements OnInit {

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
