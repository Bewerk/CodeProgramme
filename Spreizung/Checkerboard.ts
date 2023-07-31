//import {SpreizungObjekt} from './SpreizungData';
// import würde Datei zu Modul-Datei machen, deren Inhalt nur im eigenen Geltungsbereich verfügbar ist.
// Ohne den Import ist der Inhalt als Skript-Datei global verfügbar.
// -> Export Deklaration aus SpreizungData entfernt macht Import unnötig. Und Inhalte global. Das will ich hier?
// Zugriff auf SpreizungData war nicht möglich? -> Hier definieren.
class SpreizungObjekt {
    public alphabet: string;
    public keyword: string;
    public keynumbers: string;
    public input: string;
    public whichway: string;
    //public toEncryptElseDecrypt: boolean;
    // whichway und toEncryptElseDecrypt sind für den gleichen Zweck -> ob zu verschlüsseln oder entschlüsseln.
    
    constructor() {
        this.alphabet = '';
        this.keyword = '';
        this.keynumbers = '';
        this.input = '';
        this.whichway = '';
        //this.toEncryptElseDecrypt = true;
    }
}
const parameterObjekt = new SpreizungObjekt();
let AnswerNowNeedsToBe: string = 'encrypt';
function returnAnswerState(): string {
    return AnswerNowNeedsToBe;
}
// parameterObjekt bei jedem VerschlüsselungsVorgang setzen, um sicherzustellen dass die Parameter für die Runterlade-Dateien kohärent sind, 
// und nicht nachträglich einer in der Nutzeroberfläche geändert wurde.
//setParameterObjekt();
function setParameterObjekt() {
    parameterObjekt.keyword = document.getElementById('gradSchlüsselwort').innerHTML;
    parameterObjekt.alphabet = document.getElementById('gradZeichensatz').innerHTML;
    parameterObjekt.keynumbers = document.getElementById('gradSchlüsselziffern').innerHTML;
    parameterObjekt.input = (document.getElementById('AntwortFeld') as HTMLInputElement).value;
    parameterObjekt.whichway = returnAnswerState();
}



function onSpreizung() {
    AnswerNowNeedsToBe = 'decrypt';
    let keyword = document.getElementById('gradSchlüsselwort').innerHTML;
    let alphabet: string = document.getElementById('gradZeichensatz').innerHTML;
    let keynumbers: string = document.getElementById('gradSchlüsselziffern').innerHTML;
    let input: string = (document.getElementById('InputFeld') as HTMLInputElement).value;

    let parameterCheck = SpreizungsParameterCheck(keyword, keynumbers, alphabet, input);
    if (parameterCheck != 'ok') {
        (document.getElementById('AntwortFeld') as HTMLInputElement).value = parameterCheck;
        return;
    }

    // Verschlüsselung.
    let answer: string = matrixSpreizung(keyword, keynumbers, alphabet, input);

    /* Objekte ausprobieren. Unwichtig.
    let testobjekt = {result: answer, test1: 10};
    console.log(testobjekt, testobjekt.result, testobjekt.test1);
    //testobjekt.neuerWert = 12;
    //console.log(testobjekt, testobjekt.result, testobjekt.test1);

    let zweitObjekt = {
        //result: testobjekt.result,
        //test1: testobjekt.test1,
        ...testobjekt,
        verschachtelt: testobjekt,
        neuerWert: [1,2,3,4],
        // Funktion als Methode definierbar.
    };
    console.log('zweitObjekt', zweitObjekt);
    */
    /* Tabelle erstellen. Wird von createTabelle übernommen.
    // Tabelle für die Visualisierung der Zeichen-Ziffern Zuordnung zurücksetzen.
    // (Wäre auch ohne "BackUp" möglich, einfach Tabelle entfernen, und im Tabellencontainer neue Tabelle anlegen).
    const tabelleBackUp = document.getElementById('tabelleBackUp').innerHTML;
    document.getElementById('tabelle1').innerHTML = tabelleBackUp;

    // Tabelle der Matrix von Spreizung.js entsprechend erstellen.
    for (let i=0; i <= keynumbers.length; i++) {
        const currentRow = document.createElement("tr");
        document.getElementById('tabelle1').appendChild(currentRow);

        // Zeilen mit keynumbers versehen. (Erste Spalte füllen).
        const rowStart = document.createElement("th");
        if (i != 0) {
            rowStart.innerHTML = keynumbers[i-1];
        }
        currentRow.appendChild(rowStart);

        // Die erste Zeile darf nur in Nonkeynumbers Spalten besetzt sein.
        if (i == 0) {
            let index: number = 0;
            for (let j = 1; j <= 9; j++) {
                
                const newlyCreated = document.createElement("th");
                if (!keynumbers.includes(j.toString())) {
                    newlyCreated.innerHTML = matrix[0][index];
                    index++;
                }
                currentRow.appendChild(newlyCreated);
            }
        }
        // restliche Zeilen füllen.
        else if (i < matrix.length) {
            for (let j=0; j < matrix[i].length; j++) {
                const newlyCreated = document.createElement("th");
                newlyCreated.innerHTML = matrix[i][j];
                currentRow.appendChild(newlyCreated);
            }
        }
    }
    */
    
    const newMatrix: string[][] = returnMyMatrix();
    createTabelle(keynumbers, newMatrix);

    (document.getElementById('AntwortFeld') as HTMLInputElement).value = answer;
    setParameterObjekt();
}

