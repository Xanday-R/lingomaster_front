import { PracticeRequestingService } from '../../../practice-requesting.service';
import { ComponentFactoryResolver, Directive, HostListener, ViewContainerRef } from '@angular/core';
import { Languages } from '@core/enums/languages.enum';
import { PrintTranslationComponent } from '../components/print-translation/print-translation.component';
import { PracticeProcessingService } from '../../core/services/practice-processing.service';
import { AccountInfoService } from '@core/services/account-info.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appTranslationText]',
  standalone: true
})
export class TranslationTextDirective {

  private nativeLanguage : Languages = Languages.english;
  private languageText : Languages = Languages.english;
  private componentFactory = this.componentFactoryResolver.resolveComponentFactory(PrintTranslationComponent);
  private x = 0;
  private y = 0;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private practiceRequesting : PracticeRequestingService,
    private practiceProcessing: PracticeProcessingService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private accountInfoService: AccountInfoService
  ) { }

  private nativeLanguageSubscription = this.accountInfoService.nativeLanguage$.pipe(takeUntilDestroyed()).subscribe((result) => {
    this.nativeLanguage = result as Languages;
  })

  private languageTextSubscription = this.practiceProcessing.languageText$.pipe(takeUntilDestroyed()).subscribe((result) => {
    this.languageText = result;
  })

  private translateTextSubscription = this.practiceRequesting.translateText$.pipe(takeUntilDestroyed()).subscribe((result) => {
    if(result.statusCode === 200) {
      const componentRef = this.viewContainerRef.createComponent(this.componentFactory);
      componentRef.instance.translatedText = result.translatedText;
      componentRef.instance.x = this.x;
      componentRef.instance.y = this.y;
    }
  });

  @HostListener('document:selectionchange', ['$event']) onSelectionChange(event: Event) {
    this.viewContainerRef.clear();
    const selectedText = window.getSelection()!;
    this.x = (selectedText as any).baseNode.parentNode.getBoundingClientRect().left;
    this.y = (selectedText as any).baseNode.parentNode.getBoundingClientRect().top;
    this.practiceRequesting.askTranslateText$.next({text: selectedText.toString().replace(/\n\n/g, ' '), languageTranslate: this.nativeLanguage, languageText: this.languageText})
  }
}
