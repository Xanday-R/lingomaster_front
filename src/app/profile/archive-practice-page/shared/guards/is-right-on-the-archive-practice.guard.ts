import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";
import {GlobalService} from "../../../../core";
import {map, Observable} from "rxjs";
import {ProfileModule} from "../../../profile.module";
@Injectable({providedIn: ProfileModule})
export class isRightOnTheArchivePracticeGuard implements CanActivate {
  constructor(private  globalService: GlobalService, private router: Router) {
  }
  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<GuardResult> {
    this.globalService.askArchivePractice$.next({id_practice: Number(route.paramMap.get('id'))});
    return this.globalService.archivePractice$.pipe(
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
