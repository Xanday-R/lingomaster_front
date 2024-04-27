import { Injectable } from '@angular/core';
import {AuthService} from "@core/services/auth.service";
import {mergeMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountInfoService {

  constructor(private authService: AuthService) { }

  readonly nativeLanguage$ = this.authService.isAuth$.pipe(mergeMap(async (e) => e.info!.native_language!));

}
