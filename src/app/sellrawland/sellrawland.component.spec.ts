import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellrawlandComponent } from './sellrawland.component';

describe('SellrawlandComponent', () => {
  let component: SellrawlandComponent;
  let fixture: ComponentFixture<SellrawlandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellrawlandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellrawlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
