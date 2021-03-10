import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-type-dna-trait-marker',
  templateUrl: './block-type-dna-trait-marker.component.html',
  styles: []
})
export class BlockTypeDnaTraitMarkerComponent implements OnInit {

  @Input() block;

  constructor() { }

  ngOnInit() {
  }

}
