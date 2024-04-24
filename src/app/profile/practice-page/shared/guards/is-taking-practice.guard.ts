import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";
import {PracticeRequestingService} from "../../../core/services/practice-requesting.service";
import {firstValueFrom, map, mergeMap, Observable} from "rxjs";
import {ProfileModule} from "../../../profile.module";

@Injectable({providedIn: ProfileModule})
export class isTakingPracticeGuard implements CanActivate {

    constructor(private practiceRequestingService: PracticeRequestingService, private router: Router) {
    }
    canActivate(): Observable<GuardResult> {
      return this.practiceRequestingService.text$.pipe(map( (result) => {
        if (!result.text) {
          this.router.navigate(['/profile']);
          return false;
        }
        return true;
      }));
    }
}
