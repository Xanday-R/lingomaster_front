import {Injectable} from '@angular/core';
import {PracticeRequestingService} from "../../../core/services/practice-requesting.service";
import {filter, map, mergeMap, Observable, of, shareReplay, Subject} from "rxjs";
import {AuthService, ResponseFromServer} from "../../../../core";
import {ModelsPractice} from "../../../../core/enums/models-practice.enum";
import {Router} from "@angular/router";
import {getText} from "@core/utils/getText";

@Injectable()
export class PracticeProcessingService {

  private request = this.practiceRequesting.text$.pipe(
    mergeMap(async(value) => {
      if(value.statusCode == 401) {
        this.globalService.askAuth.next(null);
        await this.router.navigate(['/auth/log-in']);
      }
      return value;
    })
  );

  readonly options$ = this.request.pipe(
    map((e) => e.answers!),
    map((e) => e.reduce((acc:string[], value) => {
    if(!!acc.includes(value.answer)) return acc;
    return acc.concat(value.answer)
  }, [])))
  readonly isCheckedAnswers$  = this.request.pipe(map( (e) =>!!e.checkedAnswers!));
  readonly text$ = this.request.pipe(map(e => getText(e.model!, e.text!, e.answers!)));
  readonly essay$ = this.request.pipe(map(e => e.essay!));
  readonly model$ = this.request.pipe(map(e => e.model!));
  readonly languageText$ = this.request.pipe(map(e => e.languageText!));

  constructor(private practiceRequesting: PracticeRequestingService, private globalService: AuthService, private router: Router) {
  }
}
