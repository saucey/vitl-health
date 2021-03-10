import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {BottleImgUrl} from '../../../queries/theone';
import {ApiService} from '../../../services/api.service';


@Component({
  selector: 'app-theone-results-bottle',
  templateUrl: './theone-results-bottle.component.html',
  styles: []
})
export class TheoneResultsBottleComponent implements OnInit, OnDestroy {

  @Input() user;
  private ngUnsubscribe$ = new Subject();

  bottleUrl;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    console.log('Inside Results bottle');
    const sub = this.apiService.query(BottleImgUrl).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(({data}) => {
      sub.unsubscribe();
      this.bottleUrl = data.user.essentialOneBottleImgUrl;
    });

  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