function onEntSpreizung() {
    AnswerNowNeedsToBe = 'encrypt';
    let keyword = document.getElementById('gradSchlüsselwort').innerHTML;
    let alphabet: string = document.getElementById('gradZeichensatz').innerHTML;
    let keynumbers: string = document.getElementById('gradSchlüsselziffern').innerHTML;
    let input: string = (document.getElementById('InputFeld') as HTMLInputElement).value;

    let parameterCheck = entSpreizungsParameterCheck(keyword, keynumbers, alphabet, input);
    if (parameterCheck != 'ok') {
        (document.getElementById('AntwortFeld') as HTMLInputElement).value = parameterCheck;
        return;
    }

    let answer: string = matrixEntSpreizung(keyword, keynumbers, alphabet, input);

    const newMatrix: string[][] = returnMyMatrix();
    createTabelle(keynumbers, newMatrix);

    (document.getElementById('AntwortFeld') as HTMLInputElement).value = answer;
    setParameterObjekt();
}

function createTabelle(keynumbers: string, matrix: string[][]) {
    // Tabelle für die Visualisierung der Zeichen-Ziffern Zuordnung zurücksetzen.
    // (Wäre auch ohne "BackUp" möglich, einfach Tabelle entfernen, und im Tabellencontainer neue Tabelle anlegen).
    const tabelleBackUp = document.getElementById('tabelleBackUp').innerHTML;
    document.getElementById('tabelle1').innerHTML = tabelleBackUp;

    // Tabelle der Matrix von Spreizung.js entsprechend erstellen.
    for (let i=0; i <= keynumbers.length; i++) {
        const currentRow = document.createElement("tr");
        document.getElementById('tabelle1').appendChild(currentRow);

        // Zeilen mit keynumbers versehen. (Erste Spalte füllen).
        const rowStart = document.createElement("th");
        if (i != 0) {
            rowStart.innerHTML = keynumbers[i-1];
        }
        currentRow.appendChild(rowStart);

        // Die erste Zeile darf nur in Nonkeynumbers Spalten besetzt sein.
        if (i == 0) {
            let index: number = 0;
            for (let j = 1; j <= 9; j++) {
                
                const newlyCreated = document.createElement("td");//thtd
                if (!keynumbers.includes(j.toString())) {
                    newlyCreated.innerHTML = matrix[0][index];
                    newlyCreated.className = 'full';
                    index++;
                }
                else {
                    newlyCreated.className = 'empty';
                }
                currentRow.appendChild(newlyCreated);
            }
        }
        // restliche Zeilen füllen.
        else if (i < matrix.length) {
            for (let j=0; j < matrix[i].length; j++) {
                const newlyCreated = document.createElement("td");//thtd
                newlyCreated.innerHTML = matrix[i][j];
                newlyCreated.className = 'full';
                currentRow.appendChild(newlyCreated);
            }
        }
    }
}

function onNeueZeichen() {
    const neueZeichen: string = (document.getElementById('neuZeichensatz') as HTMLInputElement).value;

    document.getElementById('gradZeichensatz').innerHTML = neueZeichen;
}

function onNeuesWort() {
    const neuesWort: string = (document.getElementById('neuSchlüsselwort') as HTMLInputElement).value;

    document.getElementById('gradSchlüsselwort').innerHTML = neuesWort;
}

function onNeueZiffern() {
    const neueZiffern: string = (document.getElementById('neuSchlüsselziffern') as HTMLInputElement).value;

    document.getElementById('gradSchlüsselziffern').innerHTML = neueZiffern;
}

function onSetAlphabet() {
    document.getElementById('gradZeichensatz').innerHTML = 'abcdefghijklmnopqrstuvwxyz';
    (document.getElementById('neuZeichensatz') as HTMLInputElement).value = 'abcdefghijklmnopqrstuvwxyz';
}

function onSetAlphabetNumbersSpace() {
    document.getElementById('gradZeichensatz').innerHTML = 'abcdefghijklmnopqrstuvwxyz 1234567890';
    (document.getElementById('neuZeichensatz') as HTMLInputElement).value = 'abcdefghijklmnopqrstuvwxyz 1234567890';
}

function onRandomizeAlphabet() {
    let alphabet: string = document.getElementById('gradZeichensatz').innerHTML;

    let randomizedAlphabet: string = fisherYates(alphabet.split('')).join('');

    document.getElementById('gradZeichensatz').innerHTML = randomizedAlphabet;
}

function onTextAreaToSpreizung() {
    //AnswerNowNeedsToBe = 'decrypt';
    let keyword = document.getElementById('gradSchlüsselwort').innerHTML;
    let alphabet: string = document.getElementById('gradZeichensatz').innerHTML;
    let keynumbers: string = document.getElementById('gradSchlüsselziffern').innerHTML;
    let input: string = (document.getElementById('InputFeld') as HTMLTextAreaElement).value;

    let parameterCheck = SpreizungsParameterCheck(keyword, keynumbers, alphabet, input);
    if (parameterCheck != 'ok') {
        document.getElementById('AntwortFeld').innerHTML = parameterCheck;
        return;
    }

    // Verschlüsselung.
    let answer: string = matrixSpreizung(keyword, keynumbers, alphabet, input);
 
    const newMatrix: string[][] = returnMyMatrix();
    createTabelle(keynumbers, newMatrix);

    document.getElementById('AntwortFeld').innerHTML = answer;
}

function onChangeFileBlockDisplay() {
    let toShow: string = (document.getElementById('whichFileFormat') as HTMLInputElement).value;
    let txtBlock = document.getElementById('dateiblock');
    let xmlBlock = document.getElementById('XMLdateiblock');

    if (toShow == 'txt') {
        txtBlock.style.display = 'flex';
        xmlBlock.style.display = 'none';
    }
    else if (toShow == 'xml') {
        txtBlock.style.display = 'none';
        xmlBlock.style.display = 'flex';
    }
}