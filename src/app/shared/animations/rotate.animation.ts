import {animate, state, style, transition, trigger} from "@angular/animations";

export const RotateAnimation = trigger(
  'Rotate',
  [
    state('rotate', style({transform: 'rotate(180deg)'})),
    state('no',style({transform: 'rotate(0deg)'})),
    transition('rotate => no', [animate('1s ease-out')]),
    transition('no => rotate', [animate('1s ease-out')])
  ],
)
