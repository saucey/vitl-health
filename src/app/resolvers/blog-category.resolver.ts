import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {BlogService} from '../services/blog.service';
import {Observable} from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class BlogCategoryResolver implements Resolve<any> {

    constructor(private blogService: BlogService) {}

    resolve(route: ActivatedRouteSnapshot) {

        if (route.params['slug']) {

            return forkJoin(
                this.blogService.getAllCategories(),
                this.blogService.getCategory(route.params['slug']),
                this.blogService.getTopArticles()
            ).map((res) => {
                return {
                    categories: res[0],
                    category: res[1],
                    top: res[2]
                };
            });

        } else {

            return forkJoin(
                this.blogService.getAllCategories(),
                this.blogService.getAllArticles(),
                this.blogService.getTopArticles()
            ).map((res) => {
                return {
                    categories: res[0],
                    pagination: res[1],
                    top: res[2]
                };
            });

        }

    }

}
