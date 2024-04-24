import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appFlashcards]',
  standalone: true
})
export class FlashcardsDirective {
  private firstPoint = 0;
  private lastPoint = 0;
  private i = 0
  private show = false;

  @Output() currentIndex: EventEmitter<number> = new EventEmitter();
  @Output() showTranslation : EventEmitter<boolean> = new EventEmitter();

  @Input() length = 0;

  constructor() { }

  setVisible(show: boolean) {
    this.show = show;
    this.showTranslation.emit(this.show);
  }

  setFirstPoint(x:number) {
    this.firstPoint = x;
  }

  setLastPoint(x:number) {
    this.lastPoint = x;
    if(this.firstPoint - this.lastPoint > 100) {
      this.i++;
      this.setVisible(false);
      this.currentIndex.emit(this.i % this.length);
    }else if(this.firstPoint - this.lastPoint < -100) {
      if( this.i == 0) this.i = this.length - 1;
      this.i--;
      this.setVisible(false);
      this.currentIndex.emit(this.i % this.length);
    }
  }

  @HostListener('mousedown', ['$event']) keyDown(event: MouseEvent) {
    this.setFirstPoint(event.x)
  }
  @HostListener('mouseup', ['$event']) keyUp(event: MouseEvent) {
    this.setLastPoint(event.x);
  }

  @HostListener('touchstart', ['$event'])  touchDown(event: TouchEvent) {
    this.setFirstPoint(event.touches[0].clientX);
  }

  @HostListener('touchend', ['$event'])  touchUp(event: TouchEvent) {
    this.setLastPoint(event.changedTouches[0].clientX);
  }

  @HostListener('click') click() {
    this.setVisible(!this.show);
  }
}
