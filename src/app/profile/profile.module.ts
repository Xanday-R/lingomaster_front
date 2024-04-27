import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {provideRouter, Routes} from "@angular/router";
import {ProfileMainPageComponent} from "./profile-main-page/profile-main-page.component";
import {LearningService} from "./core/services/learning.service";
import {PracticeRequestingService} from "./core/services/practice-requesting.service";
import {isTakingPracticeGuard} from "./practice-page/shared/guards/is-taking-practice.guard";
import {isRightOnTheArchivePracticeGuard} from "./archive-practice-page/shared/guards/is-right-on-the-archive-practice.guard";
import {ArchivePracticeService} from "./archive-practice-page/core/services/archive-practice.service";
import {CanDeactivateProfileGuard} from "./shared/guards/canDeactiveProfile.guard";
import {ProfileResolver} from "./shared/guards/profile.resolver";


const routes: Routes = [
  {path: 'practice',  loadComponent: () => import('./practice-page/practice-page.component').then(m => m.PracticePageComponent), canActivate: [isTakingPracticeGuard], canDeactivate: [CanDeactivateProfileGuard]},
  {path: 'practice/archive/:id',  loadComponent: () => import('./archive-practice-page/archive-practice-page.component').then(m => m.ArchivePracticePageComponent), canActivate: [isRightOnTheArchivePracticeGuard], canDeactivate: [CanDeactivateProfileGuard]},
  {path: 'flashcards', loadComponent: () => import('./flashcards/flashcards.component').then(m => m.FlashcardsComponent), canDeactivate: [CanDeactivateProfileGuard], resolve: [ProfileResolver]},
  {path: '', loadComponent: () => import('./profile-main-page/profile-main-page.component').then(m => m.ProfileMainPageComponent), canDeactivate: [CanDeactivateProfileGuard], resolve: [ProfileResolver]}
]

@NgModule({
  providers: [provideRouter(routes), ArchivePracticeService, ProfileResolver, CanDeactivateProfileGuard,  LearningService, PracticeRequestingService,isTakingPracticeGuard, isRightOnTheArchivePracticeGuard],
  declarations: [],
  imports: [
    CommonModule,
    ProfileMainPageComponent
  ],
})
export class ProfileModule {
}
