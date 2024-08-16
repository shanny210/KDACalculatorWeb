import {Injectable} from '@angular/core';
import {KdaStats} from "../repositories/kdaStats";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CombatStatService {
  private kdaStats: KdaStats = {
    kills: 0,
    assists: 0,
    deaths: 0,
    kda: 0,
  };

  private kdaStatsSubject = new BehaviorSubject<KdaStats>(this.kdaStats);

  getKdaStats(): Observable<KdaStats> {
    return this.kdaStatsSubject.asObservable();
  }

  public calculateAndGetKdaStats(): KdaStats {
    this.calculateAndUpdateKda();
    return this.kdaStats;
  }

  addKill() {
    this.kdaStats.kills += 1;
  }

  addAssist() {
    this.kdaStats.assists += 1;
  }

  addDeath() {
    this.kdaStats.deaths += 1;
  }

  subtractKill() {
    if (this.kdaStats.kills > 0) {
      this.kdaStats.kills -= 1;
    }
  }

  subtractAssist() {
    if (this.kdaStats.assists > 0) {
      this.kdaStats.assists -= 1;
    }
  }

  subtractDeath() {
    if (this.kdaStats.deaths > 0) {
      this.kdaStats.deaths -= 1;
    }
  }

  getNumberOfKillsOrAssistsUntilTargetKda(targetKda: number) {
    const {kills, assists, deaths} = this.kdaStats;
    return targetKda * deaths - (kills + assists);
  }

  private calculateAndUpdateKda() {
    const {kills, assists, deaths} = this.kdaStats;
    this.kdaStats.kda = deaths === 0 ? kills + assists : (kills + assists) / deaths;
    this.kdaStatsSubject.next(this.kdaStats);
  }
}
