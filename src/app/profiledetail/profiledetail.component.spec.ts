import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiledetailComponent } from './profiledetail.component';

describe('ProfiledetailComponent', () => {
  let component: ProfiledetailComponent;
  let fixture: ComponentFixture<ProfiledetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfiledetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiledetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
