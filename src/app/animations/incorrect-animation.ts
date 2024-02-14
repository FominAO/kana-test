import { animate, state, style, transition, trigger } from '@angular/animations';

export const incorrectAnimation = trigger(
    'incorrect', [
        state(
            'false', 
            style({
                color: 'black',
                transform: 'scale(1)'
            })
        ),
        state(
            'true',
            style({
                color: 'red',
                transform: 'scale(0.9)'
            })
        ),
        transition('* => false', animate('0ms')),
        transition('* => true', animate('150ms'))
    ],
);
