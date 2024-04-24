import { Component } from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {AComponent} from "../../../a/a.component";
import {MatListItemTitle, MatNavList} from "@angular/material/list";
import {Languages} from "../../../../../core";
import {MatLine} from "@angular/material/core";
import {LocalStorageService} from "../../../../../core/services/local-storage.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgIf} from "@angular/common";
import {ButtonAComponent} from "../../../button-a/button-a.component";

@Component({
  selector: 'app-select-language-interface',
  standalone: true,
  imports: [
    AComponent,
    MatNavList,
    MatListItemTitle,
    MatLine,
    TranslateModule,
    NgIf,
    ButtonAComponent
  ],
  templateUrl: './select-language-interface.component.html',
  styleUrl: './select-language-interface.component.scss'
})
export class SelectLanguageInterfaceComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<SelectLanguageInterfaceComponent>, protected localStorageService: LocalStorageService) {
  }

  select(language: Languages) {
    this.localStorageService.selectLanguageInterface(language);
    this._bottomSheetRef.dismiss();
  }

  protected readonly Languages = Languages;
}
