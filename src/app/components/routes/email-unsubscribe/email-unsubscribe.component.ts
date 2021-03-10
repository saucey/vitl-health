import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-unsubscribe',
  templateUrl: './email-unsubscribe.component.html',
  styleUrls: ['./email-unsubscribe.component.css']
})
export class EmailUnsubscribeComponent implements OnInit {

  category: string;
  result: any;

  constructor(private route: ActivatedRoute) {
    this.category = route.snapshot.params['category'];
    this.result = route.snapshot.data.result;
  }

  ngOnInit() {

  }

  getUnsubscribedCategory() {
    return this.result.filter((category) => this.category === category.identifier).map((category) => category.title);
  }

  getSubscribedCategories() {
    return this.result.filter((category) => category.subscribed && category.allowUnsubscribe);
  }

}
