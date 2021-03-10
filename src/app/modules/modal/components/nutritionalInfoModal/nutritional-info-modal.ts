import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dna-modal',
  templateUrl: './nutritional-info-modal.html',
  styles: []
})
export class NutritionalInfoModalComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
