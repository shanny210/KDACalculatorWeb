import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  data: any;
  options: any;
  documentStyle = getComputedStyle(document.documentElement);

  setChartData(listOfLabels: string[], data: number[]): any {
      this.data = {
      labels: listOfLabels,
      datasets: [
        {
          data: data,
          backgroundColor: [this.documentStyle.getPropertyValue('--green-500'), this.documentStyle.getPropertyValue('--blue-500'), this.documentStyle.getPropertyValue('--red-500')],
          hoverBackgroundColor: [this.documentStyle.getPropertyValue('--green-400'), this.documentStyle.getPropertyValue('--blue-400'), this.documentStyle.getPropertyValue('--red-400')]
        }
      ]
    };

      return this.data;
  }

  setChartOptions(): any {
    const textColor = this.documentStyle.getPropertyValue('--text-color');

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };

    return this.options;
  }
}
