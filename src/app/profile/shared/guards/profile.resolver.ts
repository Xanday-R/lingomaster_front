import {Injectable} from '@angular/core';
import {ProfileModule} from '../../profile.module';
import {
  ActivatedRouteSnapshot, Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {LearningService} from '../../learning.service';
import {PracticeRequestingService} from '../../practice-requesting.service';

@Injectable({providedIn: ProfileModule})
export class ProfileResolver implements Resolve<void> {
  constructor(private  learningService: LearningService, private practiceRequestingService : PracticeRequestingService, private router: Router) {
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): void {
    if(!state.url.includes('/flashcards')) {
      if(!this.practiceRequestingService.isSubscribeOnTextRequesting()) {
        this.practiceRequestingService.subscribeOnTextRequesting();
        this.practiceRequestingService.askText$.next(null);
      }
      if(!this.learningService.isOnTextsRequestingSubscribe()) {
        this.learningService.subscribeTextsRequesting();
        this.learningService.askTexts$.next(null);
      }
    }
    if(!this.learningService.isOnWordsRequestingSubscribe()) {
      this.learningService.subscribeWordsRequesting();
      this.learningService.askWords$.next(null);
    }
  }
}
