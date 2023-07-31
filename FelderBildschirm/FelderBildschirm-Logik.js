let LetterData = new letterObject();
let ScreenData = new screenObject(200, 5);
function createScreenArray(tableLength, tableHeight) {
    for (let i = 0; i < tableHeight; i++) {
        const tableRow = [];
        for (let j = 0; j < tableLength; j++) {
            tableRow.push(0);
        }
        ScreenData.screenArray.push(tableRow);
    }
}
function pushLetter(letterIndex) {
    let letterMuster = LetterData.letterMusters[letterIndex];
    for (let i = 0; i < ScreenData.screenArray.length; i++) {
        for (let j = 0; j < letterMuster[0].length; j++) {
            ScreenData.screenArray[i].push(letterMuster[i][j]);
        }
    }
}
function pushText(letters) {
    letters = letters.toUpperCase();
    for (let letter of letters) {
        let letterIndex = LetterData.availableLetters.indexOf(letter);
        if (letterIndex == -1) {
            if ('ÄÖÜ'.includes(letter)) {
                pushUmlaut(letter);
                continue;
            }
            else {
                letterIndex = LetterData.availableLetters.indexOf('X');
            }
        }
        pushLetter(letterIndex);
    }
}
function pushUmlaut(letter) {
    let littleIndex = 'ÄÖÜ'.indexOf(letter);
    letter = 'AOU'[littleIndex];
    let letterIndex = LetterData.availableLetters.indexOf(letter);
    pushLetter(letterIndex);
    letterIndex = LetterData.availableLetters.indexOf('E');
    pushLetter(letterIndex);
}
function moveScreen() {
    for (let i = 0; i < ScreenData.screenArray.length; i++) {
        const row = ScreenData.screenArray[i];
        row.shift();
        if (row.length < ScreenData.screenLength) {
            row.push(0);
        }
    }
}
//# sourceMappingURL=FelderBildschirm-Logik.js.map