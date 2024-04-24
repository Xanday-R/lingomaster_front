import {InjectionToken, Provider} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";

export const HEADER_TOKEN = new InjectionToken<{headers: HttpHeaders}>('headers');

export function requestOptionsFactory () {
  return {headers: new HttpHeaders({
    'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': 'http://localhost:3000'

  }),
    withCredentials: 'include',
  };
}

export const headersOptions : Provider = {
  provide: HEADER_TOKEN,
  useFactory: requestOptionsFactory
}
