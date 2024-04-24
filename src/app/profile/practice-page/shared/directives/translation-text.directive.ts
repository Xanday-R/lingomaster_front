import {ComponentFactoryResolver, Directive, HostBinding, HostListener, ViewContainerRef} from '@angular/core';
import {PracticeRequestingService} from "../../../core/services/practice-requesting.service";
import {GlobalService} from "@core/services/global.service";
import {Languages} from "@core/enums/languages.enum";
import {PracticeProcessingService} from "../../core/services/practice-processing.service";
import {PrintTranslationComponent} from "../components/print-translation/print-translation.component";

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
    private globalService: GlobalService,
    private practiceRequesting : PracticeRequestingService,
    private practiceProcessing: PracticeProcessingService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  private nativeLanguageSubscription = this.globalService.nativeLanguage$.subscribe((result) => {
    this.nativeLanguage = result as Languages;
  })
  private languageTextSubscription = this.practiceProcessing.languageText$.subscribe((result) => {
    this.languageText = result;
  })
  private translateTextSubscription = this.practiceRequesting.translateText$.subscribe((result) => {
    const componentRef = this.viewContainerRef.createComponent(this.componentFactory);
    componentRef.instance.translatedText = result.translatedText;
    componentRef.instance.x = this.x;
    componentRef.instance.y = this.y;

  });

  @HostListener('document:selectionchange', ['$event']) onSelectionChange(event: Event) {
    this.viewContainerRef.clear();
    const selectedText = window.getSelection()!;
    //@ts-ignore
    this.x = selectedText.baseNode.parentNode.getBoundingClientRect().x-selectedText.baseNode.parentNode.getBoundingClientRect().width;
    //@ts-ignore
    this.y = selectedText.baseNode.parentNode.getBoundingClientRect().y - selectedText.baseNode.parentNode.getBoundingClientRect().height;
    this.practiceRequesting.askTranslateText$.next({text: selectedText.toString().replace(/\n\n/g, ' '), languageTranslate: this.nativeLanguage, languageText: this.languageText})
  }

  @HostListener('mousemove', ['$event']) mouseMove(event: MouseEvent) {
    // console.log(event);

  }

  ngOnDestroy() {
    this.translateTextSubscription.unsubscribe();
    this.nativeLanguageSubscription.unsubscribe();
    this.languageTextSubscription.unsubscribe();
  }

}
