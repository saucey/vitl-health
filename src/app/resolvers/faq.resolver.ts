import { Injectable } from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import * as miscQueries from '../queries/misc';

@Injectable()
export class FaqResolver implements Resolve<any> {

    constructor(private apiService: ApiService) {}

    resolve() {

        return this.apiService.query(miscQueries.GetFaqs).map(({data}) => data.content_getFaqs);

    }

}