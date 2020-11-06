import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPromComponent } from './landing-prom.component';

describe('LandingPromComponent', () => {
  let component: LandingPromComponent;
  let fixture: ComponentFixture<LandingPromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
