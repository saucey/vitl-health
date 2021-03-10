import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ApiService} from '../services/api.service';
import * as accountQueries from '../queries/account';

@Injectable()
export class EmailUnsubscribeResolver implements Resolve<any> {

    constructor(private apiService: ApiService) {}

    resolve(route: ActivatedRouteSnapshot) {

        return this.apiService.mutate(accountQueries.UnsubscribeEmail, {
            email: route.params['email'],
            category: route.params['category']
        }).map(({data}) => data.user_unsubscribeEmail);

    }

}
