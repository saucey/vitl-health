import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {BlogService} from '../services/blog.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BlogArticleResolver implements Resolve<any> {

    constructor(private blogService: BlogService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot) {

        return this.blogService.getArticle(route.params['slug']).catch(() => {
            this.router.navigate(['/blog']);
            return Observable.of(null);
        });

    }

}
