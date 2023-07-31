//import {SpreizungData} from './SpreizungData'

function onToFile() {
    let obParameter = (document.getElementById('obDateiMitParameter') as HTMLInputElement).value;
    let inhalt: string = '';

    if (obParameter == 'ohne') {
        //inhalt = (document.getElementById('AntwortFeld') as HTMLInputElement).innerHTML;
        inhalt = parameterObjekt.input;
    }
    else {
        //let alphabet: string = document.getElementById('gradZeichensatz').innerHTML;
        //let keyword: string = document.getElementById('gradSchlüsselwort').innerHTML;
        //let keynumbers: string = document.getElementById('gradSchlüsselziffern').innerHTML;
        //let antwort: string = (document.getElementById('AntwortFeld') as HTMLInputElement).innerHTML;

        // Variablen mithilfe parameterObjekt erstellen. parameterobjekt wird bei jedem Ver/EntschlüsselungsVorgang gesetzt, dadurch soll sichergestellt sein dass die Parameter kohärent sind.
        let alphabet: string = parameterObjekt.alphabet;
        let keyword: string = parameterObjekt.keyword;
        let keynumbers: string = parameterObjekt.keynumbers;
        let antwort: string = parameterObjekt.input;

        inhalt = alphabet + '\r\n' + keyword + '\r\n' + keynumbers + '\r\n' + antwort;
    }

    let file = new Blob([inhalt], {type: inhalt});
    let url = URL.createObjectURL(file);
    
    //let a = document.getElementById('download') as HTMLAnchorElement;
    let a = document.createElement('a');

    a.href = url;
    a.download = 'Geheimtext.txt';

    a.click()

    
    //document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
}

async function onFileToEncrypt() {
    const fileInput = document.getElementById('Dateieingabe') as HTMLInputElement;

    let theFile = fileInput.files;
    let blob = theFile[0];
    let text = await blob.text()//.then(result => {
    //    console.log('result', result)
    //});
    console.log(text);
    const liste = text.split('\r\n');

    let alphabet: string = liste[0];
    let keyword: string = liste[1];
    let keynumbers: string = liste[2];

    /*
    let keyObject = {
        alphabet: alphabet,
        keyword: keyword,
        keynumbers: keynumbers,
    } as SpreizungData;

    let keyObject2 = new SpreizungData(alphabet, keyword, keynumbers);
    keyObject.calculate();
    */

    let input: string = liste[3];
    
    document.getElementById('gradZeichensatz').innerHTML = alphabet;
    document.getElementById('gradSchlüsselwort').innerHTML = keyword;
    document.getElementById('gradSchlüsselziffern').innerHTML = keynumbers;
    (document.getElementById('InputFeld') as HTMLInputElement).value = input;

    let richtung = (document.getElementById('DateiVerarbeitungsRichtung') as HTMLInputElement).value;

    if (richtung == 'encrypt') {
        onSpreizung();
    }
    else if (richtung == 'decrypt') {
        onEntSpreizung();
    }
    else {
        console.log('DateiVerarbeitungsRichtung nicht verarbeitet')
    }

     /*
    for (let i=0; i<4; i++) {
        let index: number = 0;
        for (let j=0; j< liste[i].length; j++) {
            if (liste[i][j] == '"' || liste[i][j] == "'") {
                index = j;
                break;
            }
        }
    }
    */

    

    //let link = URL.createObjectURL(blob);
}

