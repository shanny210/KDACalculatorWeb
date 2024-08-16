import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KdaCalculatorComponent } from './kda-calculator.component';

describe('KdaCalculatorComponent', () => {
  let component: KdaCalculatorComponent;
  let fixture: ComponentFixture<KdaCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KdaCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KdaCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
