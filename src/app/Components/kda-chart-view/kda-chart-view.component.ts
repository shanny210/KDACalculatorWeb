import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartModule } from "primeng/chart";
import { FieldsetModule } from "primeng/fieldset";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { KdaStats } from "../../Domain/repositories/kdaStats";
import { CombatStatService } from "../../Domain/services/combatStat.service";
import { ChartDataService } from "../../Domain/services/chartData.service";

@Component({
    selector: 'app-kda-chart-view',
    standalone: true,
    imports: [
        ChartModule,
        FieldsetModule,
        TranslateModule
    ],
    templateUrl: './kda-chart-view.component.html',
    styleUrls: ['./kda-chart-view.component.scss']
})
export class KdaChartViewComponent implements OnInit, OnDestroy {
    private combatStatSubscription: Subscription | null = null;
    private translateSubscription: Subscription | null = null;

    kdaStats: KdaStats = {
        kills: 0,
        assists: 0,
        deaths: 0,
        kda: 0,
    };

    data: any;
    options: any;
    kdaHasBeenCalculated = false;

    constructor(
        private combatStatService: CombatStatService,
        private chartDataService: ChartDataService,
        private translate: TranslateService
    ) {}

    ngOnInit(): void {
        this.translateSubscription = this.translate
            .get(['kills', 'assists', 'deaths'])
            .subscribe(translations => {
                this.updateChart(translations);

                this.combatStatSubscription = this.combatStatService.getKdaStats().subscribe(stats => {
                    this.kdaStats = stats;
                    this.updateChart(translations);
                });
            });
    }

    ngOnDestroy(): void {
        this.combatStatSubscription?.unsubscribe();
        this.translateSubscription?.unsubscribe();
    }

    private updateChart(translations: { [key: string]: string }): void {
        this.kdaHasBeenCalculated = this.kdaStats.kills > 0 || this.kdaStats.assists > 0 || this.kdaStats.deaths > 0;

        const translatedLabels = [
            translations['kills'],
            translations['assists'],
            translations['deaths']
        ];

        this.data = this.chartDataService.setChartData(
            translatedLabels,
            [this.kdaStats.kills, this.kdaStats.assists, this.kdaStats.deaths]
        );
        this.options = this.chartDataService.setChartOptions();
    }
}