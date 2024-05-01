import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '@core/index';
import {map, Observable} from 'rxjs';
import {ProfileModule} from '../profile.module';
import {ArchivePracticeService} from './archive-practice.service';
@Injectable({providedIn: ProfileModule})
export class isRightOnTheArchivePracticeGuard implements CanActivate {
  constructor(private  archivePracticeService: ArchivePracticeService, private router: Router) {
  }
  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<GuardResult> {
    this.archivePracticeService.practiceRequestingSubscribe();
    this.archivePracticeService.askArchivePractice$.next({id_practice: Number(route.paramMap.get('id'))});
    return this.archivePracticeService.archivePractice$.pipe(
      map((result) => {
        if(result.statusCode != 200) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    )
  }
}
