import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Pipe({
  name: 'toDate'
})
export class ToDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: any, args?: any): any {

    if (typeof value === 'object') {
        return this.datePipe.transform(moment().year(value.year).month(value.month - 1).date(value.day).unix() * 1000);
    } else {
        return this.datePipe.transform(value * 1000);
    }

  }

}
