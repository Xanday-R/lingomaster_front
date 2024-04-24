import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {provideAngularSvgIcon} from "angular-svg-icon";
import {headersOptions} from "./core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideAnimationsAsync(), headersOptions, provideHttpClient(), provideAngularSvgIcon(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ],
};
