import {Injectable} from '@angular/core';
import {KdaStats} from "../repositories/kdaStats";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CombatStatService {
    private readonly storageKey = 'kdaStats';

    private kdaStats: KdaStats = {
        kills: 0,
        assists: 0,
        deaths: 0,
        kda: 0,
    };

    private kdaStatsSubject = new BehaviorSubject<KdaStats>(this.kdaStats);

    constructor() {
        this.loadKdaStats();
    }

    private loadKdaStats(): void {
        const savedStats = localStorage.getItem(this.storageKey);
        if (savedStats) {
            this.kdaStats = JSON.parse(savedStats);
            this.kdaStatsSubject.next(this.kdaStats);
        }
    }

    private saveKdaStats(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.kdaStats));
    }

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

    getRoundedKda() {
        return Math.round((this.kdaStats.kda + Number.EPSILON) * 1000) / 1000;
    }

    getNumberOfKillsOrAssistsUntilTargetKda(targetKda: number) {
        const {kills, assists, deaths} = this.kdaStats;
        return Math.ceil(targetKda * deaths - (kills + assists));
    }

    private calculateAndUpdateKda() {
        const {kills, assists, deaths} = this.kdaStats;
        this.kdaStats.kda = deaths === 0 ? kills + assists : (kills + assists) / deaths;
        this.kdaStatsSubject.next(this.kdaStats);
        this.saveKdaStats();
    }
}
