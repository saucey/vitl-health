import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import * as miscQueries from '../queries/misc';

@Injectable()
export class PageService {

  constructor(private apiService: ApiService) { }

  getPage(identifier: String) {

    return this.apiService.query(miscQueries.GetPage, { path: 'page/' + identifier }).map(({data}) => data.content_getPage);

  }

}
