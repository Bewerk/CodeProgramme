function callEnigma() {
    let wether = document.getElementById('wetherDorEncrypt').value;
    let whichWay = true;
    if (wether === 'false') {
        whichWay = false;
    }
    const key = parseInt(document.getElementById('key').value);
    const input = document.getElementById('todecrypt').value;

    let answer = enigma(key, input, whichWay);

    document.getElementById('Antwort').innerHTML= answer;
}

function callSetCharSet() {
    let input = document.getElementById('charSetInput').value;
    
    let answer =  setCharSet(input);
    let nowisro1 = whatisro1();
    let nowisro2 = whatisro2();
    let nowisro3 = whatisro3();
    
    document.getElementById('myCharSet').innerHTML = answer;
    document.getElementById('Rotor1').innerHTML = nowisro1;
    document.getElementById('Rotor2').innerHTML = nowisro2;
    document.getElementById('Rotor3').innerHTML = nowisro3;
}


function callGenerateRotor() {
    let charSet = document.getElementById('charSetInput').innerHTML;
}

function callResetCharSetRotors() {
    let done = resetCharSetRotors();

    if(done) {
        document.getElementById('myCharSet').innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        document.getElementById('Rotor1').innerHTML = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
        document.getElementById('Rotor2').innerHTML = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
        document.getElementById('Rotor3').innerHTML = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
    }
}


function onChangeRotor(index) {
    if (index == 0) {
        let newRotor = document.getElementById('makero1').value;

        let answer = changeRotor(newRotor, index);

        if (answer) {
            document.getElementById('Rotor1').innerHTML = newRotor;
            document.getElementById('ro1error').innerHTML = '';
        }
        else if (!answer) {
            document.getElementById('ro1error').innerHTML = 'Etwas passt leider nicht. Sind alle Zeichen des Zeichensatzes genau einmal enthalten?';
        }
    }
    else if (index == 1) {
        let newRotor = document.getElementById('makero2').value;

        let answer = changeRotor(newRotor, index);

        if (answer) {
            document.getElementById('Rotor2').innerHTML = newRotor;
            document.getElementById('ro2error').innerHTML = '';
        }
        else if (!answer) {
            document.getElementById('ro2error').innerHTML = 'Etwas passt leider nicht. Sind alle Zeichen des Zeichensatzes genau einmal enthalten?';
        }
    }
    else if (index == 2) {
        let newRotor = document.getElementById('makero3').value;

        let answer = changeRotor(newRotor, index);

        if (answer) {
            document.getElementById('Rotor3').innerHTML = newRotor;
            document.getElementById('ro3error').innerHTML = '';
        }
        else if (!answer) {
            document.getElementById('ro3error').innerHTML = 'Etwas passt leider nicht. Sind alle Zeichen des Zeichensatzes genau einmal enthalten?';
        }
    }
    else {
        console.log('index-Variablen-Fehler');
    }
}