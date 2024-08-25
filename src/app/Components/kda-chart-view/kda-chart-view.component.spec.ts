import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KdaChartViewComponent } from './kda-chart-view.component';

describe('KdaChartViewComponent', () => {
  let component: KdaChartViewComponent;
  let fixture: ComponentFixture<KdaChartViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KdaChartViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KdaChartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
