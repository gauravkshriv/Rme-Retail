import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommfilterComponent } from './commfilter.component';

describe('CommfilterComponent', () => {
  let component: CommfilterComponent;
  let fixture: ComponentFixture<CommfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
