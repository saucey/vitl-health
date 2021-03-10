import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PageService } from '../services/page.service';
import { Page } from '../classes/page';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class PageResolver implements Resolve<Page> {

    constructor(private pageService: PageService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot) {

        return this.pageService.getPage(route.params['slug']).catch((error) => {
            this.router.navigate(['/404']);
            return Observable.of(null);
        });

    }

}
