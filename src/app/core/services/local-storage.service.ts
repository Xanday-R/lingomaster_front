import { Injectable } from '@angular/core';
import {Languages} from "../enums/languages.enum";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class LocalStorageService {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(environment.defaultLanguage);
  }

  selectLanguageInterface(lang: Languages) {
    localStorage.setItem('lang', lang);
    this.translate.use(lang.toLowerCase());
  }

  getLanguageInterface() {
    const result = localStorage.getItem('lang');
    if(!result || (result != Languages.ukrainian && result != Languages.english)) return Languages.english;
    return result;
  }
}
