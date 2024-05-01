import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Formats, HEADER_TOKEN, IText, IWord, Languages, Levels, ResponseFromServer} from '@core/index';
import {environment} from '../../environments/environment';
import {
  auditTime, catchError, map, switchMap, of, ReplaySubject, Subject, Subscription, tap, throttleTime, startWith,
  throttle, timer
} from 'rxjs';

@Injectable()
export class LearningService {
  private headers = inject(HEADER_TOKEN);

  readonly askTexts$ = new Subject();
  readonly askWords$ = new Subject();
  readonly askChangeWord$:Subject<{id:number, word:string, translation:string}> = new Subject();
  readonly askCreateWord$:Subject<{language_word: Languages, word:string, translation:string}> = new Subject();
  readonly askGenerateText$:Subject<{ words: string, language: Languages, level:Levels, topic:string, format:Formats, name:string }> = new Subject();
  readonly askDeleteWord$:Subject<{id:number}> = new Subject();
  readonly askDeleteText$:Subject<{id:number}> = new Subject();

  readonly words$ = new ReplaySubject<IWord[]>(1);
  readonly texts$ = new ReplaySubject<IText[]>(1);

  readonly textsRequesting$ = this.askTexts$.pipe(
    switchMap(() => this.http.get<ResponseFromServer>(`${environment.apiUrl}/learning/get-all/texts`, this.headers())),
    map( (e) => (e.data)),
    tap((e) => {
      this.texts$.next(e as IText[]);
    })
  )
  readonly wordsRequesting$ = this.askWords$.pipe(
    switchMap(() => this.http.get<ResponseFromServer>(`${environment.apiUrl}/learning/get-all/words`, this.headers())),
    map((e) => e.data),
    tap((e) => {
      this.words$.next(e as IWord[]);
    })
  );

  readonly changeWord$ = this.askChangeWord$.pipe(switchMap(({id, word, translation}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/change-word`, {id, word, translation}, this.headers()).pipe(catchError((err) => of(err.error as ResponseFromServer)))));
  readonly createWord$ = this.askCreateWord$.pipe(switchMap(({language_word, word, translation}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/add-word`, {language_word, word, translation}, this.headers()).pipe(catchError((err) => of(err.error as ResponseFromServer)))));
  readonly generateText$ = this.askGenerateText$.pipe(switchMap(({ words, language, level, topic, format, name }) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/ai/generate-text`, { words, language, level, topic, format, name }, this.headers()).pipe(catchError((err) => of(err.error as ResponseFromServer)))));
  readonly deleteWord$ = this.askDeleteWord$.pipe(switchMap(({id}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/delete/words/${id}`, {}, this.headers()).pipe(catchError((err) => of(err.error as ResponseFromServer)))));
  readonly deleteText$ = this.askDeleteText$.pipe(switchMap(({id}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/delete/texts/${id}`, {}, this.headers()).pipe(catchError((err) => of(err.error as ResponseFromServer)))));

  private wordsRequestingSubscription : Subscription | undefined;
  private textsRequestingSubscription : Subscription | undefined;

  subscribeWordsRequesting() {
    this.wordsRequestingSubscription = this.wordsRequesting$.subscribe();
  }

  subscribeTextsRequesting() {
    this.textsRequestingSubscription = this.textsRequesting$.subscribe();
  }

  isOnWordsRequestingSubscribe() {
    return !!this.wordsRequestingSubscription && !this.wordsRequestingSubscription!.closed;
  }

  isOnTextsRequestingSubscribe() {
    return !!this.textsRequestingSubscription && !this.textsRequestingSubscription!.closed;
  }

  destroyWordsRequestingSubscribe() {
    this.wordsRequestingSubscription!.unsubscribe();
  }

  destroyTextsRequestingSubscribe() {
    this.textsRequestingSubscription!.unsubscribe();
  }

  constructor(private http: HttpClient) { }
}
