import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {GlobalService} from './global.service';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(private globalService: GlobalService) {}

    getConfig() {
        return this.globalService.initCall().map(({data}) => data.config);
    }

}
