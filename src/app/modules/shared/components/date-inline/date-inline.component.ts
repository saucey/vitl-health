import {Component, Input, ViewChild, forwardRef} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {BaseFormComponent} from '../BaseFormComponent';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-form-date-inline',
  templateUrl: './date-inline.component.html',
  styles: [],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DateInlineComponent),
          multi: true
        }
    ]
})
export class DateInlineComponent extends BaseFormComponent {

    currMonth = moment().month();
    currYear = moment().year();

    disableSinceMonth = (this.currMonth + 6) % 12;
    disableSinceYear = this.currMonth + 6 > 12 ? this.currYear + 1 : this.currYear;

    datePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy-mm-dd',
        inline: true,
        sunHighlight: true,
        disableUntil: {year: this.currYear, month: this.currMonth, day: moment().date()},
        disableSince: {year: this.disableSinceYear, month: this.disableSinceMonth, day: moment().day()},
        showTodayBtn: false
    };

    get thisValue() {
        return this._thisValue;
    }

    set thisValue(value) {
        this._thisValue = value;
        this.propagateChange(value.epoc);
        this.registerTouched();
    }

    writeValue(value: any) {
        if (value) {
            this._thisValue = {
                date: {
                    year: moment(value, 'X').year(),
                    month: moment(value, 'X').month() + 1,
                    day: moment(value, 'X').date()
                }
            };
        }
    }

}
