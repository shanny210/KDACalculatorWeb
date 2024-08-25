import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KdaCalculationComponent } from './kda-calculation.component';

describe('KdaCalculationComponent', () => {
  let component: KdaCalculationComponent;
  let fixture: ComponentFixture<KdaCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KdaCalculationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KdaCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
