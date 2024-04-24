import { Component } from '@angular/core';
import {AComponent} from "../../shared/components";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {concatMap, filter, firstValueFrom, from, map, mergeMap, Observable, switchMap, tap, toArray} from "rxjs";
import {AsyncPipe, CommonModule} from "@angular/common";
import {LearningService} from "../core/services/learning.service";
import {HttpClientModule} from "@angular/common/http";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import { SvgIconComponent} from "angular-svg-icon";
import {WordDialogComponent} from "./components/word-dialog/word-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateWordDialogComponent} from "./components/create-word-dialog/create-word-dialog.component";
import {GenerateTextDialogComponent} from "./components/generate-text-dialog/generate-text-dialog.component";
import {ShowTextDialogComponent} from "./components/show-text-dialog/show-text-dialog.component";
import {PracticeRequestingService} from "../core/services/practice-requesting.service";
import {Router, RouterLink} from "@angular/router";
import {GlobalService, IText, IWord, LanguagesList, ResponseFromServer, upperFirstChar} from "../../core";
import {TranslateModule} from "@ngx-translate/core";


@Component({
  selector: 'app-profile-main-page',
  standalone: true,
  providers: [],
  imports: [
    AComponent,
    MatTabGroup,
    MatTab,
    AsyncPipe,
    CommonModule,
    HttpClientModule, MatIcon, MatButtonModule, MatDividerModule, MatIconModule, SvgIconComponent, AsyncPipe, RouterLink, TranslateModule,
  ],
  templateUrl: './profile-main-page.component.html',
  styleUrl: './profile-main-page.component.scss'
})
export class ProfileMainPageComponent {
  readonly accountInfo:Observable<ResponseFromServer> = this.globalService.isAuth$;
  readonly words: Observable<IWord[]> = this.learningService.words$;
  readonly texts: Observable<IText[]> = this.learningService.texts$;
  readonly takingPractice:Observable<boolean> = this.practiceService.text$.pipe(map((e:ResponseFromServer) => !!e.text));

  private deleteWordSubscription = this.learningService.deleteWord$.subscribe((result) => {
    this.globalService.askInform(result, 'INFORM.WORD_DELETED');
    this.learningService.askWords$.next(null);
  });
  private deleteTextSubscription = this.learningService.deleteText$.subscribe((result) => {
    this.globalService.askInform(result, 'INFORM.TEXT_DELETED');
    this.learningService.askTexts$.next(null);
  });
  private changeWordSubscription = this.learningService.changeWord$.subscribe((result) => {
    this.globalService.askInform(result, 'INFORM.WORD_CHANGED');
    this.learningService.askWords$.next(null);
  });
  private createWordSubscription = this.learningService.createWord$.subscribe((result) => {
    this.globalService.askInform(result, 'INFORM.WORD_ADDED');
    this.learningService.askWords$.next(null);
  })
  private generateTextSubscription = this.learningService.generateText$.subscribe((result) => {
    this.globalService.askInform(result, 'INFORM.TEXT_GENERATED');
    this.learningService.askTexts$.next(null);
  })
  private startPracticeSubscription = this.practiceService.startPractice$.subscribe((result) => {
    this.practiceService.askText$.next(null);
    this.globalService.askInform(result, 'INFORM.PRACTICE_STARTED');
  })

  constructor(private globalService: GlobalService, private learningService: LearningService, private practiceService: PracticeRequestingService, private dialog: MatDialog, private router: Router) {}

  async changeWordDialog(word: IWord) {
    const dialogRef = this.dialog.open(WordDialogComponent, {
      data: word
    });
    let result = await firstValueFrom(dialogRef.afterClosed());
    if(!result) return;
    if(result.delete) {
      this.learningService.askDeleteWord$.next({id: word.id});
    }else {
      this.learningService.askChangeWord$.next({id: word.id, word: result.word, translation: result.translation})
    }
  }

  async createWordDialog() {
    const dialogRef = this.dialog.open(CreateWordDialogComponent);
    let result = await firstValueFrom(dialogRef.afterClosed());
    if(!result) return;
    this.learningService.askCreateWord$.next({word: result.word, language_word: result.language_word, translation: result.translation})
  }

  async generateTextDialog() {
    const dialogRef = this.dialog.open(GenerateTextDialogComponent,
      {data: this.words}
    );
    let result = await firstValueFrom(dialogRef.afterClosed());
    if(!result) return;
    this.learningService.askGenerateText$.next({words: result.words, language: result.language, topic: result.topic, level: result.level, format: result.format, name: result.name})
  }

  async openTextDialog(text: IText) {
    const dialogRef = this.dialog.open(ShowTextDialogComponent,
      {data: text}
    );
    const result = await firstValueFrom(dialogRef.afterClosed());
    if(!result) return;
    if(result.delete) {
      this.learningService.askDeleteText$.next({id: text.id});
    }else if(result.start) {
      this.practiceService.askStartPractice$.next({id_text: text.id, model: result.model})
    }
  }

  startFlashcards() {
    this.router.navigate(['/profile/flashcards']);
  }

  ngOnDestroy () {
    this.deleteWordSubscription.unsubscribe();
    this.deleteTextSubscription.unsubscribe();
    this.changeWordSubscription.unsubscribe();
    this.generateTextSubscription.unsubscribe();
    this.startPracticeSubscription.unsubscribe();
    this.createWordSubscription.unsubscribe();
  }
}