async function onXmlFileInput() {
    // Nicht fertig. Xml-Datei wird zu string gemacht und geparst. Parameter-Variablen werden gesetzt. Diese müssen noch weitergegeben werden und so.
    const fileInput = document.getElementById('xmlDateieingabe') as HTMLInputElement;
    let xmlText = await fileInput.files[0].text()

    console.log(xmlText);

    // weiß nicht genau wie das hier funktioniert, aber der Text wird vom DOMParser-Objekt als xml geparst und ich kann dann auf die xml-Nodes zugreifen.
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xmlText,"text/xml");

    // Parameter-Variablen aus xmlDokument holen.
    let alphabet = xmlDoc.getElementsByTagName("alphabet")[0].childNodes[0].nodeValue;
    let keyword = xmlDoc.getElementsByTagName("keyword")[0].childNodes[0].nodeValue;
    let keynumbers = xmlDoc.getElementsByTagName("keynumbers")[0].childNodes[0].nodeValue;
    let input = xmlDoc.getElementsByTagName("input")[0].childNodes[0].nodeValue;
    let whichway = xmlDoc.getElementsByTagName("input")[0].getAttributeNode("whichway").nodeValue;

    console.log('alphabet:', alphabet);
    console.log('keyword:', keyword);
    console.log('keynumbers:', keynumbers);
    console.log('input:', input);
    console.log('whichway:', whichway);

    document.getElementById('gradZeichensatz').innerHTML = alphabet;
    document.getElementById('gradSchlüsselwort').innerHTML = keyword;
    document.getElementById('gradSchlüsselziffern').innerHTML = keynumbers;
    (document.getElementById('InputFeld') as HTMLInputElement).value = input;

    if (whichway == 'encrypt') {
        document.getElementById('zuVerschlüsselnKnopf').click();
    }
    else if (whichway == 'decrypt') {
        document.getElementById('zuEntschlüsselnKnopf').click();
    }
    else {
        console.log('whichway liegt schief?:', whichway);
    }
}

function onXmlFileInputHttpRequestTest() {
    // soll die gleiche Funktion wie onXmlFileInput() erfüllen, aber mit xmlhttpRequest-Objekt, statt string zu parsen.
    const fileInput = document.getElementById('xmlDateieingabe') as HTMLInputElement
    const xmlFile = (document.getElementById('xmlDateieingabe') as HTMLInputElement).files[0];
    
    // xmlHttpRequest Objekt erstellen und mit Funktion versehen.
    let xmlHttpReqObject = new XMLHttpRequest();
    xmlHttpReqObject.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('Hussah');
            processTheXmlDoc(this);
        }
        else {
            console.log(this.readyState, this.status);
        }
    }

    // URL für xmlDatei erstellen, und xmlDatei an xmlHttpRequest Objekt senden
    let theURL = URL.createObjectURL(xmlFile);
    console.log(theURL);

    xmlHttpReqObject.open("GET", theURL, true);
    xmlHttpReqObject.send();

    // Funktion für das xmlHttpRequest Objekt, xmlDoc definieren ist das wichtige.
    function processTheXmlDoc(xmlObject: XMLHttpRequest) {
        let xmlDoc = xmlObject.responseXML;

        let alphabet = xmlDoc.getElementsByTagName("alphabet")[0].childNodes[0].nodeValue;
        let keyword = xmlDoc.getElementsByTagName("keyword")[0].childNodes[0].nodeValue;
        let keynumbers = xmlDoc.getElementsByTagName("keynumbers")[0].childNodes[0].nodeValue;
        let input = xmlDoc.getElementsByTagName("input")[0].childNodes[0].nodeValue;
        let whichway = xmlDoc.getElementsByTagName("input")[0].getAttributeNode("whichway").nodeValue;
    
        console.log('alphabet:', alphabet);
        console.log('keyword:', keyword);
        console.log('keynumbers:', keynumbers);
        console.log('input:', input);
        console.log('whichway:', whichway);

        document.getElementById('gradZeichensatz').innerHTML = alphabet;
        document.getElementById('gradSchlüsselwort').innerHTML = keyword;
        document.getElementById('gradSchlüsselziffern').innerHTML = keynumbers;
        (document.getElementById('InputFeld') as HTMLInputElement).value = input;

        if (whichway == 'encrypt') {
            document.getElementById('zuVerschlüsselnKnopf').click();
        }
        else if (whichway == 'decrypt') {
            document.getElementById('zuEntschlüsselnKnopf').click();
        }
        else {
            console.log('whichway liegt schief?:', whichway);
        }
    }
}

