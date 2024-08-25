import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {FieldsetModule} from "primeng/fieldset";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputNumberModule} from "primeng/inputnumber";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {ButtonGroupModule} from "primeng/buttongroup";
import {Subscription} from "rxjs";
import {KdaStats} from "../../Domain/repositories/kdaStats";
import {CombatStatService} from "../../Domain/services/combatStat.service";
import {ChartDataService} from "../../Domain/services/chartData.service";

@Component({
    selector: 'app-kda-target-tracker-calculation',
    standalone: true,
    imports: [
        FieldsetModule,
        FormsModule,
        FloatLabelModule,
        InputNumberModule,
        ButtonModule,
        ButtonGroupModule,
        DividerModule,
        TranslateModule
    ],
    templateUrl: './kda-target-tracker-calculation.component.html',
    styleUrl: './kda-target-tracker-calculation.component.scss'
})
export class KdaTargetTrackerCalculationComponent implements OnInit, OnDestroy {
    private combatStatSubscription: Subscription | null = null;
    kdaStats: KdaStats = {
        kills: 0,
        assists: 0,
        deaths: 0,
        kda: 0,
    };

    targetKda = this.kdaStats.kda;
    numberOfKillsForTargetKda = 0;

    constructor(private combatStatService: CombatStatService, private chartDataService: ChartDataService, translate: TranslateService) {
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

    getNumberOfKillsOrAssistsUntilTargetKda() {
        this.numberOfKillsForTargetKda = this.combatStatService.getNumberOfKillsOrAssistsUntilTargetKda(this.targetKda);
    }
}
