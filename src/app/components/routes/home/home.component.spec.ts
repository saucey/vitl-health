import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Component, Input } from '@angular/core';

import { HomeComponent } from './home.component';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
    selector: 'swiper',
    template: ''
  })
  class MockSwiperComponent {
      @Input() config: SwiperConfigInterface;
  }

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [
            HomeComponent,
            MockSwiperComponent
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
