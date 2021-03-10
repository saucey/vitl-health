import {Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {User} from '../../../classes/user';

@Component({
  selector: 'app-theone-results-loader',
  templateUrl: './theone-results-loader.component.html',
  styles: []
})
export class TheoneResultsLoaderComponent implements OnInit, OnChanges {

  @Input() user: User;
  @Input() product;
  @Input() pill;
  @Input() goals: Array<any>;
  @Input() hasDigestionGoal = false;
  @Input() resultsLoaded;
  @Input() resultsVisible;
  @Output() showClicked: EventEmitter<any> = new EventEmitter();
  @Output() gummyClicked: EventEmitter<any> = new EventEmitter();
  @Output() navigateToPersonalised: EventEmitter<any> = new EventEmitter();
  gummy = false;

  resultsReady = false;

  constructor(
  ) {}

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.resultsVisible && changes.resultsVisible.currentValue) {
      setTimeout(() => this.resultsReady = true, 1500);
    }

  }

  handleNavigation() {
    this.navigateToPersonalised.emit();
  }

  onShowClicked() {
      // Disable gummy

      // const configSubscription = this.configService.getConfig().subscribe(({country}) => {
      //     configSubscription.unsubscribe();
      //     if (this.product.id == 59 && country !== 'AU') {
      //         this.modalService.create(ModalTypes.GummyTest, {
      //             title: 'How would you prefer to take your vitamins?',
      //             subtitle: 'Both forms will provide your recommended nutrients.',
      //             titleDivider: false,
      //             data: {
      //                 option: 1
      //             },
      //             callback: (modal: any, value: any) => {
      //                 switch (value) {
      //                     case 'capsule' : this.showClicked.emit(true); this.trackEssentialOne('capsule'); break;
      //                     case 'gummy' : this.gummyClicked.emit(true); this.trackEssentialOne('gummy'); this.gummy = true; break;
      //                 }
      //                 modal.close();
      //             }
      //         });
      //     } else {
      //         this.showClicked.emit(true);
      //     }
      // });
      this.showClicked.emit(true);

  }

  // trackEssentialOne(type: string) {
  //     this.globalService.emitTrackingEvent('select', {
  //         category: 'essential-one',
  //         label: type
  //     });
  // }
}
