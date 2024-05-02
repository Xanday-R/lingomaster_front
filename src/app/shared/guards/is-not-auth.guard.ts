import {
  CanActivateChild, GuardResult, Router,
} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class isNotAuthGuard implements CanActivateChild {
  constructor(private  authService: AuthService, private router: Router) {
  }
 canActivateChild(): Observable<GuardResult> {
   this.authService.askAuth.next(null);
   return this.authService.isAuthRequesting$.pipe(
     map((result) => {
       if (result.statusCode == 200) {
         this.router.navigate(['/profile']);
         return false;
       } else {
         this.authService.isAuth$.next(false);
         return true;
       }
     })
   )
  }
}
