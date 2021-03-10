import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {SwiperComponent, SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {CartService} from '../../../services/cart.service';
import {ModalService, ModalTypes} from '../../../modules/modal/services/modal.service';

@Component({
    selector: 'app-blood',
    templateUrl: './blood.component.html',
    styles: []
})
export class BloodComponent implements OnInit {

    product;
    transitionImages;
    transitionImagesMobile;

    carouselConfig: SwiperConfigInterface = {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: false,
        init: true,
        followFinger: false,
        pagination: {
            el: '.blood-s4-carousel-slide-dots',
            type: 'bullets',
            bulletClass: 'carousel-dot',
            bulletActiveClass: 'is-active',
            clickable: true
        },
        breakpoints: {
            992: {
                init: true,
                slidesPerView: 2,
                loop: true,
                followFinger: true
            },
            768: {
                slidesPerView: 1,
                loop: true,
                followFinger: true
            },
        }
    };

    carousel2Config: SwiperConfigInterface = {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: false,
        init: true,
        followFinger: false,
        pagination: {
            el: '.blood-s5-carousel-slide-dots',
            type: 'bullets',
            bulletClass: 'carousel-dot',
            bulletActiveClass: 'is-active',
            clickable: true
        },
        breakpoints: {
            992: {
                init: true,
                slidesPerView: 2,
                loop: true,
                followFinger: true
            },
            768: {
                slidesPerView: 1,
                loop: true,
                followFinger: true
            }
        }
    };

    @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
    constructor(
        private route: ActivatedRoute,
        private globalService: GlobalService,
        private cartService: CartService,
        private modalService: ModalService
    ) {
        this.product = this.route.snapshot.data.product;
        this.globalService.setTitle(this.product.pageTitle);
        this.globalService.setMetaTag({
            name: 'description',
            content: this.product.pageDescription
        });
    }

    ngOnInit() {
        this.transitionImages = [
            'https://static.vitl.com/images/blood/blood-hero-1-desktop.png?width=400&compress=1',
            'https://static.vitl.com/images/blood/blood-hero-2-desktop.png?width=400&compress=1',
            'https://static.vitl.com/images/blood/blood-hero-3-desktop.png?width=400&compress=1',
        ];

        this.transitionImagesMobile = [
            'https://static-prod.vitl.com/images/blood/blood-hero-1-mobile.png?width=501&compress=1',
            'https://static-prod.vitl.com/images/blood/blood-hero-2-mobile.png?width=501&compress=1',
            'https://static-prod.vitl.com/images/blood/blood-hero-3-mobile.png?width=501&compress=1',
        ];
    }

    openVitLevelsModal() {
        const listItems = [
            {
                imgSrc: 'https://static.vitl.com/assets/images/blood/D.png',
                header: 'Vitamin D',
                paragraph: 'Healthy bones & immune system'
            },
            {
                imgSrc: 'https://static.vitl.com/assets/images/blood/Fe.png',
                header: 'Ferritin (Iron)',
                paragraph: 'Red blood cell production'
            },
            {
                imgSrc: 'https://static.vitl.com/assets/images/blood/Zn.png',
                header: 'Zinc',
                paragraph: 'Energy and hormone support'
            },
            {
                imgSrc: 'https://static.vitl.com/assets/images/blood/B12.png',
                header: 'Active B12',
                paragraph: 'Energy and nervous systems'
            },
            {
                imgSrc: 'https://static.vitl.com/assets/images/blood/B9.png',
                header: 'Folate',
                paragraph: 'Red blood cell production'
            },
        ];
        this.modalService.create(ModalTypes.Blood, {
            title: 'Vitamin levels',
            titleDivider: false,
            data: {
                listItems: listItems
            }
        });
    }

    openCholesterolModal() {
        const listItems = [
            {
                imgSrc: 'https://static.vitl.com/assets/images/blood/TG.png',
                header: 'Triglycerides',
            },
            {
                imgSrc: 'https://static.vitl.com/assets/images/blood/TC.png',
                header: 'Total Cholesterol',
            },
            {
                imgSrc: 'https://static.vitl.com/assets/images/blood/HDL.png',
                header: 'HDL Cholesterol',
            },
            {
                imgSrc: 'https://static.vitl.com/assets/images/blood/LDL.png',
                header: 'LDL Cholesterol',
            },
            {
                imgSrc: 'https://static.vitl.com/assets/images/blood/HDL_LDL.png',
                header: 'Cholesterol Ratio',
            },
        ];
        this.modalService.create(ModalTypes.Blood, {
            title: 'Cholesterol',
            titleDivider: false,
            data: {
                listItems: listItems
            }
        });
    }


    add() {
        this.globalService.startLoading();

        this.cartService.addPlan(this.product.plans[0], 1).then(() => {
            this.globalService.stopLoading();
            this.cartService.showCart();
        }, () => this.globalService.stopLoading());
    }
}
