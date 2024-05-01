import { Component } from '@angular/core';
import {ArchivePracticeService} from './archive-practice.service';
import {AsyncPipe, NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-archive-practice-page',
  standalone: true,
  providers: [],
  imports: [
    AsyncPipe,
    NgIf,
    TranslateModule
  ],
  templateUrl: './archive-practice-page.component.html',
  styleUrl: './archive-practice-page.component.scss'
})
export class ArchivePracticePageComponent {

  text$ = this.archivePracticeService.text$;
  essay$ = this.archivePracticeService.essay$
  aiCorrectionEssay$ = this.archivePracticeService.aiCorrectionEssay$;
  constructor(private archivePracticeService: ArchivePracticeService) {
  }

  ngOnDestroy() {
    this.archivePracticeService.destroy();
  }
}
