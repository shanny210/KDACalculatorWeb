import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KdaTargetTrackerCalculationComponent } from './kda-target-tracker-calculation.component';

describe('KdaTargetTrackerCalculationComponent', () => {
  let component: KdaTargetTrackerCalculationComponent;
  let fixture: ComponentFixture<KdaTargetTrackerCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KdaTargetTrackerCalculationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KdaTargetTrackerCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
