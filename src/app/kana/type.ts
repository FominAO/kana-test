export type AlphabetType = 'katakana' | 'hiragana' | 'kanji' | 'armenian';


export type AlphabetConstructorElem = {
    upperCase: string,
    lowerCase: string,
    transcription: string,
    letterName: string,
}
export class Alphabet {
    dictionary : {[key: string]: {
        transcription: string,
        letterName: string,
    }} = {};

    constructor(alph: AlphabetConstructorElem[]) {
        this.init(alph);
        console.log(this.dictionary);
        
    }
    init(alph: AlphabetConstructorElem[]) {
        alph.forEach(letter => {
            this.dictionary[letter.upperCase] = {
                transcription: letter.transcription,
                letterName: letter.letterName
            }
            this.dictionary[letter.lowerCase] = {
                transcription: letter.transcription,
                letterName: letter.letterName
            }
        })
    }
    getTranscription(letter: string) {
        if (this.dictionary[letter]?.transcription) {
            return this.dictionary[letter].transcription
        }

        return null
    }
    getLetterName(letter: string) {
        if (this.dictionary[letter]?.letterName) {
            return this.dictionary[letter].transcription
        }

        return null
    }

    getAllTranscriptions() {
        const result: {[key: string]: string} = {};

        Object.keys(this.dictionary).forEach(letter => {
            result[letter] = this.dictionary[letter].transcription;
        });

        return result;
    }
}