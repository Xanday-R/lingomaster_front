import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, GuardResult, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {map, Observable} from 'rxjs';
import {LearningService} from '../../learning.service';
import {PracticeRequestingService} from '../../practice-requesting.service';
import {ProfileModule} from '../../profile.module';

@Injectable({providedIn: ProfileModule})
export class CanDeactivateProfileGuard implements CanDeactivate<any> {
  constructor(private  learningService: LearningService, private practiceRequestingService : PracticeRequestingService, private router: Router) {
  }
  canDeactivate(component:any, currentRoute:ActivatedRouteSnapshot, currentState:RouterStateSnapshot, nextState:RouterStateSnapshot): boolean {
    if(!nextState.url.includes('/profile')) {
      if(this.learningService.isOnTextsRequestingSubscribe())
        this.learningService.destroyTextsRequestingSubscribe();
      if(this.learningService.isOnWordsRequestingSubscribe())
        this.learningService.destroyWordsRequestingSubscribe();
      if(this.practiceRequestingService.isSubscribeOnTextRequesting())
        this.practiceRequestingService.destroy();
    }
    return true;
  }
}
