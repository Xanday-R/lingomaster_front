import {
  CanActivateChild, GuardResult, MaybeAsync, Router,
} from '@angular/router';
import {Injectable} from "@angular/core";
import {GlobalService} from "../../core/services/global.service";
import {catchError, firstValueFrom, map, Observable} from "rxjs";
import {ResponseFromServer} from "../../core/types/response-from-server.type";

@Injectable({providedIn: 'root'})
export class isAuthGuard implements CanActivateChild {
  constructor(private  globalService: GlobalService, private router: Router) {
  }
  canActivateChild(): Observable<GuardResult> {
    return this.globalService.isAuth$.pipe(
      map((result) => {
        if (result.statusCode != 200) {
          this.router.navigate(['/auth/log-in']);
          return false;
        } else {
          return true;
        }
      })
    )
  }
}
