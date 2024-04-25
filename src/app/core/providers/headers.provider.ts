import {InjectionToken, Provider} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CookieService} from "@core/services/cookie-service.service";

export const HEADER_TOKEN = new InjectionToken<() => { headers: HttpHeaders }>('headers');

export function requestOptionsFactory (cookieService: CookieService) {
  return function () {
    return {headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': 'Bearer ' + cookieService.getCookie(),
        'Access-Control-Allow-Origin': environment.origin

      }),
      withCredentials: 'include',
    };
  }
}

export const headersOptions : Provider = {
  provide: HEADER_TOKEN,
  useFactory: requestOptionsFactory,
  deps: [CookieService]
}
