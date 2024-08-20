import {Component, OnDestroy, OnInit} from '@angular/core';
import {KdaStats} from "../../Domain/repositories/kdaStats";
import {Subscription} from "rxjs";
import {CombatStatService} from "../../Domain/services/combatStat.service";
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

export class KdaCalculatorComponent implements OnInit, OnDestroy {
    private combatStatSubscription: Subscription | null = null;
    kdaStats: KdaStats = {
        kills: 0,
        assists: 0,
        deaths: 0,
        kda: 0,
    };

    constructor(private combatStatService: CombatStatService) {
    }

    ngOnInit() {
        this.combatStatSubscription = this.combatStatService.getKdaStats().subscribe(stats => {
            this.kdaStats = stats;
        });
    }

    ngOnDestroy() {
        if (this.combatStatSubscription) {
            this.combatStatSubscription.unsubscribe();
        }
    }
}
