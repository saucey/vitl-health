import { Injectable } from '@angular/core';
import * as blogQueries from '../queries/blog';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private api: ApiService) { }

  getAllCategories() {

      return this.api.query(blogQueries.GetCategories, {}).map(({data}) => data.blog_categories);

  }

  getTopArticles() {

      return this.api.query(blogQueries.GetTopArticles, {}).map(({data}) => data.blog_topArticles);

  }

  getAllArticles(page: number = 1, limit: number = 5) {

      return this.api.query(blogQueries.GetArticles, { page: page, limit: limit }).map(({data}) => data.blog_articles);

  }

  getCategory(slug: string, page: number = 1, limit: number = 5) {

      return this.api.query(blogQueries.GetCategory, { slug: slug, page: page, limit: limit }).map(({data}) => data.blog_category);

  }

  getArticle(slug: string) {

      return this.api.query(blogQueries.GetArticle, { slug: slug }).map(({data}) => data.blog_article);

  }

}
