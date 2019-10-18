import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialviewComponent } from './residentialview.component';

describe('ResidentialviewComponent', () => {
  let component: ResidentialviewComponent;
  let fixture: ComponentFixture<ResidentialviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentialviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentialviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
