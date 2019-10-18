import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrfilterComponent } from './agrfilter.component';

describe('AgrfilterComponent', () => {
  let component: AgrfilterComponent;
  let fixture: ComponentFixture<AgrfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
