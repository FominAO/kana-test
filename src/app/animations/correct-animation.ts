import { animate, state, style, transition, trigger } from '@angular/animations';

export const correctAnimation = trigger(
    'correct', [
        state(
            'false', 
            style({
                color: 'black',
                transform: 'scale(1)',
                opacity: '1'
            })
        ),
        state(
            'true',
            style({
                color: 'green',
                transform: 'scale(1.2)',
                opacity: '0'
            })
        ),
        transition('* => false', animate('0ms')),
        transition('* => true', animate('150ms'))
    ],
);
