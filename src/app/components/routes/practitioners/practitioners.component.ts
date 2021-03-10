import {AfterContentInit, Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './practitioners.component.html',
  styleUrls: [
    './css/tiny-slider.css',
    './css/style.css',
  ],
  styles: []
})
export class PractitionersComponent implements AfterContentInit {

  ngAfterContentInit() {
    // @ts-ignore
    import('tiny-slider/src/tiny-slider.js').then(

      tns => {
      console.log();
      const config = {
        container: '.owl-carousel',
        loop: true,
        nav: true,
        navPosition: 'bottom',
        controlsContainer: '#owl-nav',
        arrowKeys: true,
        mouseDrag: true,
        gutter: 20,
        edgePadding: 15,
        center: true,
        responsive: {
          0: {
            items: 1,
            nav: true,
            // gutter: 20,
            // edgePadding: 20,
          },
          769: {
            items: 2,
            center: false,
            gutter: 30,
            edgePadding: 17,
          }
        }
      };

      tns.tns(config);
    })
  }
}

