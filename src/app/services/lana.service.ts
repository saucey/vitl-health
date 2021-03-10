import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import * as lanaQueries from '../queries/lana';
import {Goal} from '../classes/lana/goal';

@Injectable({
  providedIn: 'root'
})
export class LanaService {

  constructor(private apiService: ApiService) { }

  getResult() {
      return this.apiService.query(lanaQueries.GetResultWalkthrough).map(({data}) => data.lana_resultsWalkthrough);
  }

  getDashboard() {
      return this.apiService.query(lanaQueries.GetDashboard).map(({data}) => data.user);
  }

  getGoal(identifier: string) {
      return this.apiService.query(lanaQueries.GetGoal, { id: identifier }).map(({data}) => data);
  }

  selectGoals(goals: Array<Goal>) {
      return this.apiService.mutate(lanaQueries.SelectGoals, { goals: goals.map(goal => goal.id) });
  }

  generateResult(contextIdentifier: string) {
      return this.apiService.mutate(lanaQueries.GenerateResult, { contextIdentifier: contextIdentifier });
  }
  
  getGoalsAnnouncements() {
    return this.apiService.query(lanaQueries.getGoalsAnnouncements).map(({data}) => data.user.goalAnnouncements);
  }

}
