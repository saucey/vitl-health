import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-goal-preview',
  templateUrl: './goal-preview.component.html',
  styles: []
})
export class GoalPreviewComponent implements OnInit {

  @Input() goal;
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleGoal() {
    this.toggle.emit();
  }

}
