

function getTemplate(tableSelector = '.wikitable') {
    const result = [];
    const allLetters = Array(...document.querySelectorAll(`${tableSelector} tr td:first-of-type a`)).map(e => e.innerText);
    for (let i = 0; i < allLetters.length - 2; i += 2 ) {
        result.push({
            upperCase: allLetters[i],
            lowerCase: allLetters[i+1],
            transcription: '',
            letterName: ''
        })
    }

    return result;
}