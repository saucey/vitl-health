import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import {LanaService} from '../services/lana.service';

@Injectable()
export class TheoneResolver implements Resolve<any> {

    constructor(private lanaService: LanaService) {}

    resolve() {

        return this.lanaService.getResult().catch(() => {
            return Observable.empty();
        });

    }

}
