import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import * as miscQueries from '../queries/misc';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private apiService: ApiService) {}

  getContent(path: string) {

    return this.apiService.query(miscQueries.GetContent, { path: path }).map(({data}) => {
      return this.parseScreen(data.content_getScreen);
    });

  }

  parseScreen(screen: any) {
      if (screen) {
          return {
              title: screen.title,
              sections: JSON.parse(screen.jsonSections),
              style: JSON.parse(screen.jsonStyle),
              canNavigateBack: screen.canNavigateBack,
              canDismiss: screen.canDismiss,
              onLoad: screen.onLoad,
              onDismiss: screen.onDismiss
          };
      }
  }

}
