import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject, Observable, Subject, Subscription, timer } from 'rxjs';
import { filter, tap } from 'rxjs/operators'
import { GlobalEventsService } from '../services/global-events.service';
import { Alphabet, AlphabetType } from '../kana/type';
import { shuffleArray } from 'src/utils/shuffle-array';
import { armenianAlphabet } from '../kana/armenian';
import { hiraganaAlphabet } from '../kana/hiragana';
import { katakanaAlphabet } from '../kana/katakana';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

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
    alphabets: Array<AlphabetType> = [];

    keyPressed$: Observable<KeyboardEvent>;

    currentTyping: string = '';
    currentKana: string = '';
    expectedTranscription: string = '';
    queue: string[] = [];
    isMissed = false;
    lastCorrectTime = 0;
    score = 0;
    hint = '';

    vacabulary:{[key: string]: string} = {}

    nextKanaSubject = new BehaviorSubject('false');
    incorrectSubject = new BehaviorSubject('false');

    subscriptions: Subscription[] = [];

  constructor(private eventsService: GlobalEventsService, private readonly activatedRoute: ActivatedRoute) {
    this.keyPressed$ = this.eventsService.getKeyPressedObservable();

    this.activatedRoute.params.subscribe(e => console.log(e)
    )

    this.alphabets = [this.activatedRoute.snapshot.params.alph]; 
  }

  createVacabulary() {
    let vocab = {};

    this.alphabets.forEach(alphabet => {
        switch (alphabet) {
            case 'hiragana':
                vocab = {...vocab, ...(new Alphabet(hiraganaAlphabet).getAllTranscriptions())};
                break;
            case 'katakana':
                vocab = {...vocab, ...(new Alphabet(katakanaAlphabet).getAllTranscriptions())};
                break;
            case 'armenian':
                vocab = {...vocab, ...(new Alphabet(armenianAlphabet).getAllTranscriptions())}
                break;
            default:
                if (Object.keys(vocab).length === 0) {
                    console.warn(`No matches for alphabet "${alphabet}"`);
                }
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
  onHint() {
    this.hint = this.vacabulary[this.currentKana];
  }

  nextKana() {
    if (this.currentKana) {
        this.setScore();
    }
    this.hint = '';
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
