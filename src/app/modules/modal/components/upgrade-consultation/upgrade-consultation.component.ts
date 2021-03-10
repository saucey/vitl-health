import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-upgrade-consultation',
  templateUrl: './upgrade-consultation.component.html',
  styles: []
})
export class UpgradeConsultationComponent {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }
}