import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alphabet } from './kana/type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kana-test';
  selectedAlphabet: Alphabet = 'hiragana';

  constructor(private readonly router: Router) {}

  getLink():string {
    return `game/${this.selectedAlphabet}`
  }
}
