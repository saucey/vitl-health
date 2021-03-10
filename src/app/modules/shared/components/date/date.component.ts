import {Component, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {BaseFormComponent} from '../BaseFormComponent';
import * as moment from 'moment';

@Component({
  selector: 'app-form-date',
  templateUrl: './date.component.html',
  styles: [],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DateComponent),
          multi: true
        }
    ]
})
export class DateComponent extends BaseFormComponent {


    days = Array.apply(null, Array(31)).map(function (_, i) {return i + 1; });
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    years = Array.apply(null, Array(100)).map(function (_, i) {return i + (new Date().getFullYear() - 117); }).reverse();

    private _dobDay;
    private _dobMonth;
    private _dobYear;

    setDate() {
        this.thisValue = this.dobDay + '/' + (this.dobMonth && this.dobMonth.length === 1 ? '0' : '') + this.dobMonth + '/' + this.dobYear;
    }

    get dobDay() {
        return this._dobDay;
    }

    get dobMonth() {
        return this._dobMonth;
    }

    get dobYear() {
        return this._dobYear;
    }


    set dobDay(value) {
        this._dobDay = value;
        this.setDate();
    }

    set dobMonth(value) {
        this._dobMonth = value;
        this.setDate();
    }

    set dobYear(value) {
        this._dobYear = value;
        this.setDate();
    }

    set thisValue(text) {
        this._thisValue = text;
        const date = moment(this._thisValue, 'DD/MM/YYYY', true);
        this.invalid = !date.isValid();
        if (date.isValid()) {
            this.propagateChange(date.unix());
        } else {
            this.propagateChange(false);
        }
        this.registerTouched();
    }

    get thisValue() {
        return this._thisValue;
    }

    writeValue(value: any) {
        if (value) {
            const momentDate = moment(value, 'X');
            this.dobDay = momentDate.format('DD');
            this.dobMonth = momentDate.format('MM');
            this.dobYear = momentDate.format('YYYY');
        }
    }

}
