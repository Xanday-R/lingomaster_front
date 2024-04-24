import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {SignUpService} from "./core/services/sign-up.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {Router} from "@angular/router";
import {GlobalService, LanguagesList, upperFirstChar} from '../../core';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule,
    HttpClientModule, MatSelect, MatOption, TranslateModule
  ],
  providers: [SignUpService],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  loginFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  nativeLanguageFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  public Languages:string[] = LanguagesList;

  private singUpServiceSubscription = this.signUpService.signUp$.subscribe((result) => {
    this.globalService.askAuth.next(null)
    setTimeout(() => {
      this.globalService.askInform(result, 'INFORM.SIGNED_UP', '/profile');
    }, 300)

  })

  constructor(private signUpService: SignUpService, private globalService: GlobalService, private router: Router) {}

  async signUp() {
    this.signUpService.askSignUp$.next({email: this.emailFormControl.value!, login: this.loginFormControl.value!, native_language: this.nativeLanguageFormControl.value!, password: this.passwordFormControl.value!});
  }

  ngOnDestroy() {
    this.singUpServiceSubscription.unsubscribe();
  }
}
