import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, switchMap, ReplaySubject, Subject, Subscription, tap} from 'rxjs';
import {AuthService, HEADER_TOKEN, ResponseFromServer} from '@core/index';
import {Router} from '@angular/router';
import {ModelsPractice} from '@core/enums/models-practice.enum';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {getText} from '@core/utils/getText';

@Injectable()
export class ArchivePracticeService {
  private headers = inject(HEADER_TOKEN);

  readonly askArchivePractice$:Subject<{id_practice: number}> = new Subject()

  readonly archivePractice$ = new ReplaySubject<ResponseFromServer>(1);
  readonly archivePracticeRequesting$ = this.askArchivePractice$.pipe(switchMap(({id_practice}) => this.http.get<ResponseFromServer>(`${environment.apiUrl}/learning/practice/archive/${id_practice}`, this.headers())), tap((e) => this.archivePractice$.next(e)));

  readonly text$ =  this.archivePractice$.pipe(map(e => getText(e.model!, e.text!, e.answers!)));
  readonly essay$ = this.archivePractice$.pipe(map((e) => e.essay!));
  readonly aiCorrectionEssay$ = this.archivePractice$.pipe(map((e) => e.ai_correct_essay!));

  private archivePracticeRequestingSubscription:Subscription | undefined;

  constructor(private globalService: AuthService, private router: Router, private http: HttpClient) {
  }

  isPracticeRequestingSubscribe() {
    return !!this.archivePracticeRequestingSubscription && !this.archivePracticeRequestingSubscription!.closed;
  }

  practiceRequestingSubscribe() {
    this.archivePracticeRequestingSubscription = this.archivePracticeRequesting$.subscribe();
  }

  destroy() {
    this.archivePracticeRequestingSubscription!.unsubscribe();
  }
}
