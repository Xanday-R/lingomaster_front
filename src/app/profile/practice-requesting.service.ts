import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  auditTime,
  BehaviorSubject,
  catchError, debounceTime, filter, interval, merge, switchMap,
  of, pairwise, ReplaySubject, sampleTime,
  startWith,
  Subject, Subscription,
  tap, throttleTime, timer, bufferTime, skipUntil
} from 'rxjs';
import {HEADER_TOKEN, Languages, ResponseFromServer} from '@core/index';
import {environment} from '../../environments/environment';
import {ModelsPractice} from '@core/enums/models-practice.enum';
import {error} from '@angular/compiler-cli/src/transformers/util';
import {B} from '@angular/cdk/keycodes';
@Injectable()
export class PracticeRequestingService {
  private headers = inject(HEADER_TOKEN);

  readonly askText$ = new Subject();
  readonly text$ = new ReplaySubject<ResponseFromServer>(1);
  readonly textRequesting$ = this.askText$.pipe(
    switchMap(() => this.http.get<ResponseFromServer>(
      `${environment.apiUrl}/learning/practice/getText`,
      this.headers())
    )).pipe(tap(( result) =>{
      this.text$.next(result)
      }
    ));

  readonly askStartPractice$:Subject<{id_text:number, model:ModelsPractice}> = new Subject();
  readonly askSetUserInput$:Subject<{id_input:number, userInput: string}> = new Subject();
  readonly askCheckAnswers$ = new Subject();
  readonly askMarkUserInputLikeAnotherAnswer$ : Subject<{id_input: number, isCorrectAnswer: boolean}> = new Subject();
  readonly askSaveEssay$ : Subject<{essay: string}> = new Subject();
  readonly askFinishPractice = new Subject();
  readonly askAiEssayCorrection : Subject<{essay: string}>  = new Subject();
  readonly askTranslateText$:Subject<{text: string, languageText: Languages, languageTranslate: Languages}> = new Subject();

  readonly startPractice$ =  this.askStartPractice$.pipe(switchMap(( {id_text, model}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/practice/start`, {id_text, model}, this.headers()).pipe(catchError((err) => {return of(err.error)}))));
  readonly setUserInput$ = this.askSetUserInput$.pipe(switchMap(({id_input, userInput}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/practice/setUserInput`, {id_input, userInput}, this.headers())));
  readonly checkAnswers$ = this.askCheckAnswers$.pipe(switchMap(() => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/practice/confirmCheckAnswers`, {}, this.headers())));
  readonly markUserInputLikeAnotherAnswer$ = this.askMarkUserInputLikeAnotherAnswer$.pipe(switchMap(({id_input, isCorrectAnswer}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/practice/markUserInputLikeAnotherAnswer`, {id_input, isCorrectAnswer}, this.headers())))
  readonly saveEssay$ = this.askSaveEssay$.pipe(debounceTime(5000), switchMap(({essay}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/practice/saveEssay`, {essay}, this.headers())));
  readonly finishPractice$ = this.askFinishPractice.pipe(switchMap(() => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/practice/finish`, {}, this.headers()).pipe(catchError((err) => of(err.error as ResponseFromServer)))));
  readonly aiEssayCorrection = this.askAiEssayCorrection.pipe(switchMap(({essay}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/practice/essay-correction`, {essay}, this.headers()).pipe(catchError((err) => of(err.error as ResponseFromServer)))));
  readonly translateText$ = this.askTranslateText$.pipe(debounceTime(2000), filter((e) => e.text.length >= 4), switchMap(( {text, languageText, languageTranslate}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/ai/translate-text`, {text, languageText, languageTranslate}, this.headers()).pipe(catchError((err) => of(err.error as ResponseFromServer)))));

  private textRequestingSubscription:Subscription |undefined;

  subscribeOnTextRequesting() {
    this.textRequestingSubscription = this.textRequesting$.subscribe();
  }

  isSubscribeOnTextRequesting() {
    return !!this.textRequestingSubscription && !this.textRequestingSubscription!.closed;
  }

  destroy() {
    this.textRequestingSubscription!.unsubscribe();
  }
  constructor(private http: HttpClient) {
  }
}
