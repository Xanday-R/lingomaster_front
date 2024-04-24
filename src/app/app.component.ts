import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from "./shared/components";
import {CommonModule} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../environments/environment";
import {LocalStorageService} from "./core/services/local-storage.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, CommonModule,
  ],
  providers: [ ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LingoMaster';
  constructor(private localStorageService: LocalStorageService) {

    localStorageService.selectLanguageInterface(this.localStorageService.getLanguageInterface());
  }
}
