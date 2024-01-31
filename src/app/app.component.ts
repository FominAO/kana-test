import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlphabetType } from './kana/type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kana-test';
  selectedAlphabet: AlphabetType = 'hiragana';

  constructor(private readonly route: ActivatedRoute) {
  }

  getLink():string {
    return `game/${this.selectedAlphabet}`
  }
}
