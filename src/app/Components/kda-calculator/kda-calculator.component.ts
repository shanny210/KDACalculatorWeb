import {Component, OnDestroy, OnInit} from '@angular/core';
import {InputNumberModule} from "primeng/inputnumber";
import {FloatLabelModule} from "primeng/floatlabel";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {KdaStats} from "../../Domain/repositories/kdaStats";
import {Subscription} from "rxjs";
import {CombatStatService} from "../../Domain/services/combatStat.service";
import {ButtonGroupModule} from "primeng/buttongroup";
import {DividerModule} from "primeng/divider";
import {ChartModule} from 'primeng/chart';
import {ChartDataService} from "../../Domain/services/chartData.service";
import {FieldsetModule} from "primeng/fieldset";

@Component({
  selector: 'app-kda-calculator',
  standalone: true,
  imports: [CardModule, FieldsetModule, InputNumberModule, FloatLabelModule, ButtonModule, ButtonGroupModule, FormsModule, DividerModule, ChartModule],
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

  data: any;
  options: any;

  targetKda = this.kdaStats.kda;
  numberOfKillsForTargetKda = 0;

  constructor(private combatStatService: CombatStatService, private chartDataService: ChartDataService) {
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
    this.data = this.chartDataService.setChartData(['Kills', 'Assists', 'Deaths'], [this.kdaStats.kills, this.kdaStats.assists, this.kdaStats.deaths])
    this.options = this.chartDataService.setChartOptions();
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
    return Math.round((this.kdaStats.kda + Number.EPSILON) * 1000) / 1000;
  }

  getNumberOfKillsOrAssistsUntilTargetKda() {
    this.numberOfKillsForTargetKda = this.combatStatService.getNumberOfKillsOrAssistsUntilTargetKda(this.targetKda);
  }
}
