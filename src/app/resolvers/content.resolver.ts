import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {ContentService} from '../services/content.service';

@Injectable()
export class ContentResolver implements Resolve<any> {

    constructor(private contentService: ContentService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot) {

        const segments = route.url.map((segment) => segment.path);
        return this.contentService.getContent(segments.join('/'));

    }

}
