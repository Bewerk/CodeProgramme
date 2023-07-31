class screenObject {
    constructor(screenLength, screenHeight) {
        this.screenArray = [];
        this.screenLength = screenLength;
        this.screenHeight = screenHeight;
        this.pixelValues = ['AUS', 'AN'];
        this.screenInterval = null;
        this.screenSpeeds = [25, 35, 50, 75, 100, 150, 200, 300, 500, 700, 1000];
        this.speedIndex = 5;
        this.setScreenArrayBlank();
    }
    setScreenArrayBlank() {
        this.screenArray = [];
        for (let i = 0; i < this.screenHeight; i++) {
            const tableRow = [];
            for (let j = 0; j < this.screenLength; j++) {
                tableRow.push(0);
            }
            this.screenArray.push(tableRow);
        }
    }
    speedIncrease() {
        if (this.speedIndex > 0) {
            this.speedIndex--;
        }
    }
    speedDecrease() {
        if (this.speedIndex < this.screenSpeeds.length - 1) {
            this.speedIndex++;
        }
    }
}
class letterObject {
    constructor() {
        this.availableLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ !?.,1234567890-+=/():;\'';
        this.letterMusters = [aMuster, bMuster, cMuster, dMuster, eMuster, fMuster,
            gMuster, hMuster, iMuster, jMuster, kMuster, lMuster,
            mMuster, nMuster, oMuster, pMuster, qMuster, rMuster,
            sMuster, tMuster, uMuster, vMuster, wMuster, xMuster,
            yMuster, zMuster,
            spaceMuster, ausrufeMuster, frageMuster,
            punktMuster, kommaMuster,
            einsMuster, zweiMuster, dreiMuster, vierMuster,
            fuenfMuster, sechsMuster, siebenMuster, achtMuster,
            neunMuster, nullMuster,
            minusMuster, plusMuster, gleichMuster, slashMuster,
            aufklammerMuster, zuklammerMuster,
            dpunktMuster, semikolonMuster, apostrophMuster];
    }
}
const aMuster = [[0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],];
const bMuster = [[0, 1, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0],];
const cMuster = [[0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],];
const dMuster = [[0, 1, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0],];
const eMuster = [[0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0],];
const fMuster = [[0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],];
const gMuster = [[0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 1, 0],];
const hMuster = [[0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],];
const iMuster = [[0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],];
const jMuster = [[0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],];
const kMuster = [[0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],];
const lMuster = [[0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0],];
const mMuster = [[0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],];
const nMuster = [[0, 1, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0],];
const oMuster = [[0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],];
const pMuster = [[0, 1, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],];
const qMuster = [[0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0],];
const rMuster = [[0, 1, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],];
const sMuster = [[0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0],];
const tMuster = [[0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],];
const uMuster = [[0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],];
const vMuster = [[0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],];
const wMuster = [[0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0],];
const xMuster = [[0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],];
const yMuster = [[0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],];
const zMuster = [[0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0],];
;
const spaceMuster = [[0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],];
const ausrufeMuster = [[0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 0],
    [0, 1, 0],];
const frageMuster = [[0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],];
;
const punktMuster = [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 1, 0],];
;
const kommaMuster = [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 1, 0],
    [0, 1, 0],];
;
const einsMuster = [[0, 0, 1, 0,],
    [0, 1, 1, 0,],
    [0, 0, 1, 0,],
    [0, 0, 1, 0,],
    [0, 0, 1, 0,],];
;
const zweiMuster = [[0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0],];
;
const dreiMuster = [[0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0],];
;
const vierMuster = [[0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],];
;
const fuenfMuster = [[0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0],];
;
const sechsMuster = [[0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0],];
;
const siebenMuster = [[0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],];
;
const achtMuster = [[0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],];
;
const neunMuster = [[0, 0, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0],];
;
const nullMuster = [[0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],];
;
const minusMuster = [[0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],];
const plusMuster = [[0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],];
const gleichMuster = [[0, 0, 0, 0,],
    [0, 1, 1, 0,],
    [0, 0, 0, 0,],
    [0, 1, 1, 0,],
    [0, 0, 0, 0,],];
const slashMuster = [[0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],];
const aufklammerMuster = [[0, 0, 1, 0,],
    [0, 1, 0, 0,],
    [0, 1, 0, 0,],
    [0, 1, 0, 0,],
    [0, 0, 1, 0,],];
const zuklammerMuster = [[0, 1, 0, 0,],
    [0, 0, 1, 0,],
    [0, 0, 1, 0,],
    [0, 0, 1, 0,],
    [0, 1, 0, 0,],];
const dpunktMuster = [[0, 0, 0,],
    [0, 1, 0,],
    [0, 0, 0,],
    [0, 1, 0,],
    [0, 0, 0,],];
;
const semikolonMuster = [[0, 0, 0,],
    [0, 1, 0,],
    [0, 0, 0,],
    [0, 1, 0,],
    [0, 1, 0,],];
const apostrophMuster = [[0, 1, 0,],
    [0, 1, 0,],
    [0, 0, 0,],
    [0, 0, 0,],
    [0, 0, 0,],];
//# sourceMappingURL=FelderBildschirm-Daten.js.map