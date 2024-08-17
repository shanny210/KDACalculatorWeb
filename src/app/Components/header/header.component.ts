import {Component, OnInit} from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {SelectButtonModule} from 'primeng/selectbutton';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [ToolbarModule, ButtonModule, ToastModule, SelectButtonModule, TranslateModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    languageOptions: any[] = [{ label: 'EN', value: 'en' },{ label: 'DE', value: 'de' }];

    constructor(private messageService: MessageService, public translate: TranslateService) {
    }

    ngOnInit() {
    }

    showInfo() {
        this.messageService.add({severity: 'info', summary: 'Info', detail: 'Discord Bot is work in Progress'});
    }

    switchLanguage(language: any) {
        this.translate.use(language.option.value);
    }
}
