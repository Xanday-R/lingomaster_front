import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-print-translation',
  standalone: true,
  imports: [],
  templateUrl: './print-translation.component.html',
  styleUrl: './print-translation.component.scss'
})
export class PrintTranslationComponent {
  @Input() translatedText: string | undefined = '';
  @Input() x = 0;
  @Input() y = 0;
}
