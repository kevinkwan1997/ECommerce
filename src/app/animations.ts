import {
    trigger,
    transition,
    style,
    query,
    group,animateChild,
    animate,
    keyframes
} from '@angular/animations'

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        })
      ]),
      query(':enter', [
        style({ top: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-in-out', style({ top: '-100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-in-out', style({ top: '0%' }),)
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('* <=> FilterPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ top: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-in-out', style({ top: '-100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-in-out', style({ top: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);

export const fullItemEnterAnimation = 
trigger(
    'fullItemEnterAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('250ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('250ms', style({opacity: 0}))
      ])
    ]
  )