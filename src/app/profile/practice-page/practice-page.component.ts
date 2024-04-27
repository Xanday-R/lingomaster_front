import {Component, inject} from '@angular/core';
import {RouterOutlet, Routes} from "@angular/router";
import {PracticeRequestingService} from "../core/services/practice-requesting.service";
import {firstValueFrom, map, merge, mergeMap, switchMap, tap} from "rxjs";
import {PracticeProcessingService} from "./core/services/practice-processing.service";
import {
  PlaceAnswerInsertingComponent
} from "./shared/components/place-answer-inserting/place-answer-inserting.component";
import {AuthService} from "../../core";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {PlaceAnswerWritingComponent} from "./shared/components/place-answer-writing/place-answer-writing.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslationTextDirective} from "./shared/directives/translation-text.directive";
import {CONFIRMDIALOG_TOKEN} from "@core/providers/confirmDialog.provider";
import {InformService} from "@core/services/inform-service.service";

@Component({
  selector: 'app-practice-page',
  standalone: true,
  imports: [
    RouterOutlet,
    PlaceAnswerInsertingComponent,
    PlaceAnswerWritingComponent,
    AsyncPipe,
    MatButton,
    NgIf,
    MatLabel,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    TranslateModule,
    TranslationTextDirective
  ],
  providers: [PracticeProcessingService],
  templateUrl: './practice-page.component.html',
  styleUrl: './practice-page.component.scss'
})
export class PracticePageComponent {
  private confirm = inject(CONFIRMDIALOG_TOKEN)
  readonly innerHtml = this.practiceProcessingService.text$;
  readonly isCheckedAnswers =  this.practiceProcessingService.isCheckedAnswers$!;
  readonly model$ = this.practiceProcessingService.model$.pipe(mergeMap((e) => this.translate.get(e)));
  essayFormControl = new FormControl('');
  private setUserInputSubscription = this.practiceRequestingService.setUserInput$.subscribe((result) => {})

  private checkAnswersSubscription = this.practiceRequestingService.checkAnswers$.subscribe((result) => {
    this.practiceRequestingService.askText$.next(null);
  });
  private isCheckedAnswersSubscription = this.isCheckedAnswers!.subscribe((result) => {})
  private markUserInputLikeAnotherAnswerSubscription = this.practiceRequestingService.markUserInputLikeAnotherAnswer$.subscribe((result) => {});
  private essayFormControlSubscription = this.practiceProcessingService.essay$.subscribe((result) => {
    this.essayFormControl.setValue(result, {emitEvent: false});
  })
  private saveEssaySubscription = this.practiceRequestingService.saveEssay$.subscribe((result) => {});
  private essaySubscription =  this.essayFormControl.valueChanges.subscribe((result) => {
    this.practiceRequestingService.askSaveEssay$.next({essay: result!});
  });
  private finishPracticeSubscription = this.practiceRequestingService.finishPractice$.subscribe((result) => {
    if(result.statusCode == 200)
        this.practiceRequestingService.askText$.next(null);
    this.informService.askInform(result, 'INFORM.FINISH_PRACTICE', '/profile');
  });
  private aiEssayCorrectionSubscription = this.practiceRequestingService.aiEssayCorrection.subscribe((result) => {
    if(result.statusCode == 200)
        this.practiceRequestingService.askText$.next(null);
    setTimeout(() => {
      this.informService.askInform(result, 'INFORM.ESSAY_CHECKED', '/profile/practice/archive/'+result.id_text);
    }, 300)

  })

  constructor(private practiceRequestingService: PracticeRequestingService, private practiceProcessingService: PracticeProcessingService, protected globalService: AuthService , private translate: TranslateService, private informService: InformService) {
  }

  checkAnswers() {
    this.practiceRequestingService.askCheckAnswers$.next(null);
  }

  async finishPractice() {
    const result = await this.confirm('CONFIRM.FINISH_PRACTICE');
    if(result) this.practiceRequestingService.askFinishPractice.next(null);
  }

  async sendEssayOnCorrection() {
    this.practiceRequestingService.askAiEssayCorrection.next({essay: this.essayFormControl.value!});
  }

  ngOnDestroy() {
    this.essaySubscription.unsubscribe();
    this.checkAnswersSubscription.unsubscribe();
    this.isCheckedAnswersSubscription.unsubscribe();
    this.markUserInputLikeAnotherAnswerSubscription.unsubscribe();
    this.saveEssaySubscription.unsubscribe();
    this.essayFormControlSubscription.unsubscribe();
    this.finishPracticeSubscription.unsubscribe();
    this.aiEssayCorrectionSubscription.unsubscribe();
    this.setUserInputSubscription.unsubscribe();
  }
}
