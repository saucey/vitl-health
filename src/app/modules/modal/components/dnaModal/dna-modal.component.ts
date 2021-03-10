import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dna-modal',
  templateUrl: './dna-modal.component.html',
  styles: []
})
export class DnaModalComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
