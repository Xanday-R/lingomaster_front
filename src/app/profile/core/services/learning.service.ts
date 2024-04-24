import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  BehaviorSubject, catchError,
  distinctUntilChanged,
  firstValueFrom, flatMap,
  interval,
  map, mergeAll, mergeMap, mergeMapTo,
  Observable, of, ReplaySubject,
  startWith, Subject,
  switchMap, switchScan, tap, throwError
} from "rxjs";
import {Formats, HEADER_TOKEN, IText, IWord, Languages, Levels, ResponseFromServer} from "../../../core";
import {environment} from "../../../../environments/environment";

@Injectable()
export class LearningService {
  private headers = inject(HEADER_TOKEN);

  readonly askTexts$ = new BehaviorSubject(null);
  readonly askWords$ = new BehaviorSubject(null);
  readonly askChangeWord$:Subject<{id:number, word:string, translation:string}> = new Subject();
  readonly askCreateWord$:Subject<{language_word: Languages, word:string, translation:string}> = new Subject();
  readonly askGenerateText$:Subject<{ words: string, language: Languages, level:Levels, topic:string, format:Formats, name:string }> = new Subject();
  readonly askDeleteWord$:Subject<{id:number}> = new Subject();
  readonly askDeleteText$:Subject<{id:number}> = new Subject();

  readonly words$ = new ReplaySubject<IWord[]>(1);
  readonly texts$ = new ReplaySubject<IText[]>(1);

  readonly textsRequesting$ = this.askTexts$.pipe(
    mergeMap(() => this.http.get<ResponseFromServer>(`${environment.apiUrl}/learning/get-all/texts`, this.headers)),
    map( (e) => (e.data)),
    tap((e) => {
      this.texts$.next(e as IText[]);
    })
  )
  readonly wordsRequesting$ = this.askWords$.pipe(
    mergeMap(() => this.http.get<ResponseFromServer>(`${environment.apiUrl}/learning/get-all/words`, this.headers)),
    map((e) => e.data),
    tap((e) => {
      this.words$.next(e as IWord[]);
    })
  );

  readonly changeWord$ = this.askChangeWord$.pipe(mergeMap(({id, word, translation}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/change-word`, {id, word, translation}, this.headers).pipe(catchError((err) => of(err.error as ResponseFromServer)))));
  readonly createWord$ = this.askCreateWord$.pipe(mergeMap(({language_word, word, translation}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/add-word`, {language_word, word, translation}, this.headers).pipe(catchError((err) => of(err.error as ResponseFromServer)))));
  readonly generateText$ = this.askGenerateText$.pipe(mergeMap(({ words, language, level, topic, format, name }) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/ai/generate-text`, { words, language, level, topic, format, name }, this.headers).pipe(catchError((err) => of(err.error as ResponseFromServer)))));
  readonly deleteWord$ = this.askDeleteWord$.pipe(mergeMap(({id}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/delete/words/${id}`, {}, this.headers).pipe(catchError((err) => of(err.error as ResponseFromServer)))));
  readonly deleteText$ = this.askDeleteText$.pipe(mergeMap(({id}) => this.http.post<ResponseFromServer>(`${environment.apiUrl}/learning/delete/texts/${id}`, {}, this.headers).pipe(catchError((err) => of(err.error as ResponseFromServer)))));

  private wordsRequestingSubscription = this.wordsRequesting$.subscribe();
  private textsRequestingSubscription = this.textsRequesting$.subscribe();

  constructor(private http: HttpClient) { }
}
