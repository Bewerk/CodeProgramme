//Hallo, Test hier.

function caesarChiffre(n: number, input: string):string {

    const shiftedChars: string[] = []

    for (let i = 0; i < input.length; i++) {

        let charnumber: number = input.charCodeAt(i);
        charnumber += n;

        while (charnumber < 0x20) {
            charnumber += (0x7e -0x1f);
        }

        if (charnumber > 0x7e) {
            charnumber = 0x1f + ((charnumber - 0x7f) % (0x7e - 0x1f));
        }

        shiftedChars.push(String.fromCharCode(charnumber));

    }

    return shiftedChars.join('');
}





console.log('caesar 2');
//console.log('Test 1', caesar2(1, 'test 1'));
//console.log('Test 2', caesar2(-1, 'test 2'));
console.log('Test 3', caesar2(-1, '{m,.-123=?{~'));
//console.log('Test 4', caesar2(5, 'Text zum übersetzen in geheimsprache!'));
//console.log('Test 5', caesar2(-1034, 'enter'));
//console.log('Test 6', caesar2(1000, 'vielverschoben, sehr weit.'));




// lässt die Zeichen von input um n rotieren, jedoch nur bestimmte Zeichenklassen untereinander.
function caesar2(n: number, input: string):string {
    const shiftedChars: string[] = []

    for (let i = 0; i < input.length; i++) {
        let charcode: number = input.charCodeAt(i);

        // für 0-9 rotieren:
        if (charcode > 47 && charcode <= 57) {
            charcode += n;

            while (charcode < 48) {
               charcode += 10;
            }

            if (charcode > 57) {
                charcode = 47 + ((charcode - 58) % 10);
            }
        }
        // für A-Z rotieren:
        else if (charcode > 64 && charcode <= 90) {
            charcode += n;

            while (charcode < 65) {
               charcode += 10;
            }

            while (charcode > 90) {
                charcode -= 26;
            }
        }
        // für a-z rotieren:
        else if (charcode > 96 && charcode <= 122) {
            charcode += n;

            while (charcode < 97) {
               charcode += 10;
            }

            while (charcode > 122) {
                charcode -= 26;
            }
        }
        //restliche Standardzeichen, baut auf vorherigen Bedingungen auf:
        else if (charcode > 32 && charcode <= 126) {
            let smallLetters: string = 'abcdefghijklmnoprstuvwxyz';
            //let bigletters: string = [...smallLetters.split()].toUpperCase();
            let specialChars: string = ',.;:öäü+#*~!"§$%&/()=<>';

            let truecode: number = null;
            if (charcode < 48) {
                truecode = charcode;
            }
            else if (charcode < 65) {
                truecode = charcode - 10;
            }
            else if (charcode < 97) {
                truecode = charcode - 36;
            }
            else {
                truecode = charcode - 62;
            }

            truecode += n;

            //126 - 62 = 64; 64 - 32 = 32
            while (truecode < 33) {
                truecode += 32
            }

            while (truecode > 64) {
                truecode -= 32;
            }

            if (truecode < 48) {
                charcode = truecode;
            }
            else if (truecode < 55) {
                charcode = truecode + 10;
            }
            else if (truecode < 61) {
                charcode = truecode + 36;
            }
            else {
                charcode = truecode + 62;
            }
        }

        shiftedChars.push(String.fromCharCode(charcode))
    }

    return shiftedChars.join('');
}