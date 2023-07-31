class screenObject {
    screenArray: number[][];
    screenLength: number;
    screenHeight: number;
    pixelValues: string[];
    screenInterval: NodeJS.Timer;
    screenSpeeds: number[];
    speedIndex: number;

    constructor(screenLength: number, screenHeight: number) {
        this.screenArray = [];
        this.screenLength = screenLength;
        this.screenHeight = screenHeight;
        this.pixelValues = ['AUS', 'AN'];
        this.screenInterval = null;
        this.screenSpeeds = [25,35,50,75,100,150,200,300,500,700,1000];
        this.speedIndex = 5;
        this.setScreenArrayBlank();
    }

    setScreenArrayBlank() {
        this.screenArray = [];

        for (let i = 0; i < this.screenHeight; i++) {
            const tableRow: number[] = [];
    
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
        if (this.speedIndex < this.screenSpeeds.length -1) {
            this.speedIndex++;
        }
    }
}

class letterObject {
    availableLetters: string;
    letterMusters: number[][][];

    constructor() {
        this.availableLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ !?.,1234567890-+=/():;\'';
        this.letterMusters = [  aMuster,bMuster,cMuster,dMuster,eMuster,fMuster,
                                gMuster,hMuster,iMuster,jMuster,kMuster,lMuster,
                                mMuster,nMuster,oMuster,pMuster,qMuster,rMuster,
                                sMuster,tMuster,uMuster,vMuster,wMuster,xMuster,
                                yMuster,zMuster,
                                spaceMuster,ausrufeMuster,frageMuster, 
                                punktMuster, kommaMuster,
                                einsMuster,zweiMuster,dreiMuster,vierMuster,
                                fuenfMuster,sechsMuster,siebenMuster,achtMuster,
                                neunMuster,nullMuster,
                                minusMuster,plusMuster,gleichMuster,slashMuster,
                                aufklammerMuster,zuklammerMuster,
                                dpunktMuster,semikolonMuster, apostrophMuster];
    }
}
const aMuster: number[][] = [   [0,0,1,0,0],
                                [0,1,0,1,0],
                                [0,1,1,1,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],];

const bMuster: number[][] = [   [0,1,1,0,0],
                                [0,1,0,1,0],
                                [0,1,1,0,0],
                                [0,1,0,1,0],
                                [0,1,1,0,0],];

const cMuster: number[][] = [   [0,0,1,0,0],
                                [0,1,0,1,0],
                                [0,1,0,0,0],
                                [0,1,0,1,0],
                                [0,0,1,0,0],];

const dMuster: number[][] = [   [0,1,1,0,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,1,1,0,0],];

const eMuster: number[][] = [   [0,1,1,1,0],
                                [0,1,0,0,0],
                                [0,1,1,1,0],
                                [0,1,0,0,0],
                                [0,1,1,1,0],];

const fMuster: number[][] = [   [0,1,1,1,0],
                                [0,1,0,0,0],
                                [0,1,1,0,0],
                                [0,1,0,0,0],
                                [0,1,0,0,0],];

const gMuster: number[][] = [   [0,0,1,1,0],
                                [0,1,0,0,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,0,1,1,0],];

const hMuster: number[][] = [   [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,1,1,1,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],];

const iMuster: number[][] = [   [0,1,0],
                                [0,1,0],
                                [0,1,0],
                                [0,1,0],
                                [0,1,0],];

const jMuster: number[][] = [   [0,1,1,1,0],
                                [0,0,0,1,0],
                                [0,0,0,1,0],
                                [0,1,0,1,0],
                                [0,0,1,0,0],];

const kMuster: number[][] = [   [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,1,1,0,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],];

const lMuster: number[][] = [   [0,1,0,0,0],
                                [0,1,0,0,0],
                                [0,1,0,0,0],
                                [0,1,0,0,0],
                                [0,1,1,1,0],];

const mMuster: number[][] = [   [0,1,0,0,0,1,0],
                                [0,1,1,0,1,1,0],
                                [0,1,0,1,0,1,0],
                                [0,1,0,0,0,1,0],
                                [0,1,0,0,0,1,0],];

const nMuster: number[][] = [   [0,1,0,0,1,0],
                                [0,1,1,0,1,0],
                                [0,1,0,1,1,0],
                                [0,1,0,0,1,0],
                                [0,1,0,0,1,0],];

const oMuster: number[][] = [   [0,0,1,0,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,0,1,0,0],];

const pMuster: number[][] = [   [0,1,1,0,0],
                                [0,1,0,1,0],
                                [0,1,1,0,0],
                                [0,1,0,0,0],
                                [0,1,0,0,0],];

const qMuster: number[][] = [   [0,0,1,1,0,0],
                                [0,1,0,0,1,0],
                                [0,1,0,0,1,0],
                                [0,1,0,1,0,0],
                                [0,0,1,0,1,0],];

const rMuster: number[][] = [   [0,1,1,0,0],
                                [0,1,0,1,0],
                                [0,1,1,0,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],];

const sMuster: number[][] = [   [0,0,1,1,0],
                                [0,1,0,0,0],
                                [0,1,1,1,0],
                                [0,0,0,1,0],
                                [0,1,1,0,0],];

const tMuster: number[][] = [   [0,1,1,1,0],
                                [0,0,1,0,0],
                                [0,0,1,0,0],
                                [0,0,1,0,0],
                                [0,0,1,0,0],];

const uMuster: number[][] = [   [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,1,1,1,0],];

const vMuster: number[][] = [   [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,0,1,0,0],];

const wMuster: number[][] = [   [0,1,0,0,0,1,0],
                                [0,1,0,0,0,1,0],
                                [0,1,0,1,0,1,0],
                                [0,1,0,1,0,1,0],
                                [0,0,1,0,1,0,0],];

const xMuster: number[][] = [   [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,0,1,0,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],];

const yMuster: number[][] = [   [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,0,1,0,0],
                                [0,0,1,0,0],
                                [0,1,0,0,0],];

const zMuster: number[][] = [   [0,1,1,1,0],
                                [0,0,0,1,0],
                                [0,0,1,0,0],
                                [0,1,0,0,0],
                                [0,1,1,1,0],];
;
const spaceMuster: number[][] = [   [0,0,0,0],
                                    [0,0,0,0],
                                    [0,0,0,0],
                                    [0,0,0,0],
                                    [0,0,0,0],];

const ausrufeMuster: number[][] = [ [0,1,0],
                                    [0,1,0],
                                    [0,1,0],
                                    [0,0,0],
                                    [0,1,0],];

const frageMuster: number[][] = [   [0,1,1,0,0],
                                    [0,0,0,1,0],
                                    [0,0,1,0,0],
                                    [0,0,0,0,0],
                                    [0,0,1,0,0],];
;
const punktMuster: number[][] = [   [0,0,0],
                                    [0,0,0],
                                    [0,0,0],
                                    [0,0,0],
                                    [0,1,0],];
                                    ;
const kommaMuster: number[][] = [   [0,0,0],
                                    [0,0,0],
                                    [0,0,0],
                                    [0,1,0],
                                    [0,1,0],];
;
const einsMuster: number[][] = [[0,0,1,0,],
                                [0,1,1,0,],
                                [0,0,1,0,],
                                [0,0,1,0,],
                                [0,0,1,0,],];
;
const zweiMuster: number[][] = [[0,1,1,0,0],
                                [0,0,0,1,0],
                                [0,0,1,0,0],
                                [0,1,0,0,0],
                                [0,1,1,1,0],];
                                ;
const dreiMuster: number[][] = [[0,1,1,0,0],
                                [0,0,0,1,0],
                                [0,0,1,0,0],
                                [0,0,0,1,0],
                                [0,1,1,0,0],];
                                ;
const vierMuster: number[][] = [[0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,1,1,1,0],
                                [0,0,0,1,0],
                                [0,0,0,1,0],];
                                ;
const fuenfMuster: number[][] = [   [0,1,1,1,0],
                                    [0,1,0,0,0],
                                    [0,1,1,0,0],
                                    [0,0,0,1,0],
                                    [0,1,1,0,0],];
                                ;
const sechsMuster: number[][] = [   [0,0,1,1,0],
                                    [0,1,0,0,0],
                                    [0,1,1,1,0],
                                    [0,1,0,1,0],
                                    [0,1,1,0,0],];
                                    ;
const siebenMuster: number[][] = [  [0,1,1,1,0],
                                    [0,0,0,1,0],
                                    [0,1,1,0,0],
                                    [0,0,1,0,0],
                                    [0,0,1,0,0],];
                                    ;
const achtMuster: number[][] = [[0,1,1,1,0],
                                [0,1,0,1,0],
                                [0,1,1,1,0],
                                [0,1,0,1,0],
                                [0,1,1,1,0],];
                                ;
const neunMuster: number[][] = [[0,0,1,1,0],
                                [0,1,0,1,0],
                                [0,1,1,1,0],
                                [0,0,0,1,0],
                                [0,1,1,0,0],];
                                ;
const nullMuster: number[][] = [[0,1,1,1,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,1,0,1,0],
                                [0,1,1,1,0],];
                                ;
const minusMuster: number[][] = [   [0,0,0,0,0],
                                    [0,0,0,0,0],
                                    [0,1,1,1,0],
                                    [0,0,0,0,0],
                                    [0,0,0,0,0],];
                                                                    
const plusMuster: number[][] = [[0,0,0,0,0],
                                [0,0,1,0,0],
                                [0,1,1,1,0],
                                [0,0,1,0,0],
                                [0,0,0,0,0],];
                                                                                          
const gleichMuster: number[][] = [  [0,0,0,0,],
                                    [0,1,1,0,],
                                    [0,0,0,0,],
                                    [0,1,1,0,],
                                    [0,0,0,0,],];
                                                      
const slashMuster: number[][] = [   [0,0,0,1,0],
                                    [0,0,0,1,0],
                                    [0,0,1,0,0],
                                    [0,1,0,0,0],
                                    [0,1,0,0,0],];

const aufklammerMuster: number[][] = [  [0,0,1,0,],
                                        [0,1,0,0,],
                                        [0,1,0,0,],
                                        [0,1,0,0,],
                                        [0,0,1,0,],];
                                                                        
const zuklammerMuster: number[][] = [   [0,1,0,0,],
                                        [0,0,1,0,],
                                        [0,0,1,0,],
                                        [0,0,1,0,],
                                        [0,1,0,0,],];
                                                                        
const dpunktMuster: number[][] = [  [0,0,0,],
                                    [0,1,0,],
                                    [0,0,0,],
                                    [0,1,0,],
                                    [0,0,0,],];
;                                                                    
const semikolonMuster: number[][] = [   [0,0,0,],
                                        [0,1,0,],
                                        [0,0,0,],
                                        [0,1,0,],
                                        [0,1,0,],];
                                                                                                           
const apostrophMuster: number[][] = [   [0,1,0,],
                                        [0,1,0,],
                                        [0,0,0,],
                                        [0,0,0,],
                                        [0,0,0,],];