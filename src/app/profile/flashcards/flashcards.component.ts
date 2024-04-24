import {Component, Input} from '@angular/core';
import {LearningService} from "../core/services/learning.service";
import {Observable, Subscription} from "rxjs";
import {IWord} from "@core/types/response-from-server.type";
import {AsyncPipe, NgIf} from "@angular/common";
import {FlashcardsDirective} from "./shared/directives/flashcards.directive";

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    FlashcardsDirective
  ],
  templateUrl: './flashcards.component.html',
  styleUrl: './flashcards.component.scss'
})
export class FlashcardsComponent {
  readonly words$: Observable<IWord[]> = this.learningService.words$;
  @Input() currentIndex = 0;
  @Input() hideTranslation = true;
  constructor(private learningService: LearningService ) {
  }

  ngOnDestroy() {
  }
}
