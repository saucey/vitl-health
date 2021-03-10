import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import 'rxjs/add/observable/forkJoin';
import {AccountService} from '../services/account.service';

@Injectable()
export class AccountResolver implements Resolve<any> {

    constructor(private accountService: AccountService) {}

    resolve(route: ActivatedRouteSnapshot) {

        return new Promise((resolve, reject) => {
            this.accountService.getAccount().subscribe(account => resolve(account), () => reject());
        });
    }

}
