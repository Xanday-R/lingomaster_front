import { Injectable } from '@angular/core';
import {BehaviorSubject, map, mergeMap, Subject} from "rxjs";
import {GlobalService, ResponseFromServer} from "../../../../core";
import {Router} from "@angular/router";
import {ModelsPractice} from "../../../../core/enums/models-practice.enum";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {getText} from "@core/utils/getText";

@Injectable()
export class ArchivePracticeService {

  // private getText(model: ModelsPractice , text:string, answers:ResponseFromServer['answers']) {
  //   let newText:any[] =[];
  //   let change = 0;
  //   answers!.forEach((value, index) => {
  //     const buff = text.slice(change, value.mustReplacePosition.begin-1);
  //     const isAbzac = buff.indexOf('\n');
  //     if(isAbzac != -1) {
  //       newText = newText.concat(buff.slice(0, isAbzac-1).split(' '));
  //       newText.push('\n');
  //       newText = newText.concat(buff.slice(isAbzac+1).split(' '));
  //     }else newText = newText.concat(buff.split(' '));
  //     newText.push({ text: model == ModelsPractice.insertingWordTranslation || model == ModelsPractice.writingWordTranslation  ? value.original : '', rightAnswer: value.answer , userAnswer: value.userAnswer, isCorrectAnswer: value.isCorrectAnswer});
  //     change = value.mustReplacePosition.end+1;
  //   });
  //   newText = newText.concat(text.slice(change).split(' '));
  //   return newText;
  // }

  readonly text$ =  this.globalService.archivePractice$.pipe(map(e => getText(e.model!, e.text!, e.answers!)));
  readonly essay$ = this.globalService.archivePractice$.pipe(map((e) => e.essay!));
  readonly aiCorrectionEssay$ = this.globalService.archivePractice$.pipe(map((e) => e.ai_correct_essay!));

  constructor(private globalService: GlobalService, private router: Router, private http: HttpClient) {

  }
}
