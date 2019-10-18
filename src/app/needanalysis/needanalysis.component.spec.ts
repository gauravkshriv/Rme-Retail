import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedanalysisComponent } from './needanalysis.component';

describe('NeedanalysisComponent', () => {
  let component: NeedanalysisComponent;
  let fixture: ComponentFixture<NeedanalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedanalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
