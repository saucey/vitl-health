import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../services/global.service';
import {ApiService} from '../../../services/api.service';
import {GetRecommendedProducts, GetReferralCode} from '../../../queries/user';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  @ViewChild('referralCodeInput') referralCodeInput: ElementRef;

  confirmation;
  private anim: any;
  recommendedProduct: any;
  referralCode: any;
  recommendationsReady = false;
  showReferral = false;
  bottleName = '';
  bottleNames = [
      'Christopher\'s',
      'Sarah\'s',
      'James\'',
      'Laura\'s',
      'David\'s',
      'Gemma\'s',
      'Daniel\'s',
      'Emma\'s',
      'Michael\'s',
      'Rebecca\'s',
      'Matthew\'s',
      'Claire\'s',
      'Andrew\'s',
      'Victoria\'s',
      'Richard\'s',
      'Samantha\'s',
      'Paul\'s',
      'Rachel\'s',
      'Mark\'s',
      'Amy\'s'
  ];

  lottieConfig = {
      path: 'https://static.vitl.com/assets/tick.json',
      autoplay: false,
      loop: false,
      speed: 2
  };

  constructor(
      private route: ActivatedRoute,
      private globalService: GlobalService,
      private apiService: ApiService
  ) {
      this.confirmation = this.route.snapshot.data.confirmation;
  }

  handleAnimation(anim: any) {
      this.anim = anim;
  }

  ngOnInit() {
      this.loadRecommendations();
      this.globalService.setTitle('Order confirmation');
      this.globalService.setMetaTag({ name: 'description', content: '' });
      setTimeout(() => {
          this.anim.play();
      }, 250);
  }

  copyReferralCode() {

    this.referralCodeInput.nativeElement.select();
    document.execCommand('copy');
    alert('Copied to clipboard');

  }

  loadRecommendations() {

      if (this.globalService.isBrowser()) {
          Promise.all([
              this.getRecommendedProduct(),
              this.getReferralCode()
          ]).then(value => {
              this.recommendedProduct = value[0];
              this.referralCode = value[1];
              this.showReferral = (this.confirmation.items.filter(item => item.plan.product.grouping === 'essential-one').length ? true : false);
              this.recommendationsReady = true;
              this.loadBottleName();
          });
      }

  }

  getRecommendedProduct() {
      return this.apiService.query(GetRecommendedProducts).toPromise().then(({data : { user: { recommendedProducts } }}) => {
          return (recommendedProducts ? recommendedProducts[0] : null);
      });
  }

  getReferralCode() {
      return this.apiService.query(GetReferralCode).toPromise().then(({data : { user: { referralCode } }}) => referralCode);
  }

  loadBottleName(nameIndex: number = 0) {
      this.displayName(this.bottleNames[nameIndex]).then(() => {
         if (this.bottleNames[nameIndex + 1]) {
             this.loadBottleName(nameIndex + 1);
         } else {
             this.loadBottleName();
         }
      });
  }

  displayName(name: string) {
      return new Promise(resolve => {
          this.typeName(name).then(() => {
              this.removeName(name).then(() => {
                  resolve(true);
              });
          });
      });
  }

  typeName(name: string) {
      return new Promise(resolve => {
          let length = 1;
          this.bottleName = name.slice(0, length);
          const interval = setInterval(() => {
              length++;
              if (length <= name.length) {
                  this.bottleName = name.slice(0, length);
              } else {
                  clearInterval(interval);
                  setTimeout(() => resolve(true), 900);
              }
          }, 75);
      });
  }

  removeName(name: string) {
      return new Promise(resolve => {
        let length = name.length;
        this.bottleName = name.slice(0, length);
        const interval = setInterval(() => {
          length--;
          if (length >= 0) {
              this.bottleName = name.slice(0, length);
          } else {
              clearInterval(interval);
              resolve(true);
          }
        }, 50);
      });
  }

}
