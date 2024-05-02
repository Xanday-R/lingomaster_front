import { Injectable } from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import { map, mergeMap, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountInfoService {

  constructor(private authService: AuthService) { }

  readonly nativeLanguage$ = this.authService.isAuthRequesting$.pipe(map( (e) => e.info!.native_language!));

}
