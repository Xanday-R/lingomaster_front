import {Component, inject} from '@angular/core';
import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AComponent} from '../a/a.component';
import {AuthService} from '../../../core';
import {environment} from '../../../../environments/environment';
import {TranslateModule} from '@ngx-translate/core';
import {MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {
  SelectLanguageInterfaceComponent
} from './components/select-language-interface/select-language-interface.component';
import {ButtonAComponent} from '../button-a/button-a.component';
import {CookieService} from '@core/services/cookie-service.service';
import {CONFIRMDIALOG_TOKEN} from '@core/providers/confirmDialog.provider';
import {MatIcon} from '@angular/material/icon';
import {ShowHideAnimation} from '../../animations/show-hide.animation';
import {RotateAnimation} from '../../animations/rotate.animation';

@Component({
  selector: 'app-nav',
  standalone: true,

  imports: [
    NgOptimizedImage,
    RouterLink,
    AComponent,
    AsyncPipe,
    TranslateModule,
    MatBottomSheetModule,
    ButtonAComponent,
    MatIcon,
    NgIf,
  ],
  animations: [ShowHideAnimation, RotateAnimation],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  public isAuthRequesting$ = this.authService.isAuth$;
  private confirm = inject(CONFIRMDIALOG_TOKEN);
  showAccountPart = false;
  constructor(protected authService: AuthService, private _bottomSheet: MatBottomSheet, private router: Router, private cookieService: CookieService) {
  }

  readonly environment = environment;

  changeLanguageInterface() {
    this._bottomSheet.open(SelectLanguageInterfaceComponent);
  }

  async signOut() {
    const result = await this.confirm('CONFIRM.SIGN_OUT');
    if(result) {
      this.cookieService.clearCookie();
      this.authService.isAuth$.next(false);
      this.router.navigate(['/']);
    }
  }


  protected readonly window = window;
}
