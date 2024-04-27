import { Routes } from '@angular/router';
import {isAuthGuard} from "./shared/guards/isAuth.guard";
import {isNotAuthGuard} from "./shared/guards/isNotAuth.guard";
import {CanDeactivateProfileGuard} from "./profile/shared/guards/canDeactiveProfile.guard";

export const routes: Routes = [
  {path: 'profile', loadChildren: () => import("./profile/profile.module").then(m => m.ProfileModule), canActivateChild: [isAuthGuard]},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivateChild: [isNotAuthGuard]},
  {path: '', loadComponent: () => import("./main-page/main-page.component").then(m => m.MainPageComponent)},
  {path: '**', loadComponent: () => import("./404/404.component").then(m => m.PageIsNotFoundComponent)}
];
