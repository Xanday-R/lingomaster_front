import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, firstValueFrom, switchMap, of, Subject} from 'rxjs';
import {HEADER_TOKEN, ResponseFromServer} from '../../../../core';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class SignUpService {
  private headers = inject(HEADER_TOKEN);
  readonly askSignUp$: Subject<{email: string, login: string, native_language:string, password: string}> = new Subject();
  readonly signUp$ = this.askSignUp$.pipe(switchMap(({email, login, native_language, password})=> this.http.post<ResponseFromServer>(`${environment.apiUrl}/auth/sign-up`, {email,login, native_language, password}, this.headers()).pipe(catchError((err) => of(err.error as ResponseFromServer)))));
  constructor(private http: HttpClient) { }
}
