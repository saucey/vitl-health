import { Component } from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  templateUrl: './bloodtestguide.component.html',
  styles: []
})
export class BloodTestGuideComponent {

    safeUrl;

    constructor(
        private globalService: GlobalService,
        private _sanitizer: DomSanitizer
    ) {
        this.globalService.setTitle("Blood test guide");
        this.globalService.setPageStyle("bloodtestguide");
        this.globalService.setMetaTag({
            name: 'description',
        });

        this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/7c2Fq9k3M')
    }
}
