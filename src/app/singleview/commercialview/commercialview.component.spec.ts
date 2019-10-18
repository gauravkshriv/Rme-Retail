import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialviewComponent } from './commercialview.component';

describe('CommercialviewComponent', () => {
  let component: CommercialviewComponent;
  let fixture: ComponentFixture<CommercialviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercialviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
