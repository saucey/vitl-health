import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../../../services/global.service';
import { LanaService } from '../../../../services/lana.service';
import { ModalService, ModalTypes } from '../../../../modules/modal/services/modal.service';
import { ModalComponent } from '../../../../modules/modal/components/modal.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
    styles: []
})
export class GoalsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() goals;
  @Input() hideMealPlan = false;
  @Input() hasGoalsChanged = false;
  @Output() handleGoalsChange: EventEmitter<any> = new EventEmitter();
  private ngUnsubscribe$ = new Subject();
  topGoals = [];
  inactiveGoals = [];

  constructor(
    private globalService: GlobalService,
    private lanaService: LanaService,
    private modalService: ModalService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.filterGoals();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasGoalsChanged && changes.hasGoalsChanged.currentValue) {
      this.filterGoals();
    }

  }

  filterGoals() {
    this.topGoals.splice(0, this.topGoals.length, ...this.goals.filter(goal => goal.selected));
    this.inactiveGoals.splice(0, this.inactiveGoals.length, ...this.goals.filter(goal => !goal.selected));
  }

  viewTopGoal(goal) {
    const redirectPath = this.hideMealPlan ? '/myvitl/result/goal/' : '/myvitl/goal/';
    this.router.navigate([ redirectPath, goal.id]).catch((err) => {
      console.log(err);
      this.lanaService.getDashboard().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((dashboard) => {
        this.goals = dashboard.goals;
      });
    });
  }

  selectGoals(newGoals) {
    this.globalService.startLoading();
    this.lanaService.selectGoals(newGoals).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
        this.lanaService.getDashboard().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((data) => {
          this.globalService.stopLoading();
          this.goals.splice(0, this.goals.length, ...data.goals);
          this.filterGoals();
          this.handleGoalsChange.emit(true);
        });
      }
    );
  }

  editTopGoals() {
    this.modalService.create(ModalTypes.ManageGoals, {
      title: 'Select up to 3 goals',
      data: {
        inactiveGoals: this.inactiveGoals,
        topGoals: this.topGoals
      },
      callback: (modal: ModalComponent, newGoals) => {
        this.selectGoals(newGoals);
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
