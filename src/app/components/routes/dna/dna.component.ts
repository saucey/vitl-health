import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {SwiperComponent, SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {CartService} from '../../../services/cart.service';
import {ModalService, ModalTypes} from '../../../modules/modal/services/modal.service';
import {SegmentService} from '../../../services/segment.service';

@Component({
  selector: 'app-dna',
  templateUrl: './dna.component.html',
  styles: []
})
export class DnaComponent implements OnInit {

  product;
  transitionImages;
  transitionImagesMobile;
  traitCategories;
  activeFaqs = [];

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
    navigation: {
      nextEl: '#dna-s4--next-el',
      prevEl: '#dna-s4--prev-el'
    },
    breakpoints: {
      992: {
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
    navigation: {
      nextEl: '#dna-s5--next-el',
      prevEl: '#dna-s5--prev-el'
    },
    breakpoints: {
      992: {
        init: true,
        slidesPerView: 1,
        loop: true,
        followFinger: true
      },
    }
  };

  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private cartService: CartService,
    private modalService: ModalService,
    private segmentService: SegmentService,

  ) {
    this.product = this.route.snapshot.data.product;
    this.globalService.setTitle(this.product.pageTitle);
    this.globalService.setMetaTag({
      name: 'description',
      content: this.product.pageDescription
    });
  }

  ngOnInit() {
    this.segmentService.pageVisit("Product - DNA");
    this.transitionImages = [
      'https://static-prod.vitl.com/images/dna/dna-s3-c-1.png?width=470',
      'https://static-prod.vitl.com/images/dna/dna-s3-c-2.png?width=470',
      'https://static-prod.vitl.com/images/dna/dna-s3-c-3.png?width=470'
    ];

    this.transitionImagesMobile = [
      'https://static-prod.vitl.com/images/dna/dna-s3-c-1.png?width=270',
      'https://static-prod.vitl.com/images/dna/dna-s3-c-2.png?width=270',
      'https://static-prod.vitl.com/images/dna/dna-s3-c-3.png?width=270'
    ];

    this.traitCategories = [
      {
        imgDesktop: 'https://static-prod.vitl.com/images/dna/dna-s2-1.png?width=401&background=%fff9e0',
        imgTablet: 'https://static-prod.vitl.com/images/dna/dna-s2-1-tablet.png?width=401&background=%fff9e0',
        imgMobile: 'https://static-prod.vitl.com/images/dna/dna-s2-1-mobile.png?width=401&background=%fff9e0',
        reportsNumber: 16,
        modal: {
          title: 'Diet & Intolerance',
          text: 'Find out whether you’re likely to feel anxious after consuming caffeine, get a red face from drinking alcohol, or whether you’re likely to be gluten intolerant.',
          list1: [
            'Appetite & binge eating',
            'Use of dietary saturated fats',
            'Alcohol flush',
            'Gluten intolerance',
            'Sweet tooth dental decay',
          ],
          list2: [
            'Sweet tooth tendency',
            'Colon transfer',
            'IBS and GERD',
            'Fructosuria',
            'Caffeine-induced anxiety'
          ]
        }
      },
      {
        imgDesktop: 'https://static-prod.vitl.com/images/dna/dna-s2-2.png?width=401&background=%fff9e0',
        imgTablet: 'https://static-prod.vitl.com/images/dna/dna-s2-2-tablet.png?width=401&background=%fff9e0',
        imgMobile: 'https://static-prod.vitl.com/images/dna/dna-s2-2-mobile.png?width=401&background=%fff9e0',
        reportsNumber: 8,
        modal: {
          title: 'Hair & Skin',
          text: 'Such as how likely you are to experience acne, eczema, or get grey hair prematurely.',
          list1: [
            'Skin antioxidant capacity',
            'Premature greying (men)',
          ],
          list2: [
            'Acne',
            'Eczema',
          ]
        }
      },
      {
        imgDesktop: 'https://static-prod.vitl.com/images/dna/dna-s2-3.png?width=401&background=%fff9e0',
        imgTablet: 'https://static-prod.vitl.com/images/dna/dna-s2-3-tablet.png?width=401&background=%fff9e0',
        imgMobile: 'https://static-prod.vitl.com/images/dna/dna-s2-3-mobile.png?width=401&background=%fff9e0',
        reportsNumber: 3,
        modal: {
          title: 'Fitness',
          text: 'Such as whether you’re more likely to store fat or put on muscle, and how well you’re likely to be able to perform at speed and strength-based exercises.',
          list1: [
            'Glycotic capacity in strength training',
            'Lipid & glucose metabolism in speed sports',
            'Fat vs muscle composition'
          ],
        }
      },
      {
        imgDesktop: 'https://static-prod.vitl.com/images/dna/dna-s2-4.png?width=401&background=%fff9e0',
        imgTablet: 'https://static-prod.vitl.com/images/dna/dna-s2-4-tablet.png?width=401&background=%fff9e0',
        imgMobile: 'https://static-prod.vitl.com/images/dna/dna-s2-4-mobile.png?width=401&background=%fff9e0',
        reportsNumber: 10,
        modal: {
          title: 'Pregnancy',
          text: 'For women, you will be able to see how your weight is likely to change during pregnancy as well as how your vitamin levels are likely to be affected.',
          list1: [
            'Omega 3 & 6 during pregnancy',
            'Vitamin B12 in pregnancy'
          ],
          list2: [
            'Pregnancy weight',
            'Folate during pregnancy'
          ]
        }

      },
      {
        imgDesktop: 'https://static-prod.vitl.com/images/dna/dna-s2-5.png?width=401&background=%fff9e0',
        imgTablet: 'https://static-prod.vitl.com/images/dna/dna-s2-5-tablet.png?width=401&background=%fff9e0',
        imgMobile: 'https://static-prod.vitl.com/images/dna/dna-s2-5-mobile.png?width=401&background=%fff9e0',
        reportsNumber: 6,
        modal: {
          title: 'Sleep & Energy',
          text: 'See how well your body responds to caffeine, whether you’re likely to move about in your sleep or if you might have a tendency to grind your teeth at night.',
          list1: [
            'Caffeine metabolism',
            'Sleep bruxism'
          ],
          list2: [
            'Sleep behaviour',
            'Sleep movements'
          ]
        }
      },
      {
        imgDesktop: 'https://static-prod.vitl.com/images/dna/dna-s2-6.png?width=401&background=%fff9e0',
        imgTablet: 'https://static-prod.vitl.com/images/dna/dna-s2-6-tablet.png?width=401&background=%fff9e0',
        imgMobile: 'https://static-prod.vitl.com/images/dna/dna-s2-6-mobile.png?width=401&background=%fff9e0',
        reportsNumber: 17,
        modal: {
          title: 'Vitamin Levels',
          text: 'See how well your body is likely to be able to absorb vitamins and minerals, such as vitamin D, iron and vitamin C.',
          list1: [
            'Vitamin A',
            'Omega 3 & 6',
            'Vitamin B12',
            'Vitamin D',
            'Vitamin B6'
          ],
          list2: [
            'Vitamin E',
            'Vitamin C',
            'Iron Folate'
          ]
        }
      }
    ];
  }

  openCategoryModal(modalData) {
    this.modalService.create(ModalTypes.DNA, {
      title: modalData.title,
      titleDivider: false,
      data: modalData
    });
  }

  add() {
    this.globalService.startLoading();
     this.cartService.addPlan(this.product.plans[0], 1).then(() => {
      this.globalService.stopLoading();
      this.cartService.showCart();
    }, () => this.globalService.stopLoading());
  }

  toggleFaq(faqNumber: number) {
    const index = this.activeFaqs.indexOf(faqNumber);
    if (index > -1) {
      this.activeFaqs.splice(index, 1);
    } else {
      this.activeFaqs.push(faqNumber);
    }
  }
}
