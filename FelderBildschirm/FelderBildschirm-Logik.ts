let LetterData = new letterObject();
let ScreenData = new screenObject(200, 5);

function createScreenArray(tableLength: number, tableHeight: number) {
    for (let i = 0; i < tableHeight; i++) {
        const tableRow: number[] = [];

        for (let j = 0; j < tableLength; j++) {
            tableRow.push(0);
        }

        ScreenData.screenArray.push(tableRow);
    }
}

function pushLetter(letterIndex: number) {
    let letterMuster = LetterData.letterMusters[letterIndex];

    for (let i = 0; i < ScreenData.screenArray.length; i++) {
        for (let j = 0; j < letterMuster[0].length; j++) {
            ScreenData.screenArray[i].push(letterMuster[i][j]);
        }
    }
}

function pushText(letters: string) {
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

function pushUmlaut(letter:string) {
    let littleIndex: number = 'ÄÖÜ'.indexOf(letter);
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