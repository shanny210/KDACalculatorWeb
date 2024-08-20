import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ButtonGroupModule} from "primeng/buttongroup";
import {DividerModule} from "primeng/divider";
import {FieldsetModule} from "primeng/fieldset";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputNumberModule} from "primeng/inputnumber";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import {KdaStats} from "../../Domain/repositories/kdaStats";
import {CombatStatService} from "../../Domain/services/combatStat.service";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-kda-calculation',
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
    templateUrl: './kda-calculation.component.html',
    styleUrl: './kda-calculation.component.scss'
})
export class KdaCalculationComponent implements OnInit, OnDestroy {
    private combatStatSubscription: Subscription | null = null;
    kdaStats: KdaStats = {
        kills: 0,
        assists: 0,
        deaths: 0,
        kda: 0,
    };

    constructor(private combatStatService: CombatStatService, translate: TranslateService) {
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

    addCombatStatValueOfType(combatStatType: string) {
        switch (combatStatType) {
            case 'kills':
                this.combatStatService.addKill();
                break;
            case 'assists':
                this.combatStatService.addAssist();
                break;
            case 'deaths':
                this.combatStatService.addDeath();
                break;
        }
    }

    subtractCombatStatValueOfType(combatStatType: string) {
        switch (combatStatType) {
            case 'kills':
                this.combatStatService.subtractKill();
                break;
            case 'assists':
                this.combatStatService.subtractAssist();
                break;
            case 'deaths':
                this.combatStatService.subtractDeath();
                break;
        }
    }

    calculateKda() {
        this.combatStatService.calculateAndGetKdaStats();
    }

    getRoundedKda() {
        return this.combatStatService.getRoundedKda();
    }
}
