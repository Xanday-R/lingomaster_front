import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  BehaviorSubject,
  catchError, debounceTime, filter, mergeMap,
  of, ReplaySubject,
  startWith,
  Subject,
  switchMap, tap
} from "rxjs";
import {HEADER_TOKEN, Languages, ResponseFromServer} from "../../../core";
import {environment} from "../../../../environments/environment";
import {ModelsPractice} from "../../../core/enums/models-practice.enum";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {B} from "@angular/cdk/keycodes";
@Injectable()
export class PracticeRequestingService {
  private headers = inject(HEADER_TOKEN);

  readonly askText$ = new BehaviorSubject(null);
  readonly text$ = new ReplaySubject<ResponseFromServer>(1);
  private textRequesting$ = this.askText$.pipe(mergeMap(() => this.http.get<ResponseFromServer>(`${environment.apiUrl}/learning/practice/getText`, this.headers))).pipe(tap((result) => this.text$.next(result)));
  private textRequestingSubscription = this.textRequesting$.subscribe((result) => {});

  readonly askStartPractice$:Subject<{id_text:number, model:ModelsPractice}> = new Subject();
  readonly askSetUserInput$:Subject<{id_input:number, userInput: string}> = new Subject();
  readonly askCheckAnswers$ = new Subject();
  readonly askMarkUserInputLikeAnotherAnswer$ : Subject<{id_input: number, isCorrectAnswer: boolean}> = new Subject();
  readonly askSaveEssay$ : Subject<{essay: string}> = new Subject();
  readonly askFinishPractice = new Subject();
  readonly askAiEssayCorrection : Subject<{essay: string}>  = new Subject();
  readonly askTranslateText$:Subject<{text: string, languageText: Languages, languageTranslate: Languages}> = new Subject();

  readonly startPractice$ = this.askStartPractice$.pipe(mergeMap(( {id_text, model}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/practice/start`, {id_text, model}, this.headers).pipe(catchError((err) => {throw new Error(err)}))))
  readonly setUserInput$ = this.askSetUserInput$.pipe(mergeMap(({id_input, userInput}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/practice/setUserInput`, {id_input, userInput}, this.headers)));
  readonly checkAnswers$ = this.askCheckAnswers$.pipe(mergeMap(() => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/practice/confirmCheckAnswers`, {}, this.headers)));
  readonly markUserInputLikeAnotherAnswer$ = this.askMarkUserInputLikeAnotherAnswer$.pipe(mergeMap(({id_input, isCorrectAnswer}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/practice/markUserInputLikeAnotherAnswer`, {id_input, isCorrectAnswer}, this.headers)))
  readonly saveEssay$ = this.askSaveEssay$.pipe(debounceTime(5000), mergeMap(({essay}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/practice/saveEssay`, {essay}, this.headers)));
  readonly finishPractice$ = this.askFinishPractice.pipe(mergeMap(() => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/practice/finish`, {}, this.headers).pipe(catchError((err) => of(err.error as ResponseFromServer)))));
  readonly aiEssayCorrection = this.askAiEssayCorrection.pipe(mergeMap(({essay}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/practice/essay-correction`, {essay}, this.headers).pipe(catchError((err) => of(err.error as ResponseFromServer)))));
  readonly translateText$ = this.askTranslateText$.pipe(debounceTime(2000), filter((e) => e.text.length >= 4), mergeMap(( {text, languageText, languageTranslate}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/ai/translate-text`, {text, languageText, languageTranslate}, this.headers).pipe(catchError((err) => of(err.error as ResponseFromServer)))));

  constructor(private http: HttpClient) {
    this.setUserInput$.subscribe((result) => {})
    this.markUserInputLikeAnotherAnswer$.subscribe((result) => {});
    this.saveEssay$.subscribe((result) => {});
  }
}
