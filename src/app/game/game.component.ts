import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { hiraganaTranscription, katakanaTranscription } from '../kana/kana';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject, Observable, Subject, Subscription, timer } from 'rxjs';
import { filter, tap } from 'rxjs/operators'
import { GlobalEventsService } from '../services/global-events.service';
import { Alphabet } from '../kana/type';
import { shuffleArray } from 'src/utils/shuffle-array';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger(
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
    ),
    trigger(
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
    )
  ]
})
export class GameComponent implements OnInit, OnDestroy {
    alphabets: Array<Alphabet> = ['hiragana']

    keyPressed$: Observable<KeyboardEvent>;

    currentTyping: string = '';
    currentKana: string = '';
    expectedTranscription: string = '';
    queue: string[] = [];
    isMissed = false;
    lastCorrectTime = 0;
    score = 0;

    vacabulary:{[key: string]: string} = {}

    nextKanaSubject = new BehaviorSubject('false');
    incorrectSubject = new BehaviorSubject('false');

    subscriptions: Subscription[] = [];

  constructor(private eventsService: GlobalEventsService) {
    this.keyPressed$ = this.eventsService.getKeyPressedObservable();
  }

  createVacabulary() {
    let vocab = {};

    this.alphabets.forEach(alphabet => {
        switch (alphabet) {
            case 'hiragana':
                vocab = {...this.vacabulary, ...hiraganaTranscription}
                break;
            case 'katakana':
                vocab = {...this.vacabulary, ...katakanaTranscription}
                break;
        
            default:
                break;
        }
    });

    return vocab;
  }

  ngOnInit(): void {
    const keyPressedSubscription = this.keyPressed$.subscribe(e => this.onKeyPressed(e.key));
    const nextKanaSubscription = this.nextKanaSubject.pipe(filter(e => e === 'false'))
        .subscribe(() => this.nextKana());

    this.subscriptions.push(keyPressedSubscription, nextKanaSubscription);
    this.startNewGame();
  }

  onCorrectAnimationDone(e: any) {
      if (e.fromState === 'false') {
          this.nextKanaSubject.next('false');
      }
  }

  onIncorrectAnimationDone(e: any) {
      if (e.fromState === 'false') {
          this.incorrectSubject.next('false');
      }
  }

  nextKana() {
    if (this.currentKana) {
        this.setScore();
    }
    this.clearTyping();
    this.currentKana = this.queue.pop() || '';
    if (this.currentKana === '') {
        return;
    }
    this.expectedTranscription = this.vacabulary[this.currentKana];
  }

  setScore() {
    let multiplier = this.isMissed ? 1 : 2;
    let timestamp = (+(new Date()) - this.lastCorrectTime) / 1000;
    let timescore = Math.round(1000 - (timestamp > 5 ? 1000 : timestamp * 200));
    // to 1 s - 1000
    this.score += (250 + timescore) * multiplier
    this.isMissed = false;
    this.lastCorrectTime = +new Date();
  }

  clearTyping() {
    this.currentTyping = '';
  }

  onKeyPressed(key: string) {
    this.currentTyping += key;

    if (!this.expectedTranscription.startsWith(this.currentTyping)) {
        this.clearTyping();
        this.incorrectSubject.next('true');
        return;
    }

    if (this.expectedTranscription === this.currentTyping) {
        this.nextKanaSubject.next('true');
    }
  }

  startNewGame() {
    this.currentKana = '';
    this.currentTyping = '';
    this.expectedTranscription = '';
    this.score = 0;
    this.isMissed = false;
    this.vacabulary = this.createVacabulary();
    this.queue = Object.keys(this.vacabulary);
    shuffleArray(this.queue);
    
    this.nextKana();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

}
