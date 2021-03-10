import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {SwiperComponent, SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {CartService} from '../../../services/cart.service';
import {ModalService, ModalTypes} from '../../../modules/modal/services/modal.service';

@Component({
    selector: 'app-dna',
    templateUrl: './dna-alt.component.html',
    styles: []
})
export class DnaAltComponent implements OnInit {

    product;
    plan;
    transitionImages;
    transitionImagesMobile;
    activeFaq = 1;

    carouselConfig: SwiperConfigInterface = {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: false,
        init: true,
        followFinger: false,
        pagination: {
            el: '.dna-s4-carousel-slide-dots',
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
            el: '.dna-s5-carousel-slide-dots',
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
        this.plan = this.route.snapshot.data.plan;
        this.globalService.setTitle(this.product.pageTitle);
        this.globalService.setMetaTag({
            name: 'description',
            content: this.product.pageDescription
        });
    }

    ngOnInit() {
        this.transitionImages = [
            'https://static-prod.vitl.com/assets/images/dna-s2-img1.png?height=775&compress=1',
            'https://static-prod.vitl.com/assets/images/dna-s2-img2.png?height=775&compress=1',
            'https://static-prod.vitl.com/assets/images/dna-s2-img3.png?height=775&compress=1'
        ];

        this.transitionImagesMobile = [
            'https://static-prod.vitl.com/assets/images/dna-s2-img1--m.png?height=275&compress=1',
            'https://static-prod.vitl.com/assets/images/dna-s2-img2--m.png?height=275&compress=1',
            'https://static-prod.vitl.com/assets/images/dna-s2-img3--m.png?height=275&compress=1'
        ];
    }

    openDietModal() {
        const listItems = [
            'Alcohol, caffeine & dietary fat metabolism',
            'Fructosuria',
            'Gluten Intolerance',
            'Sweet tooth, glucose levels & sugar-related tooth decay',
            'Colon transfer',
            'Metabolic rate',
            'Appetite & tendency to binge eat',
            'IBS & GERD'
        ];
        this.modalService.create(ModalTypes.DNA, {
            title: 'Diet',
            titleDivider: false,
            data: {
                listItems: listItems
            }
        });
    }

    openLifestyleModal() {
        const listItems = [
            'Energy Levels',
            'Stress & anxiety',
            'Sleep behaviours, sleep movements, bruxism',
            'Premature grey hair',
            'Acne, eczema & skin antioxidant capacity',
            'Absorption of vitamins, minerals and omega 3 & 6',
            'Pregnancy & fertility tendencies',
        ];
        this.modalService.create(ModalTypes.DNA, {
            title: 'Lifestyle',
            titleDivider: false,
            data: {
                listItems: listItems
            }
        });
    }

    openFitnessModal() {
        const listItems = [
            'Fat vs muscle composition',
            'Lipid and glucose metabolism',
            'Glycolic capacity in strength training',
        ];
        this.modalService.create(ModalTypes.DNA, {
            title: 'Fitness',
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
