import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawviewComponent } from './rawview.component';

describe('RawviewComponent', () => {
  let component: RawviewComponent;
  let fixture: ComponentFixture<RawviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
