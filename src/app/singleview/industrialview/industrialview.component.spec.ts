import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialviewComponent } from './industrialview.component';

describe('IndustrialviewComponent', () => {
  let component: IndustrialviewComponent;
  let fixture: ComponentFixture<IndustrialviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustrialviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrialviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
