import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlphabetsEnum } from './kana/alphabets.enum';
import { GameMode } from './kana/game-mode.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kana-test';
  selectedAlphabet = AlphabetsEnum.Hiragana;
  selectedMode = GameMode.Classic;

  constructor(private readonly route: ActivatedRoute) {
  }
}
