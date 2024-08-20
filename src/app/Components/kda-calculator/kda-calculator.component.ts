import {Component} from '@angular/core';
import {KdaCalculationComponent} from "../kda-calculation/kda-calculation.component";
import {
    KdaTargetTrackerCalculationComponent
} from "../kda-target-tracker-calculation/kda-target-tracker-calculation.component";
import {KdaChartViewComponent} from "../kda-chart-view/kda-chart-view.component";

@Component({
    selector: 'app-kda-calculator',
    standalone: true,
    imports: [KdaCalculationComponent, KdaTargetTrackerCalculationComponent, KdaChartViewComponent],
    templateUrl: './kda-calculator.component.html',
    styleUrl: './kda-calculator.component.scss',
})

export class KdaCalculatorComponent {

}
