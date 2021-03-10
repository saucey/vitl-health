import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../../services/global.service';
import { SegmentService } from '../../../../services/segment.service';

@Component({
  selector: 'app-compare-personalised-products',
  templateUrl: './compare-personalised-products.component.html',
    styles: []
})
export class ComparePersonalisedProductsComponent {

  personalisedPlus = null;
  essentialOne = null;
  content = [
    {
      pp: 'Personalised to you',
      teo: 'Personalised to you'
    },
    {
      pp: '28-day supply',
      teo: '30-day supply'
    },
    {
      pp: '4 supplements per day',
      teo: '1 supplement per day'
    },
    {
      pp: 'Provides vitamins, minerals, superfood extracts and adaptogenic herbal extracts',
      teo: 'Provides just the specific vitamins & minerals your body needs'
    },
    {
      pp: 'Non-GMO and free from fillers, artificial colours and  preservatives',
      teo: 'Non-GMO and free from synthetic fillers, artificial colours and preservatives'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private segmentService: SegmentService
  ) {
    if (this.route.snapshot.data.mainNav) {
      this.segmentService.pageVisit('Compare personalised vitamins');
      this.globalService.setTitle('Compare personalised vitamins');
      this.globalService.setMetaTag({
          name: 'description',
          content: 'Compare personalised vitamins'
      });
    }

    if (this.route.snapshot.data.products) {
      this.personalisedPlus = this.route.snapshot.data.products[0];
      this.essentialOne = this.route.snapshot.data.products[1];
    }
  }

}
