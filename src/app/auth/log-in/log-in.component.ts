import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {LogInService} from "./core/services/log-in.service";
import {HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {AComponent} from "../../shared/components";
import {GlobalService, upperFirstChar} from "../../core";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-log-in',
  standalone: true,
  providers: [LogInService],
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule,
    HttpClientModule, AComponent, TranslateModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  private logInServiceІSubscription = this.logInService.logIn$.subscribe((result) => {
    this.globalService.askAuth.next(null);
    setTimeout(() => {
      this.globalService.askInform(result, 'INFORM.LOGGED_IN', '/profile')
    }, 300)

  });
  constructor(private logInService: LogInService, private globalService: GlobalService, private router: Router) {}
  logIn() {
    this.logInService.askLogIn$.next({email: this.emailFormControl.value!, password: this.passwordFormControl.value!})
  }

  ngOnDestroy() {
    this.logInServiceІSubscription.unsubscribe();
  }
}
