import { Injectable } from '@angular/core';
import {Languages} from "../enums/languages.enum";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class LanguageSelectionService {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(environment.defaultLanguage);
  }

  selectLanguageInterface(lang: Languages) {
    localStorage.setItem('lang', lang);
    this.translate.use(lang.toLowerCase());
  }

  getLanguageInterface() {
    const result = localStorage.getItem('lang') as Languages || Languages.english;
    return result;
  }
}
