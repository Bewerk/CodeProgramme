const Charakter = new CharakterObjekt;
function getAttribute() {
    return Charakter;
}
function calcStep(wert, plus) {
    if (plus) {
        wert -= 9;
    }
    else {
        wert -= 10;
    }
    wert = wert / 2;
    if (wert < 1) {
        wert = Math.floor(Math.abs(wert) + 1);
    }
    else {
        wert = Math.floor(wert);
    }
    return wert;
}
function changeAttributsWert(givenAttribut, plus) {
    const Attribute = getAttribute();
    let wert = Attribute.getAttribut(givenAttribut);
    let step = calcStep(wert, plus);
    if (plus) {
        if (Attribute.restPunkte < step) {
            return;
        }
        Attribute.setAttribut(givenAttribut, 1);
        Attribute.restPunkte -= step;
    }
    else {
        if (wert <= Attribute.minAttributsWert) {
            return;
        }
        Attribute.setAttribut(givenAttribut, -1);
        Attribute.restPunkte += step;
    }
}
/* zu Veranschaulichung um Funktion zu verallgemeinern. Weiter oben -> besser.
let step: number = calcStepDown(Attribute.getAttribut(parameter));
let step: number = calcStepDown(Attribute.getAttribut(Attribut.Staerke));
let step: number = calcStepDown(Attribute.AttributArray[Attribut.Staerke]);
let step: number = calcStepDown(Attribute.AttributArray[StaerkeIndex]);
let step: number = calcStepDown(Attribute.AttributArray[0]);
let step: number = calcStepDown(Attribute.strGrundWert);
*/
function setVolksBoni(volk) {
    const Attribute = getAttribute();
    Attribute.Volk = volk;
    const VolksBoniArray = getVolksBoniArray();
    let volkIndex = Volk[volk];
    Attribute.AttributArray[Attribut.Staerke].setVolksBonus(VolksBoniArray[volkIndex][Attribut.Staerke]);
    Attribute.AttributArray[Attribut.Geschick].setVolksBonus(VolksBoniArray[volkIndex][Attribut.Geschick]);
    Attribute.AttributArray[Attribut.Konstitution].setVolksBonus(VolksBoniArray[volkIndex][Attribut.Konstitution]);
    Attribute.AttributArray[Attribut.Intelligenz].setVolksBonus(VolksBoniArray[volkIndex][Attribut.Intelligenz]);
    Attribute.AttributArray[Attribut.Weisheit].setVolksBonus(VolksBoniArray[volkIndex][Attribut.Weisheit]);
    Attribute.AttributArray[Attribut.Charisma].setVolksBonus(VolksBoniArray[volkIndex][Attribut.Charisma]);
    // Ziel: verallgemeinern. Hat funktioniert.
    /* Alt und weniger allgemein.
    if (volk == 'Mensch') {
        Attribute.AttributArray[Attribut.Staerke].setVolksBonus(0);
        Attribute.AttributArray[Attribut.Geschick].setVolksBonus(0);
        Attribute.AttributArray[Attribut.Konstitution].setVolksBonus(0);
        Attribute.AttributArray[Attribut.Intelligenz].setVolksBonus(0);
        Attribute.AttributArray[Attribut.Weisheit].setVolksBonus(0);
        Attribute.AttributArray[Attribut.Charisma].setVolksBonus(0);
    }
    else if (volk == 'Elf') {
        Attribute.AttributArray[Attribut.Staerke].setVolksBonus(0);
        Attribute.AttributArray[Attribut.Geschick].setVolksBonus(2)
        Attribute.AttributArray[Attribut.Konstitution].setVolksBonus(-2);
        Attribute.AttributArray[Attribut.Intelligenz].setVolksBonus(0);
        Attribute.AttributArray[Attribut.Weisheit].setVolksBonus(0);
        Attribute.AttributArray[Attribut.Charisma].setVolksBonus(0);
    }
    else if (volk == 'Zwerg') {
        Attribute.AttributArray[Attribut.Staerke].setVolksBonus(0);
        Attribute.AttributArray[Attribut.Geschick].setVolksBonus(0)
        Attribute.AttributArray[Attribut.Konstitution].setVolksBonus(2);
        Attribute.AttributArray[Attribut.Intelligenz].setVolksBonus(0);
        Attribute.AttributArray[Attribut.Weisheit].setVolksBonus(0);
        Attribute.AttributArray[Attribut.Charisma].setVolksBonus(-2);
    }
    else if (volk == 'Ork') {
        Attribute.AttributArray[Attribut.Staerke].setVolksBonus(2);
        Attribute.AttributArray[Attribut.Geschick].setVolksBonus(0)
        Attribute.AttributArray[Attribut.Konstitution].setVolksBonus(0);
        Attribute.AttributArray[Attribut.Intelligenz].setVolksBonus(-2);
        Attribute.AttributArray[Attribut.Weisheit].setVolksBonus(0);
        Attribute.AttributArray[Attribut.Charisma].setVolksBonus(0);
    }
    */
}
function setCharKlasse(klasse) {
    const Attribute = getAttribute();
    Attribute.Klasse = klasse;
    Attribute.calcFaehigkeiten();
}
/* veraltet, unnötig.
function calcStepUp(wert: number): number {
    // nochmal überprüfen.
    wert -= 9;
    wert = Math.floor(wert/2);
    if (wert == 0) {
        wert = 1;
    }
    wert = Math.abs(wert);
    console.log(wert);

    return wert;
}

function calcStepDown(wert: number): number {
    // nochmal überprüfen.
    wert -= 10;
    wert = Math.floor(wert/2);
    if (wert == 0) {
        wert = 1;
    }
    wert = Math.abs(wert);
    console.log(wert);

    return wert;
}

function minusStr(parameter: Attribut) {
    const Attribute = getAttribute();
    //let step: number = calcStepDown(Attribute.getAttribut(parameter));
    //let step: number = calcStepDown(Attribute.getAttribut(Attribut.Staerke));
    //let step: number = calcStepDown(Attribute.AttributArray[Attribut.Staerke]);
    //let step: number = calcStepDown(Attribute.AttributArray[StaerkeIndex]);
    //let step: number = calcStepDown(Attribute.AttributArray[0]);
    console.log(calcStep(Attribute.strGrundWert, false));
    let step: number = calcStepDown(Attribute.strGrundWert);
    if (Attribute.strGrundWert <= 3) {
        return;
    }

    Attribute.strGrundWert--;
    Attribute.restPunkte += step;
}

/*
function plusStr() {
    const Attribute = getAttribute();
    console.log(calcStep(Attribute.strGrundWert, true));
    let step: number = calcStepUp(Attribute.strGrundWert);
    if(Attribute.restPunkte < step) {
        return;
    }

    Attribute.strGrundWert++;
    Attribute.restPunkte -= step;
}

function minusGes() {
    const Attribute = getAttribute();
    let step: number = calcStepDown(Attribute.gesGrundWert);
    if (Attribute.gesGrundWert <= 3) {
        return;
    }

    Attribute.gesGrundWert--;
    Attribute.restPunkte += step;
}

function plusGes() {
    const Attribute = getAttribute();
    let step: number = calcStepUp(Attribute.gesGrundWert);
    if(Attribute.restPunkte < step) {
        return;
    }

    Attribute.gesGrundWert++;
    Attribute.restPunkte -= step;
}

function minusKonst() {
    const Attribute = getAttribute();
    let step: number = calcStepDown(Attribute.konstGrundWert);
    if (Attribute.konstGrundWert <= 3) {
        return;
    }

    Attribute.konstGrundWert--;
    Attribute.restPunkte += step;
}

function plusKonst() {
    const Attribute = getAttribute();
    let step: number = calcStepUp(Attribute.konstGrundWert);
    if(Attribute.restPunkte < step) {
        return;
    }

    Attribute.konstGrundWert++;
    Attribute.restPunkte -= step;
}

function minusInt() {
    const Attribute = getAttribute();
    let step: number = calcStepDown(Attribute.intGrundWert);
    if (Attribute.intGrundWert <= 3) {
        return;
    }

    Attribute.intGrundWert--;
    Attribute.restPunkte += step;
}

function plusInt() {
    const Attribute = getAttribute();
    let step: number = calcStepUp(Attribute.intGrundWert);
    if(Attribute.restPunkte < step) {
        return;
    }

    Attribute.intGrundWert++;
    Attribute.restPunkte -= step;
}

function minusWeis() {
    const Attribute = getAttribute();
    let step: number = calcStepDown(Attribute.weisGrundWert);
    if (Attribute.weisGrundWert <= 3) {
        return;
    }

    Attribute.weisGrundWert--;
    Attribute.restPunkte += step;
}

function plusWeis() {
    const Attribute = getAttribute();
    let step: number = calcStepUp(Attribute.weisGrundWert);
    if(Attribute.restPunkte < step) {
        return;
    }

    Attribute.weisGrundWert++;
    Attribute.restPunkte -= step;
}

function minusCha() {
    const Attribute = getAttribute();
    let step: number = calcStepDown(Attribute.chaGrundWert);
    if (Attribute.chaGrundWert <= 3) {
        return;
    }

    Attribute.chaGrundWert--;
    Attribute.restPunkte += step;
}

function plusCha() {
    const Attribute = getAttribute();
    let step: number = calcStepUp(Attribute.chaGrundWert);
    if(Attribute.restPunkte < step) {
        return;
    }

    Attribute.chaGrundWert++;
    Attribute.restPunkte -= step;
}
*/ 
//# sourceMappingURL=CharEditLogik.js.map