import {animate, state, style, transition, trigger} from "@angular/animations";

export const ShowHideAnimation = trigger(
  'ShowHide',
  [
    state('show', style({minHeight: '60px'})),
    state('hide',style({height: '0px'})),
    transition('show => hide', [animate('1s ease-out')]),
    transition('hide => show', [animate('1s ease-out')])
  ],
)
