let zSatz = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let ro1 = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
let ro2 = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
let ro3 = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
console.log('zSatz:', zSatz);
console.log('ro1:', ro1);
console.log('ro2:', ro2);
console.log('ro3:', ro3);
function setCharSet(input) {
    // Zeichensatz-Eingabe auf Variable setzen.
    // Zeichen müssen einmalig im Zeichensatz enthalten sein. überschüssige Zeichen rausschneiden:
    const inputArray = input.split('');
    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray.lastIndexOf(inputArray[i]) > i) {
            inputArray.splice(i, 1);
            i--;
        }
    }
    zSatz = inputArray.join('');
    // Rotoren dazu generieren:  
    ro1 = fisherYates(inputArray).join('');
    ro2 = fisherYates(inputArray).join('');
    ro3 = fisherYates(inputArray).join('');
    console.log('zSatz:', zSatz);
    console.log('ro1:', ro1);
    console.log('ro2:', ro2);
    console.log('ro3:', ro3);
    return zSatz;
}
function fisherYates(inputArray) {
    for (let i = inputArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = inputArray[i];
        inputArray[i] = inputArray[j];
        inputArray[j] = k;
    }
    return inputArray;
}
//console.log(setCharSet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));
/*
console.log('AAA 4', enigma(4, 'AAA', true));
console.log(enigma(4, 'KQF', false));

console.log(enigma(9, 'EVERYONEISWELCOMEHERE', true));
console.log(enigma(9, 'PQSACVVTOISXFXCIAMQEM', false));

setCharSet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ,.ü');
console.log(enigma(5, 'Ein langer Text zum Verschlusseln und Proben ob es taugt', true));
console.log(enigma(5, enigma(5, 'Ein langer Text zum Verschlusseln und Proben ob es taugt', true), false));
*/
/*
let zeichen: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let rotor1: string = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
let rotor2: string = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
let rotor3: string = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';


function setRotors(charSet: string, r1:string, r2: string, r3: string) {
    zeichen = charSet;
    rotor1 = r1;
    rotor2 = r2;
    rotor3 = r3;
}
*/
function checkInput(input, charSet) {
    //Funktion zur Überprüfung ob die Eingabe zur Verschlüsselung mit dem Zeichensatz passt. Bei leerem String als Ausgabe ist alles okay.
    const missingchars = [];
    for (let i = 0; i < input.length; i++) {
        if (charSet.indexOf(input[i]) == -1) {
            if (missingchars.indexOf(input[i]) == -1) {
                missingchars.push(input[i]);
            }
        }
    }
    return missingchars.join('');
}
function checkRotor(charSet, rotor) {
    // Funktion zum überprüfen ob Rotoren zu Zeichensatz passen.
    if (charSet.length != rotor.length) {
        return false;
    }
    for (let i = 0; i < charSet.length; i++) {
        if (rotor.indexOf(charSet[i]) == -1) {
            return false;
        }
    }
    return true;
}
function enigma(key, input, encrypt) {
    // Zeichensatz an gültigen Zeichen. Jedes darf nur einmal vorkommen.
    // Alle im Zeichensatz enthaltenen Zeichen müssen in den Rotoren vorkommen.
    let zeichen = zSatz;
    let rotor1 = ro1;
    let rotor2 = ro2;
    let rotor3 = ro3;
    let missingcharstring = checkInput(input, zeichen);
    if (missingcharstring.length != 0) {
        return 'Die Eingabe enthält Zeichen die nicht im Zeichensatz enthalten sind: ' + "'" + missingcharstring + "'";
    }
    if (encrypt) {
        let caesarChiffriert = incrementalCaesar(key, input, zeichen);
        let gewälzt1 = rotorEncrypt(caesarChiffriert, rotor1, zeichen);
        let gewälzt2 = rotorEncrypt(gewälzt1, rotor2, zeichen);
        let gewälzt3 = rotorEncrypt(gewälzt2, rotor3, zeichen);
        console.log(input, caesarChiffriert, gewälzt1, gewälzt2, gewälzt3);
        return gewälzt3;
    }
    else {
        let rückWalze3 = rotorEncrypt(input, zeichen, rotor3);
        let rückWalze2 = rotorEncrypt(rückWalze3, zeichen, rotor2);
        let rückWalze1 = rotorEncrypt(rückWalze2, zeichen, rotor1);
        let dechiffriert = decryptIncrementalCaesar(key, rückWalze1, zeichen);
        console.log(input, rückWalze3, rückWalze2, rückWalze1, dechiffriert);
        return dechiffriert;
    }
}
/*
// Zeichensatz an gültigen Zeichen. Jedes darf nur einmal vorkommen.
// let alphabet: string = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_` abcdefghijklmnopqrstuvwxyz{|}~§äüöÄÖÜß';
let zeichen: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// Alle im Zeichensatz enthaltenen Zeichen müssen in den Rotoren vorkommen.
let rotor1: string = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
let rotor2: string = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
let rotor3: string = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';

let c1:string = incrementalCaesar(4, 'AAABCDEFGH', zeichen);
let r11: string = rotorEncrypt(c1, rotor1, zeichen);
let r12: string = rotorEncrypt(r11, rotor2, zeichen);
let r13: string = rotorEncrypt(r12, rotor3, zeichen);

console.log('AAABCDEFGH 4', c1, r11, r12, r13);

let er13: string = rotorEncrypt(r13, zeichen, rotor3);
let er12: string = rotorEncrypt(er13, zeichen, rotor2);
let er11: string = rotorEncrypt(er12, zeichen, rotor1);
let ec1: string = decryptIncrementalCaesar(4, er11, zeichen);

console.log('er13', er13);
console.log(er13, er12, er11, ec1);
*/
function incrementalCaesar(n, input, alphabet) {
    const encryptArray = [];
    for (let i = 0; i < input.length; i++) {
        let tocountfrom = alphabet.indexOf(input[i]);
        let topush = tocountfrom + n;
        topush = topush % alphabet.length;
        encryptArray.push(alphabet[topush]);
        n++;
    }
    return encryptArray.join('');
}
function decryptIncrementalCaesar(n, input, alphabet) {
    const encryptArray = [];
    for (let i = 0; i < input.length; i++) {
        let topush = alphabet.indexOf(input[i]) - n;
        while (topush < 0) {
            topush += alphabet.length;
        }
        encryptArray.push(alphabet[topush]);
        n++;
    }
    return encryptArray.join('');
}
function rotorEncrypt(input, rotor, alphabet) {
    const encryptArray = [];
    for (let i = 0; i < input.length; i++) {
        encryptArray.push(rotor[alphabet.indexOf(input[i])]);
    }
    return encryptArray.join('');
}
function whatisro1() {
    return ro1;
}
function whatisro2() {
    return ro2;
}
function whatisro3() {
    return ro3;
}
// Noch nicht fertig... jetzt wahrscheinlich schon.
function changeRotor(newRotor, index) {
    if (checkRotor(zSatz, newRotor)) {
        if (index == 0) {
            ro1 = newRotor;
        }
        else if (index == 1) {
            ro2 = newRotor;
        }
        else if (index == 2) {
            ro3 = newRotor;
        }
        else {
            return false;
        }
        return true;
    }
    return false;
}
function resetCharSetRotors() {
    zSatz = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    ro1 = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
    ro2 = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
    ro3 = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
    return true;
}
//# sourceMappingURL=inkrementellRotor.js.map