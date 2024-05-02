import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from '@angular/core';
import {PracticeRequestingService} from '../../../practice-requesting.service';
import { firstValueFrom, map, switchMap, Observable, catchError, of } from 'rxjs';
import {ProfileModule} from '../../../profile.module';

@Injectable({providedIn: ProfileModule})
export class isTakingPracticeGuard implements CanActivate {

    constructor(private practiceRequestingService: PracticeRequestingService, private router: Router) {
    }
    canActivate(): Observable<GuardResult> {
      if(!this.practiceRequestingService.isSubscribeOnTextRequesting()) {
        this.practiceRequestingService.subscribeOnTextRequesting();
        this.practiceRequestingService.askText$.next(null);
      }

      return this.practiceRequestingService.text$.pipe(
        map( (result) => {

          if (!result.text) {
            this.router.navigate(['/profile']);
            return false;
          }

          return true;
        }
      ),
        catchError(() => {
          this.router.navigate(['/auth/log-in']);
          return of(false);
        })
      );
    }
}
