import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndfilterComponent } from './indfilter.component';

describe('IndfilterComponent', () => {
  let component: IndfilterComponent;
  let fixture: ComponentFixture<IndfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
