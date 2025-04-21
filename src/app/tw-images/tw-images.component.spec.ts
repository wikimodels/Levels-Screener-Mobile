import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwImagesComponent } from './tw-images.component';

describe('TwImagesComponent', () => {
  let component: TwImagesComponent;
  let fixture: ComponentFixture<TwImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwImagesComponent]
    });
    fixture = TestBed.createComponent(TwImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
