import {
  CanActivateChild, GuardResult, Router,
} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class isAuthGuard implements CanActivateChild {
  constructor(private  globalService: AuthService, private router: Router) {
  }
  canActivateChild(): Observable<GuardResult> {
    this.globalService.askAuth.next(null);
    return this.globalService.isAuthRequesting$.pipe(
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
