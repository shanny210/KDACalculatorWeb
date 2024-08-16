import {Component, OnInit} from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, ToastModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isDarkmode = false;
  constructor(private messageService: MessageService) {}

  ngOnInit() {

  }

  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Discord Bot is work in Progress' });
  }

  switchThemes() {
    this.isDarkmode = !this.isDarkmode;
  }

  getActiveTheme() {
    return this.isDarkmode;
  }
}
