import {
  trigger,
  transition,
  style,
  query,
  animate,
} from '@angular/animations';

export const fade = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 'auto',
        width: '96%',
        opacity: 0,
        transform: 'scale(0) translateY(100%)',
      }),
    ]),
    query(
      ':enter',
      [
        animate(
          '600ms ease',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' })
        ),
      ],
      { optional: true }
    ),
  ]),
]);
