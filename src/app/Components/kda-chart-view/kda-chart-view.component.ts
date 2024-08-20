import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {FieldsetModule} from "primeng/fieldset";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import {KdaStats} from "../../Domain/repositories/kdaStats";
import {CombatStatService} from "../../Domain/services/combatStat.service";
import {ChartDataService} from "../../Domain/services/chartData.service";

@Component({
    selector: 'app-kda-chart-view',
    standalone: true,
    imports: [
        ChartModule,
        FieldsetModule,
        TranslateModule
    ],
    templateUrl: './kda-chart-view.component.html',
    styleUrl: './kda-chart-view.component.scss'
})
export class KdaChartViewComponent implements OnInit, OnDestroy {
    private combatStatSubscription: Subscription | null = null;

    kdaStats: KdaStats = {
        kills: 0,
        assists: 0,
        deaths: 0,
        kda: 0,
    };

    data: any;
    options: any;

    kdaHasBeenCalculated = false;

    constructor(private combatStatService: CombatStatService, private chartDataService: ChartDataService, translate: TranslateService) {
    }

    ngOnInit() {
        this.combatStatSubscription = this.combatStatService.getKdaStats().subscribe(stats => {
            this.kdaStats = stats;
            this.setChartDataAndOptions();
        });
    }

    ngOnDestroy() {
        if (this.combatStatSubscription) {
            this.combatStatSubscription.unsubscribe();
        }
    }

    setChartDataAndOptions() {
        this.data = this.chartDataService.setChartData(
            ['Kills', 'Assists', 'Deaths'],
            [this.kdaStats.kills, this.kdaStats.assists, this.kdaStats.deaths]
        )
        this.options = this.chartDataService.setChartOptions();
    }
}