function onToXmlFile() {
    // Variablen setzen:
    /*
    let alphabet: string = document.getElementById('gradZeichensatz').innerHTML;
    let keyword: string = document.getElementById('gradSchlüsselwort').innerHTML;
    let keynumbers: string = document.getElementById('gradSchlüsselziffern').innerHTML;
    let input: string = (document.getElementById('AntwortFeld') as HTMLInputElement).innerHTML;
    let whichway: string = returnAnswerState();
    */
    // Variablen mithilfe parameterObjekt erstellen. parameterobjekt wird bei jedem Ver/EntschlüsselungsVorgang gesetzt, dadurch soll sichergestellt sein dass die Parameter kohärent sind.
    let alphabet: string = parameterObjekt.alphabet;
    let keyword: string = parameterObjekt.keyword;
    let keynumbers: string = parameterObjekt.keynumbers;
    let input: string = parameterObjekt.input;
    let whichway: string = parameterObjekt.whichway;

    // xml-Dokument und dessen Elemente erstellen:
    let xmlDoc = document.implementation.createDocument(null, "chiffredata");
    console.log(xmlDoc, xmlDoc.documentElement);
    let elementAlphabet = xmlDoc.createElement("alphabet");
    xmlDoc.documentElement.appendChild(elementAlphabet);
    let elementKeyword = xmlDoc.createElement("keyword");
    xmlDoc.documentElement.appendChild(elementKeyword);
    let elementKeynumbers = xmlDoc.createElement("keynumbers");
    xmlDoc.documentElement.appendChild(elementKeynumbers);
    let elementInput = xmlDoc.createElement('input');
    xmlDoc.documentElement.appendChild(elementInput);

    // Elemente mit Werten versehen:
    elementAlphabet.appendChild(xmlDoc.createTextNode(alphabet));
    elementKeyword.appendChild(xmlDoc.createTextNode(keyword));
    elementKeynumbers.appendChild(xmlDoc.createTextNode(keynumbers));
    elementInput.appendChild(xmlDoc.createTextNode(input));
    xmlDoc.getElementsByTagName('input')[0].setAttribute("whichway", whichway);

    /* funktioniert so nicht. Stattdessen das darüber.
    // Elemente mit Werten versehen:
    xmlDoc.getElementsByTagName('alphabet')[0].childNodes[0].nodeValue = alphabet;
    xmlDoc.getElementsByTagName('keyword')[0].childNodes[0].nodeValue = keyword;
    xmlDoc.getElementsByTagName('keynumbers')[0].childNodes[0].nodeValue = keynumbers;
    xmlDoc.getElementsByTagName('input')[0].childNodes[0].nodeValue = input;
    xmlDoc.getElementsByTagName('input')[0].setAttribute("whichway", whichway);
    */


    /* funktioniert nur mit URL, wenn ich URL habe, brauch ich string nicht mehr.
    let xmlHttpReqObject = new XMLHttpRequest();
    let xmlText: string = '';
    xmlHttpReqObject.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xmlText = this.responseText;
        }
    }
    let theURL = URL.createObjectURL(xmlDoc);

    xmlHttpReqObject.open("GET", theURL, true);
    xmlHttpReqObject.send();
    */

    let xmlAsString: string = new XMLSerializer().serializeToString(xmlDoc.documentElement);
    let file = new Blob([xmlAsString], {type: 'text/plain'});
    
    // test URI --- klappt nicht als url-Ersatz ---
    //let uri = encodeURI(xmlAsString);

    let url = URL.createObjectURL(file);
    //let a = document.getElementById('download') as HTMLAnchorElement;
    let a = document.createElement('a');
    a.href = url;
    a.download = 'SpreizungsText.xml';
    a.click();
    //document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}