import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-blood-old',
  templateUrl: './blood-old.component.html',
  styles: []
})
export class BloodOldComponent implements OnInit {

    product;

    constructor(
        private route: ActivatedRoute,
        private globalService: GlobalService
    ) {
        this.product = this.route.snapshot.data.product;
        this.globalService.setTitle(this.product.pageTitle);
        this.globalService.setMetaTag({
            name: 'description',
            content: this.product.pageDescription
        });
    }

    ngOnInit() {

    }

}
