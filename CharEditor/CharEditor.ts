function refreshTable() {
    const Attribute = getAttribute();

    document.getElementById('StrWert').innerHTML = Attribute.getAttribut(Attribut.Staerke).toString();
    document.getElementById('GesWert').innerHTML = Attribute.getAttribut(Attribut.Geschick).toString();
    document.getElementById('KonstWert').innerHTML = Attribute.getAttribut(Attribut.Konstitution).toString();
    document.getElementById('IntWert').innerHTML = Attribute.getAttribut(Attribut.Intelligenz).toString();
    document.getElementById('WeisWert').innerHTML = Attribute.getAttribut(Attribut.Weisheit).toString();
    document.getElementById('ChaWert').innerHTML = Attribute.getAttribut(Attribut.Charisma).toString();

    document.getElementById('EffektivStrWert').innerHTML = Attribute.getAttributEffektivWert(Attribut.Staerke).toString();
    document.getElementById('EffektivGesWert').innerHTML = Attribute.getAttributEffektivWert(Attribut.Geschick).toString();
    document.getElementById('EffektivKonstWert').innerHTML = Attribute.getAttributEffektivWert(Attribut.Konstitution).toString();
    document.getElementById('EffektivIntWert').innerHTML = Attribute.getAttributEffektivWert(Attribut.Intelligenz).toString();
    document.getElementById('EffektivWeisWert').innerHTML = Attribute.getAttributEffektivWert(Attribut.Weisheit).toString();
    document.getElementById('EffektivChaWert').innerHTML = Attribute.getAttributEffektivWert(Attribut.Charisma).toString();

    document.getElementById('Restpunkte').innerHTML = Attribute.restPunkte.toString();

    let volksBonusliste = document.getElementsByClassName('VolksBonus');
    for (let i = volksBonusliste.length -1; i >= 0; i--) {
        if (Attribute.AttributArray[i].VolksBonus > 0) {
            volksBonusliste[i].innerHTML = '+' + Attribute.AttributArray[i].VolksBonus.toString();
        }
        else {
            volksBonusliste[i].innerHTML = Attribute.AttributArray[i].VolksBonus.toString();
        }
    }

    let attributModifikatorListe = document.getElementsByClassName('AttributModifikator');
    for (let i = attributModifikatorListe.length -1; i >= 0; i--) {
        if (Attribute.AttributArray[i].Modifikator > 0) {
            attributModifikatorListe[i].innerHTML = '+' + Attribute.AttributArray[i].Modifikator.toString();
        }
        else {
            attributModifikatorListe[i].innerHTML = Attribute.AttributArray[i].Modifikator.toString();
        }
    }

    console.log(Attribute.Volk, Attribute.Klasse, Attribute);

    refreshFaehigkeitenliste(Attribute);
    refreshCharakterWerte();
}

function refreshFaehigkeitenliste(Attribute: CharakterObjekt) {
    Attribute.calcFaehigkeiten();
    let faehigkeitenliste = document.getElementById('FaehigkeitenListe');
    
    faehigkeitenliste.innerHTML = '';

    for (let i of Attribute.Faehigkeiten) {
        // .insertBerfore() Alternative Möglichkeit Elemente anzuhängen.
        let hereElement = document.createElement('div');
        let hereText = document.createTextNode(i.name);
        //hereElement.innerHTML = i.name;
        hereElement.className = 'TooltipHover';
        let hereDescription = document.createElement('span');
        hereDescription.innerHTML = i.beschreibung;
        hereDescription.className = 'Tooltip';

        hereElement.appendChild(hereDescription);
        hereElement.insertBefore(hereText, hereDescription);
        faehigkeitenliste.appendChild(hereElement);
    }
}

function refreshCharakterWerte() {
    Charakter.calcTrefferPunkte();
    document.getElementById('Trefferpunkte').innerHTML = Charakter.trefferpunkte.toString();

    Charakter.calcRuestungsklasse();
    document.getElementById('RKGesamt').innerHTML = Charakter.ruestungsklasseGesamt.toString();
    document.getElementById('RKBeruehr').innerHTML = Charakter.ruestungsklasseBeruehr.toString();
    document.getElementById('RKPanzer').innerHTML = Charakter.ruestungsklassePanzer.toString();

    Charakter.calcGrundAngriffsBonus();
    document.getElementById('NahkampfBonus').innerHTML = Charakter.nahkampfBonus.toString();
    document.getElementById('FernkampfBonus').innerHTML = Charakter.fernkampfBonus.toString();
}

function onChangeAttribut(attributIndex: number, plusElseMinus: boolean) {
    const attributsListe = [Attribut.Staerke, Attribut.Geschick, Attribut.Konstitution, Attribut.Intelligenz, Attribut.Weisheit, Attribut.Charisma];
    let givenAttribut = attributsListe[attributIndex];

    changeAttributsWert(givenAttribut, plusElseMinus);
    refreshTable();
}

function onSelectVolk() {
    let volk: string = (document.getElementById('VolksWahl') as HTMLSelectElement).value;

    let list = document.getElementsByClassName('VolksBeschreibung') as HTMLCollectionOf<HTMLDivElement>;

    for (const x of list) {
        x.style.display = 'none';
    }

    document.getElementById(volk).style.display = 'block';

    setVolksBoni(volk);

    refreshTable();
}

function onSelectCharKlasse() {
    let charKlasse: string = (document.getElementById('KlassenWahl') as HTMLInputElement).value;

    let list = document.getElementsByClassName('KlassenBeschreibung') as HTMLCollectionOf<HTMLDivElement>;

    for (const x of list) {
        x.style.display = 'none';
    }

    setCharKlasse(charKlasse);

    document.getElementById(charKlasse).style.display = 'block';
    refreshTable();
}

function resetSelects() {
    (document.getElementById('VolksWahl') as HTMLSelectElement).value = 'Mensch';
    (document.getElementById('KlassenWahl') as HTMLSelectElement).value = 'Kaempfer';
}
/*
function onMinusStr() {
    minusStr();
    refreshTable();
}

function onPlusStr() {
    plusStr();
    refreshTable();
}


function onMinusGes() {
    minusGes();
    refreshTable();
}

function onPlusGes() {
    plusGes();
    refreshTable();
}

function onMinusKonst() {
    minusKonst();
    refreshTable();
}

function onPlusKonst() {
    plusKonst();
    refreshTable();
}

function onMinusInt() {
    minusInt();
    refreshTable();
}

function onPlusInt() {
    plusInt();
    refreshTable();
}

function onMinusWeis() {
    minusWeis();
    refreshTable();
}

function onPlusWeis() {
    plusWeis();
    refreshTable();
}

function onMinusCha() {
    minusCha();
    refreshTable();
}

function onPlusCha() {
    plusCha();
    refreshTable();
}
*/