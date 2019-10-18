import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResfilterComponent } from './resfilter.component';

describe('ResfilterComponent', () => {
  let component: ResfilterComponent;
  let fixture: ComponentFixture<ResfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
