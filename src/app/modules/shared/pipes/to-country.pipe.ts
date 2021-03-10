import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import {ConfigService} from '../../../services/config.service';

@Pipe({
    name: 'toCountry'
})
export class ToCountryPipe implements PipeTransform {

    countries: Array<any> = [];

    constructor(private datePipe: DatePipe, private configService: ConfigService) {
        this.configService.getConfig().subscribe(config => this.countries = config.countries);
    }

    transform(isoCode: any, args?: any): any {

        const country = this.countries.find(c => c.code === isoCode);

        if (country) {
            return country.label;
        } else {
            return isoCode;
        }

    }

}
