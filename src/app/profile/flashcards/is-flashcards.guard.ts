import { Injectable } from '@angular/core';
import { ProfileModule } from '../profile.module';
import { CanActivate, GuardResult, Router } from '@angular/router';
import { PracticeRequestingService } from '../practice-requesting.service';
import { map, Observable } from 'rxjs';
import { LearningService } from '../learning.service';

@Injectable({providedIn: ProfileModule})
export class isFlashcardsGuard implements CanActivate {

  constructor(private learningService: LearningService, private router: Router) {
  }
  canActivate(): Observable<GuardResult> {
    if(!this.learningService.isOnWordsRequestingSubscribe()) {
      this.learningService.subscribeWordsRequesting();
      this.learningService.askWords$.next(null);
    }
    return this.learningService.words$.pipe(map( (result) => {
      if (!result!.length) {
        this.router.navigate(['/profile']);
        return false;
      }
      return true;
    }));
  }
}
