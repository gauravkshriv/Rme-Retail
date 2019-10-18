import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyreviewComponent } from './propertyreview.component';

describe('PropertyreviewComponent', () => {
  let component: PropertyreviewComponent;
  let fixture: ComponentFixture<PropertyreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
