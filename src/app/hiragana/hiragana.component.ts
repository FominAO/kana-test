import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hiragana',
  templateUrl: './hiragana.component.html',
  styleUrls: ['./hiragana.component.scss']
})
export class HiraganaComponent implements OnInit {
    hiragana = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ', 'ん', 'い', 'き', 'し', 'ち', 'に', 'ひ', 'み', '-', 'り', '-', '-', 'う', 'く', 'す', 'つ', 'ぬ', 'ふ', 'む', 'ゆ', 'る', '-', '-', 'え', 'け', 'せ', 'て', 'ね', 'へ', 'め', '-', 'れ', '-', '-', 'お', 'こ', 'そ', 'と', 'の', 'ほ', 'も', 'よ', 'ろ', 'を', '-']
  constructor() { }

  ngOnInit(): void {
  }

}
