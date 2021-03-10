import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-goal-announcement',
  templateUrl: './goal-announcement.component.html',
  styles: []
})
export class GoalAnnouncementComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
