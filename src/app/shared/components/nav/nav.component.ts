import {Component} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AComponent} from "../a/a.component";
import {GlobalService} from "../../../core";
import {environment} from "../../../../environments/environment";
import {TranslateModule} from "@ngx-translate/core";
import {MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {
  SelectLanguageInterfaceComponent
} from "./components/select-language-interface/select-language-interface.component";
import {ButtonAComponent} from "../button-a/button-a.component";

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
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  public isAuth$ = this.globalService.isAuth$;
  constructor(protected globalService: GlobalService, private _bottomSheet: MatBottomSheet, private router: Router) {
  }

  readonly environment = environment;

  private signOutSubscription = this.globalService.signOut$.subscribe(() => {
    this.globalService.askAuth.next(null);
    this.router.navigate(['/']);
  });

  changeLanguageInterface() {
    this._bottomSheet.open(SelectLanguageInterfaceComponent);
  }

  async signOut() {
    const result = await this.globalService.openConfirmDialog('CONFIRM.SIGN_OUT');
    if(result) this.globalService.askSignOut$.next(null);
  }

  ngOnDestroy() {
    this.signOutSubscription.unsubscribe();
  }
}
