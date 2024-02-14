import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject, Observable, Subject, Subscription, combineLatest, of, timer } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators'
import { GlobalEventsService } from '../services/global-events.service';
import { Alphabet, AlphabetType } from '../kana/type';
import { shuffleArray } from 'src/utils/shuffle-array';
import { armenianAlphabet } from '../kana/armenian';
import { hiraganaAlphabet } from '../kana/hiragana';
import { katakanaAlphabet } from '../kana/katakana';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { correctAnimation, incorrectAnimation } from '../animations';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss'],
  animations: [
    correctAnimation,
    incorrectAnimation,
  ]
})
export class LearnComponent implements OnInit, OnDestroy {
    alphabets: Array<AlphabetType> = [];

    currentKana: string = '';
    currentSymbol = new BehaviorSubject({
      kana: '',
      transcription: ''
    });
    currentOptions = this.currentSymbol.pipe(map(symbol => this.getOptions(symbol)))
    expectedTranscription: string = '';
    expectedKana: string = '';
    queue: string[] = [];
    isMissed = false;
    lastCorrectTime = 0;
    score = 0;

    vacabulary:{[key: string]: string} = {}

    correctAnimationSubject = new BehaviorSubject('false');
    incorrectAnimationSubject = new BehaviorSubject('false');
    supportsTouch = false;

    subscriptions: Subscription[] = [];
    mobileKeyPressed$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private eventsService: GlobalEventsService, private readonly activatedRoute: ActivatedRoute) {
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

    const nextKanaSubscription = this.correctAnimationSubject.pipe(filter(e => e === 'false'))
        .subscribe(() => this.nextKana());

    this.subscriptions.push(nextKanaSubscription);
    this.startNewGame();
  }

  onCorrectAnimationDone(e: any) {
      if (e.fromState === 'false') {
          this.correctAnimationSubject.next('false');
      }
  }

  onIncorrectAnimationDone(e: any) {
      if (e.fromState === 'false') {
          this.incorrectAnimationSubject.next('false');
      }
  }

  onSelectKana(right: boolean) {
    if (right) {
      // this.correctAnimationSubject.next('true');
      this.nextKana();
    } else {
      this.incorrectAnimationSubject.next('true');

    }
  }

  nextKana() {
    // if (this.currentKana) {
    //     this.setScore();
    // }
    const currentKana = this.queue.pop() || '';

    console.log(currentKana);
    
    if (currentKana === '') {
      this.currentSymbol.next({kana: '', transcription: ''});
      return;
    }
    
    this.currentSymbol.next({kana: currentKana, transcription: this.vacabulary[currentKana]});
  }

  // setScore() {
  //   let multiplier = this.isMissed ? 1 : 2;
  //   let timestamp = (+(new Date()) - this.lastCorrectTime) / 1000;
  //   let timescore = Math.round(1000 - (timestamp > 5 ? 1000 : timestamp * 200));
  //   // to 1 s - 1000
  //   this.score += (250 + timescore) * multiplier;
  //   this.isMissed = false;
  //   this.lastCorrectTime = +new Date();
  // }

  startNewGame() {
    this.currentSymbol.next({kana: '', transcription: ''});

    this.score = 0;
    this.isMissed = false;
    this.vacabulary = this.createVacabulary();
    this.queue = Object.keys(this.vacabulary);
    shuffleArray(this.queue);
    
    this.nextKana();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getOptions(answer: { kana: string; transcription: string; }) {
    if (!answer || !answer.kana) {
      return;
    }

    const options = [answer.kana];
    const symbols = Object.keys(this.vacabulary);
    while (options.length < 4) {
      const i = Math.round(Math.random() * (symbols.length - 1));
      if (!options.includes(symbols[i])) {
        options.push(symbols[i]);
      }
    }

    shuffleArray(options);

    return options;
  }

}
