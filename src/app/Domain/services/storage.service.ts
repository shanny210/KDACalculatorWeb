import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private readonly storageKey = 'kdaStats';

    saveKdaStats(kdaStats: any): void {
        localStorage.setItem(this.storageKey, JSON.stringify(kdaStats));
    }

    loadKdaStats(): any | null {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : null;
    }

    clearKdaStats(): void {
        localStorage.removeItem(this.storageKey);
    }
}
