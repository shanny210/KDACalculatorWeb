import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {KdaCalculatorComponent} from "./Components/kda-calculator/kda-calculator.component";
import {HeaderComponent} from "./Components/header/header.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, HeaderComponent, KdaCalculatorComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'KDA - Calculator';

    constructor(private translate: TranslateService) {
        this.translate.setDefaultLang('en');
    }
}
