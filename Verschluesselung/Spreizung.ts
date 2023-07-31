//console.log(spreizung('aberz', '234', 'abcdefghijklmnopqrstuvwxyz', 'Test'));
//console.log(spreizung('aberz', '234', 'abcdefghijklmnopqrstuvwxyz', 'test'));
console.log(spreizung('irgendwasdabei', '23479', 'abcdefghijklmnopqrstuvwxyz ', 'begeben wir uns auf eine weitere verschluesselungsreise'));
console.log(entSpreizung('irgendwasdabei', '23479', 'abcdefghijklmnopqrstuvwxyz ', '268682682145231545392125452439284581218452381388584541852527293339825258333921625581258'));
console.log('Beispiel4:', spreizung('secret', '789', 'abcdefghijklmnopqrstuvwxyz', 'helloworld'));
console.log('Beispiel4 zurück:', entSpreizung('secret', '789', 'abcdefghijklmnopqrstuvwxyz', '752797983888347972'));


function spreizung(keyword: string, keynumbers: string, alphabet: string, input: string) {
// Verschlüsselung nach Spreizung/ Straddling Checkerboard.
    // Alphabet Reihenfolge setzen.
    // Wenn Zeichen im keyword aber nicht im Alphabet enthalten sind, werden diese hinzugefügt. ??Überprüfen?? ??umgekehrtes Alphabet??
    alphabet = keyword + alphabet;
    for (let i=alphabet.length -1; i > 0; i--) {
        if (alphabet.indexOf(alphabet[i]) < i) {
            alphabet = alphabet.slice(0,i) + alphabet.slice(i+1);
        }
    }
    //console.log(alphabet);

    // ??Überprüfen ob gültiger Schlüssel??
    let nonKeyNumbers: string = '123456789';

    for (let i=0; i< keynumbers.length; i++) {
        if (keynumbers.lastIndexOf(keynumbers[i]) > i || !nonKeyNumbers.includes(keynumbers[i])) {
            return 'ungültige keynumbers';
        }
    }

    // Ziffern in Schlüssel- und nicht-Schlüssel-Ziffern aufteilen.
    for (let i=nonKeyNumbers.length -1; i>=0; i--) {
        if (keynumbers.includes(nonKeyNumbers[i])) {
            nonKeyNumbers = nonKeyNumbers.slice(0,i) + nonKeyNumbers.slice(i+1);
        }
    }
    //console.log(nonKeyNumbers);

    // überprüfen ob ZahlenTabellenGröße für das Alphabet ausreicht.
    let maxalphabet: number = nonKeyNumbers.length + keynumbers.length * 9;
    if (alphabet.length > maxalphabet) {
        return 'Alphabet zu lang. Es passt nicht ins Feld.'
    }

    // überprüfen ob alle Zeichen des Inputs im Alphabet enthalten sind.
    for (let i=0; i<input.length; i++) {
        if (!alphabet.includes(input[i])) {
            return 'Es sind Zeichen im Input enthalten, die nicht im Alphabet enthalten sind.';
        }
    }

    // Alle Zeichen des Inputs chiffrieren.
    let toOutputArray: string[] = [];
    for (let i = 0; i < input.length; i++) {
        if (alphabet.indexOf(input[i]) < nonKeyNumbers.length) {
            toOutputArray.push(nonKeyNumbers[alphabet.indexOf(input[i])]);
        }
        else {
            let number1: string = keynumbers[Math.floor((alphabet.indexOf(input[i]) - nonKeyNumbers.length) / 9)];
            let number2AsNumber: number = ((alphabet.indexOf(input[i]) - nonKeyNumbers.length) % 9) +1;
            toOutputArray.push(number1 + number2AsNumber);
        }
    }
    //console.log(toOutputArray);

    return toOutputArray.join('');
}


