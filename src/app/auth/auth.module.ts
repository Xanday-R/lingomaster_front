import {inject, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {provideRouter, Routes} from "@angular/router";
import {LogInComponent} from "./log-in/log-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {RecoveryComponent} from "./recovery/recovery.component";

const routes: Routes = [
  {path: 'log-in', loadComponent: () => import('./log-in/log-in.component').then(m => m.LogInComponent)},
  {path: 'sign-up', loadComponent: () => import('./sign-up/sign-up.component').then(m => m.SignUpComponent)},
  {path: 'recovery', loadComponent: () => import('./recovery/recovery.component').then(m => m.RecoveryComponent)},
  {path: '', redirectTo: 'log-in', pathMatch: 'full'}
]
@NgModule({
  providers: [provideRouter(routes)],
  declarations: [],
  imports: [
    CommonModule,
    LogInComponent, SignUpComponent, RecoveryComponent
  ]
})
export class AuthModule { }
