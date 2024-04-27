import {Injectable} from "@angular/core";
import {ProfileModule} from "../../profile.module";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  CanLoad, CanMatch, GuardResult, MaybeAsync, Resolve,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from "@angular/router";
import {LearningService} from "../../core/services/learning.service";
import {PracticeRequestingService} from "../../core/services/practice-requesting.service";

@Injectable({providedIn: ProfileModule})
export class ProfileResolver implements Resolve<void> {
  constructor(private  learningService: LearningService, private practiceRequestingService : PracticeRequestingService, private router: Router) {
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): void {
    if(!state.url.includes('/flashcards')) {
      if(!this.practiceRequestingService.isSubscribeOnTextRequesting())
        this.practiceRequestingService.subscribeOnTextRequesting();
      if(!this.learningService.isOnTextsRequestingSubscribe())
        this.learningService.subscribeTextsRequesting();
    }
    if(!this.learningService.isOnWordsRequestingSubscribe())
      this.learningService.subscribeWordsRequesting();
  }
}
