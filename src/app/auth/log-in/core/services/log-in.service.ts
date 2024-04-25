import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, firstValueFrom, mergeMap, of, Subject} from "rxjs";
import {HEADER_TOKEN, ResponseFromServer} from "../../../../core";
import {environment} from "../../../../../environments/environment";

@Injectable()
export class LogInService {
  private headers = inject(HEADER_TOKEN);
  readonly askLogIn$:Subject<{email:string, password: string}> = new Subject()
  readonly logIn$ = this.askLogIn$.pipe(mergeMap(({email, password}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/auth/log-in`, {email, password}, this.headers()).pipe(catchError((err) => of(err.error as ResponseFromServer)))));
  constructor(private http: HttpClient) { }
}
