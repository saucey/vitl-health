import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-manage-goals',
  templateUrl: './manage-goals.component.html',
  styles: []
})
export class ManageGoalsComponent implements OnInit, OnDestroy {

  topGoals = [];
  inactiveGoals = [];
  @Input() data;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.topGoals = [...this.data.topGoals];
    this.inactiveGoals = [...this.data.inactiveGoals];
  }

  addGoal(goal: any) {
    this.topGoals.push(goal);
    this.inactiveGoals.splice(this.inactiveGoals.findIndex(inactiveGoal => inactiveGoal.id === goal.id), 1);
  }

  removeGoal(goal: any) {
    const pos = this.inactiveGoals.findIndex(inactiveGoal => inactiveGoal.score <= goal.score);
    this.inactiveGoals.splice(pos, 0, goal);
    this.topGoals.splice(this.topGoals.findIndex(topGoal => topGoal.id === goal.id), 1);
  }

  ngOnDestroy() {
    // if goals changed, send to BE
    if (this.data.topGoals.length !== this.topGoals.length ||
      this.data.topGoals.filter(oldGoal => this.topGoals.findIndex(newGoal => newGoal.id === oldGoal.id) === -1).length !== 0) {
      this.callback.emit(this.topGoals);
    }
  }

}
