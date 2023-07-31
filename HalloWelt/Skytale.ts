// Verschlüsselungsmethoden a la Skytale. Funktion trueSkytale ist die dem historischen Verfahren korrekt nachempfundene.
// Funktion tooSkytale ist historisch nicht korrekt, funktioniert aber auch.
// Schlüssel n sollte nicht zu groß sein, sicher nicht über input.length besser n < input.length/2. Aber größer 1.


let test1: string = 'Spartanischer GeheimText: ein Rezept wie von Oma! 2 Löffel Salz, eine Tasse Tee.';
let test2: string = 'Ein Vogel fliegt auf den Schornstein, und blickt in den Schlot hinein.';
let test3: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let test4: string = 'Spartaner leben die Enthaltsamkeit. Ihre Feinde in der Regel nicht.';
let test5: string = '22Zeichen0123456789012';
let test6: string = 'abc, die Katze lief im Schnee.';

console.log(tooSkytale(6, test1));
console.log(unTooSkytale(6, tooSkytale(6, test1)));

console.log(tooSkytale(4, test2));
console.log(unTooSkytale(4, tooSkytale(4, test2)));

console.log(tooSkytale(39, test4));
console.log(unTooSkytale(39, tooSkytale(39, test4)));

console.log(trueSkytale(2, test4));
console.log(unTrueSkytale(2, trueSkytale(2, test4)));

console.log(trueSkytale(20, test1));
console.log(unTrueSkytale(20, trueSkytale(20, test1)));


/*
Der Text "Iamhurtverybadlyhelp" würde auf einer Skytale so aussehen:
       |   |   |   |   |   |  |
       | I | a | m | h | u |  |
     __| r | t | v | e | r |__|
    |  | y | b | a | d | l |
    |  | y | h | e | l | p |
    |  |   |   |   |   |   |
verschlüsselt entspräche das: "Iryyatbhmvaehedlurlp".
In der Funktion trueSkytale entspricht:
Der Schlüssel n der Anzahl Zeilen.
Die Variable cycle der Anzahl Spalten.
Die Funktion tooSkytale verschlüsselt als wäre:
cycle die Anzahl Zeilen.
n die Anzahl Spalten. 
*/
// entspricht nicht ganz der historischen Methode.
function tooSkytale(n:number, input:string): string {
    const encryptionArray: string[] = [];

    for (let i = 0; i < n; i++) {
        const hereArray: string[] = [];
        for (let j = 0; i + j*n < input.length; j++) {
            hereArray.push(input[i + j*n]);
        }
        encryptionArray.push(...hereArray);
    }

    return encryptionArray.join('');
}


function unTooSkytale(n: number, input: string): string {
    const uncryptArray: string[] = [];
    let cycle: number = Math.ceil(input.length/n);
    let give: number = Math.round((input.length/n % 1) * n);

    for (let i = 0; i < cycle; i++) {
        const hereArray: string[] = [];
        for (let j = 0; j < n; j++) {
            if (j < give || give == 0) {
                hereArray.push(input[i + j*cycle]);
            }
            else {
                hereArray.push(input[i + give*cycle + (j-give)*(cycle-1)]);
            }

            if (hereArray.length + uncryptArray.length == input.length) {
                break;
            }
        }
        uncryptArray.push(...hereArray);
    }

    return uncryptArray.join('');
}


// Funktioniert wie die historische Methode.
function trueSkytale(n:number, input:string): string {
    const encryptionArray: string[] = [];
    const inputArray: string[] = input.split('');
    let cycle: number = Math.ceil(input.length/n);

    for (let rest = 0; rest < cycle * n - input.length; rest++) {
        inputArray.push(' ');
    }

    for (let i = 0; i < cycle; i++) {
        const hereArray: string[] = [];
        for (let j = 0; j < n; j++) {
            hereArray.push(inputArray[i + j*cycle]);
        }
        encryptionArray.push(...hereArray);
    }

    return encryptionArray.join('');
}


function unTrueSkytale(n: number, input: string): string {
    const uncryptArray: string[] = [];
    let cycle: number = Math.ceil(input.length/n);

    for (let i = 0; i < n; i++) {
        const hereArray: string[] = [];
        for (let j = 0; j < cycle; j++) {
            hereArray.push(input[i + j*n])
        }
        uncryptArray.push(...hereArray);
    }

    return uncryptArray.join('');
}



/*
console.log('Test1:', alt2Skytale(3, 'Hallo Welt'));
console.log('Test2:', unaltSkytale(3,(alt2Skytale(3, 'Hallo Welt!'))));
console.log('Test3:', alt2Skytale(4, 'Spartaner verschluesseln sehr geheime Botschaften.'));
console.log('Test Skytale:', alt2Skytale(3,'Hallo Welt!'));
console.log('Test  alt2:', unaltSkytale(3, alt2Skytale(3,'Hallo Welt!')));


function unaltSkytale(n: number, input: string): string {
    const inputArray: string[] = input.split('');
    const uncryptArray: string[] = [];

    while (inputArray.length > 0) {
        for (let i = 0; i < n; i++) {
            inputArray.shift()
        }
        uncryptArray.push(inputArray.shift());
    }

    return uncryptArray.join('');
}


function altSkytale(n: number, input: string): string{
    const encryptionArray: string[] = [];

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < n; j++) {
            encryptionArray.push(String.fromCharCode(Math.floor(Math.random() * 96 + 32)));
        }
        encryptionArray.push(input[i]);
    }

    return encryptionArray.join('');
}




function alt2Skytale(n: number, input: string): string {
    // zeichenliste definiert die möglichen Zeichen, die zur Verschlüsselung eingefügt werden.
    // Um Zeichen wahrscheinlicher zu machen kann man diese mehrmals einfügen.
    // Auf \ achten.
    const charlist: string = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ ';
    const encryptionArray: string[] = [];

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < n; j++) {
            encryptionArray.push(charlist[Math.floor((Math.random() * charlist.length))]);
        }
        encryptionArray.push(input[i]);
    }

    return encryptionArray.join('');
}






//console.log('Ascii:', getascii(1));
/*
function getascii(n:number):string{
    const array = [];
    for (let i = 32; i < 256; i++) {
        array.push(String.fromCharCode(i));
    }
    return array.join('');
}
*/
