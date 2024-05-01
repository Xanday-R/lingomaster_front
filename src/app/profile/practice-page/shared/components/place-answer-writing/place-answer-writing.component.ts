import {booleanAttribute, Component, Input} from '@angular/core';
import {PracticeRequestingService} from '../../../../practice-requesting.service';
import {PracticeProcessingService} from '../../../core/services/practice-processing.service';
import {AsyncPipe, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-place-answer-writing',
  standalone: true,
    imports: [
        MatFormField,
        MatSelect,
        MatOption,
        ReactiveFormsModule,
        AsyncPipe,
        FormsModule,
        MatCheckbox,
        NgIf,
        TranslateModule
    ],
  templateUrl: './place-answer-writing.component.html',
  styleUrl: '../place-answer.scss'
})
export class PlaceAnswerWritingComponent {
  @Input() userAnswer = '';
  @Input() indexAnswer = 0;
  @Input({transform: booleanAttribute}) disabled = false;
  @Input() isCorrectAnswer = false;
  @Input() rightAnswer = '';

  constructor(private practiceRequestingService: PracticeRequestingService, private practiceProcessingService: PracticeProcessingService) {
  }

  select(answer:string) {
    this.practiceRequestingService.askSetUserInput$.next({id_input: this.indexAnswer, userInput: answer});
  }

  markAnswerLikeAnother(mark : boolean) {
    this.practiceRequestingService.askMarkUserInputLikeAnotherAnswer$.next({id_input: this.indexAnswer, isCorrectAnswer: mark});
  }
}
