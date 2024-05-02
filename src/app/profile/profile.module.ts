import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {provideRouter, Routes} from '@angular/router';
import {ProfileMainPageComponent} from './profile-main-page/profile-main-page.component';
import {LearningService} from './learning.service';
import {PracticeRequestingService} from './practice-requesting.service';
import {isTakingPracticeGuard} from './practice-page/shared/guards/is-taking-practice.guard';
import {isRightOnTheArchivePracticeGuard} from './archive-practice-page/is-right-on-the-archive-practice.guard';
import {ArchivePracticeService} from './archive-practice-page/archive-practice.service';
import {CanDeactivateProfileGuard} from './shared/guards/can-deactive-profile.guard';
import { isFlashcardsGuard } from './flashcards/is-flashcards.guard';
import { IsAuthGuard } from './shared/guards/is-auth.guard';
import { UpdateProfileResolver } from './shared/guards/update-profile.resolver';


const routes: Routes = [
  {
    path: 'practice',
    loadComponent: () => import('./practice-page/practice-page.component').then(m => m.PracticePageComponent),
    canActivate: [isTakingPracticeGuard],
    canDeactivate: [CanDeactivateProfileGuard],
    resolve: [UpdateProfileResolver]
  },
  {
    path: 'practice/archive/:id',
    loadComponent: () => import('./archive-practice-page/archive-practice-page.component').then(m => m.ArchivePracticePageComponent),
    canActivate: [isRightOnTheArchivePracticeGuard],
    canDeactivate: [CanDeactivateProfileGuard],
    resolve: [UpdateProfileResolver]
  },
  {
    path: 'flashcards',
    loadComponent: () => import('./flashcards/flashcards.component').then(m => m.FlashcardsComponent),
    canActivate: [isFlashcardsGuard],
    canDeactivate: [CanDeactivateProfileGuard],
    resolve: [UpdateProfileResolver]
  },
  {
    path: '',
    loadComponent: () => import('./profile-main-page/profile-main-page.component').then(m => m.ProfileMainPageComponent),
    canActivate: [IsAuthGuard],
    canDeactivate: [CanDeactivateProfileGuard],
    resolve: [UpdateProfileResolver]
  }
]

@NgModule({
  providers: [
    provideRouter(routes),
    ArchivePracticeService,
    IsAuthGuard,
    CanDeactivateProfileGuard,
    LearningService,
    PracticeRequestingService,
    isTakingPracticeGuard,
    isRightOnTheArchivePracticeGuard,
    isFlashcardsGuard,
    UpdateProfileResolver
  ],
  declarations: [],
  imports: [
    CommonModule,
    ProfileMainPageComponent
  ],
})
export class ProfileModule {
}
