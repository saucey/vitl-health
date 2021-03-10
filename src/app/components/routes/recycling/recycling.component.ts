import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';

@Component({
    selector: 'app-recycling',
    templateUrl: './recycling.component.html',
    styles: []
})
export class RecyclingComponent implements OnInit {

    beforeStartingImages;
    stepOneImages;
    stepTwoImages;
    stepThreeImages;

    constructor(
        private globalService: GlobalService,
    ) {
    }

    ngOnInit() {
        this.globalService.setTitle('Recycle');
        this.globalService.setMetaTag({
            name: 'description',
            content: 'Recycling your Vitl box'
        });

        this.beforeStartingImages = [
            'https://static-prod.vitl.com/assets/images/recycling/step0-1.jpg?width=720',
            'https://static-prod.vitl.com/assets/images/recycling/step0-2.jpg?width=720'
        ];

        this.stepOneImages = [
            'https://static-prod.vitl.com/assets/images/recycling/step1-1.jpg?width=720',
            'https://static-prod.vitl.com/assets/images/recycling/step1-2.jpg?width=720',
            'https://static-prod.vitl.com/assets/images/recycling/step1-3.jpg?width=720'
        ];

        this.stepTwoImages = [
            'https://static-prod.vitl.com/assets/images/recycling/step2-1.jpg?width=720',
            'https://static-prod.vitl.com/assets/images/recycling/step2-2.jpg?width=720',
            'https://static-prod.vitl.com/assets/images/recycling/step2-3.jpg?width=720'
        ];

        this.stepThreeImages = [
            'https://static-prod.vitl.com/assets/images/recycling/step3-1.jpg?width=720',
            'https://static-prod.vitl.com/assets/images/recycling/step3-2.jpg?width=720',
            'https://static-prod.vitl.com/assets/images/recycling/step3-3.jpg?width=720'
        ];
    }
}