function entSpreizung(keyword: string, keynumbers: string, alphabet: string, input: string) {
// Entschlüsselung nach Spreizung/ Straddling Checkerboard.
    // Alphabet Reihenfolge setzen.
    // Wenn Zeichen im keyword aber nicht im Alphabet enthalten sind, werden diese hinzugefügt. ??Überprüfen?? ??umgekehrtes Alphabet??
    alphabet = keyword + alphabet;
    for (let i=alphabet.length -1; i > 0; i--) {
        if (alphabet.indexOf(alphabet[i]) < i) {
            alphabet = alphabet.slice(0,i) + alphabet.slice(i+1);
        }
    }
    //console.log(alphabet);

    // ??Überprüfen ob gültiger Schlüssel??
    let nonKeyNumbers: string = '123456789';

    for (let i=0; i< keynumbers.length; i++) {
        if (keynumbers.lastIndexOf(keynumbers[i]) > i || !nonKeyNumbers.includes(keynumbers[i])) {
            return 'ungültige keynumbers';
        }
    }

    // Ziffern in Schlüssel- und nicht-Schlüssel-Ziffern aufteilen.
    for (let i=nonKeyNumbers.length -1; i>=0; i--) {
        if (keynumbers.includes(nonKeyNumbers[i])) {
            nonKeyNumbers = nonKeyNumbers.slice(0,i) + nonKeyNumbers.slice(i+1);
        }
    }
    //console.log(nonKeyNumbers);

    // überprüfen ob ZahlenTabellenGröße für das Alphabet ausreicht.
    let maxalphabet: number = nonKeyNumbers.length + keynumbers.length * 9;
    if (alphabet.length > maxalphabet) {
        return 'Alphabet zu lang. Es passt nicht ins Feld.'
    }

    // überprüfen ob alle Zeichen des Inputs Ziffern sind.
    for (let i=0; i<input.length; i++) {
        if (!'123456789'.includes(input[i])) {
            return 'Es sind Zeichen im Input enthalten, die keine Ziffern, oder eine Null sind';
        }
    }

    // Input in Ziffern-token aufspalten.
    const inputtokens: string[] = []
    for (let i=0; i<input.length; i++) {
        if (nonKeyNumbers.includes(input[i])) {
            inputtokens.push(input[i]);
        }
        if(keynumbers.includes(input[i])) {
            if (i < input.length - 1) {
                inputtokens.push(input[i] + input[i+1]);
                i++
            }
            else {
                return 'Ziffern-Zuweisungsproblem'
            }
        }
    }
    //console.log(inputtokens);

    // Übersetzen der Token.
    for (let i = 0; i < inputtokens.length; i++) {
        if (inputtokens[i].length == 1) {
            inputtokens[i] = alphabet[nonKeyNumbers.indexOf(inputtokens[i])];
        }
        else {
            let alphabetindex: number = nonKeyNumbers.length + (keynumbers.indexOf(inputtokens[i][0])) *9 + parseInt(inputtokens[i][1]) - 1;
            inputtokens[i] = alphabet[alphabetindex];
        }
    }

    return inputtokens.join('');
}



console.log(matrixSpreizung('secret', '789', 'abcdefghijklmnopqrstuvwxyz', 'helloworld'));


function matrixSpreizung(keyword: string, keynumbers: string, alphabet: string, input: string) {
    // Verschlüsselung nach Spreizung/ Straddling Checkerboard.
        // Alphabet Reihenfolge setzen.
        // Wenn Zeichen im keyword aber nicht im Alphabet enthalten sind, werden diese hinzugefügt. ??Überprüfen?? ??umgekehrtes Alphabet??
        alphabet = keyword + alphabet;
        for (let i=alphabet.length -1; i > 0; i--) {
            if (alphabet.indexOf(alphabet[i]) < i) {
                alphabet = alphabet.slice(0,i) + alphabet.slice(i+1);
            }
        }
        //console.log(alphabet);
    
        // ??Überprüfen ob gültiger Schlüssel??
        let nonKeyNumbers: string = '123456789';
    
        for (let i=0; i< keynumbers.length; i++) {
            if (keynumbers.lastIndexOf(keynumbers[i]) > i || !nonKeyNumbers.includes(keynumbers[i])) {
                return 'ungültige keynumbers';
            }
        }
    
        // Ziffern in Schlüssel- und nicht-Schlüssel-Ziffern aufteilen.
        for (let i=nonKeyNumbers.length -1; i>=0; i--) {
            if (keynumbers.includes(nonKeyNumbers[i])) {
                nonKeyNumbers = nonKeyNumbers.slice(0,i) + nonKeyNumbers.slice(i+1);
            }
        }
        //console.log(nonKeyNumbers);
    
        // überprüfen ob ZahlenTabellenGröße für das Alphabet ausreicht.
        let maxalphabet: number = nonKeyNumbers.length + keynumbers.length * 9;
        if (alphabet.length > maxalphabet) {
            return 'Alphabet zu lang. Es passt nicht ins Feld.'
        }

        // überprüfen ob alle Zeichen des Inputs im Alphabet enthalten sind.
        for (let i=0; i<input.length; i++) {
            if (!alphabet.includes(input[i])) {
                return 'Es sind Zeichen im Input enthalten, die nicht im Alphabet enthalten sind.';
            }
        }



        // Tabelle anlegen.
        const tabelle: string[][] = [];
        let rowstoadd: number = Math.ceil((alphabet.length - nonKeyNumbers.length) / 9);
        for (let i=0; i <= rowstoadd; i++) {
            tabelle.push([]);
        }
        for (let i=0; i<alphabet.length; i++) {
            if (i < nonKeyNumbers.length) {
                tabelle[0].push(alphabet[i]);
            }
            else {
                let tabellenindex: number = Math.ceil((i - (nonKeyNumbers.length -1)) / 9);
                tabelle[tabellenindex].push(alphabet[i]);
            }
        }
        console.log(tabelle);


        
        // Alle Zeichen des Inputs chiffrieren.
        let toOutputArray: string[] = [];
        for (let i = 0; i < input.length; i++) {
            if (alphabet.indexOf(input[i]) < tabelle[0].length) {
                toOutputArray.push(nonKeyNumbers[alphabet.indexOf(input[i])]);
            }
            else {
                let number1: string = keynumbers[Math.floor((alphabet.indexOf(input[i]) - nonKeyNumbers.length) / 9)];
                let number2AsNumber: number = ((alphabet.indexOf(input[i]) - nonKeyNumbers.length) % 9) +1;
                toOutputArray.push(number1 + number2AsNumber);
            }
        }
        //console.log(toOutputArray);
    
        return toOutputArray.join('');
    }