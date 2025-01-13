import { AlphabetsEnum } from "./alphabets.enum";
import { armenianAlphabet } from "./armenian";
import { hiraganaAlphabet } from "./hiragana";
import { katakanaAlphabet } from "./katakana";

export const Alphabets = {
    [AlphabetsEnum.Hiragana]: hiraganaAlphabet,
    [AlphabetsEnum.Katakana]: katakanaAlphabet,
    [AlphabetsEnum.Armenian]: armenianAlphabet,
}