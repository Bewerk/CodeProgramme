class gameDataClass {
    gameMode: number;
    colorAmount: number;
    columnAmount: number;
    rowAmount: number;
    fieldAmount: number;
    startTime: number;
    timeDifference: number;
    timerID: NodeJS.Timer;
    blinkIntervall: NodeJS.Timer;
    abklingintervall: NodeJS.Timer;
    isSuperklickReady: boolean;
    isGameRunning: boolean;
    isGameWon: boolean;
}