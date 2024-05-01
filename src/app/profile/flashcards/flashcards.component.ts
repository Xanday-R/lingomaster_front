import {Component, Input} from '@angular/core';
import {LearningService} from '../learning.service';
import {Observable} from 'rxjs';
import {IWord} from '@core/types/response-from-server.type';
import {AsyncPipe, NgIf} from '@angular/common';
import {FlashcardsDirective} from './flashcards.directive';

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
