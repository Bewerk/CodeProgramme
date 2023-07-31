// Praktikant war hier (am Werk).
const FieldGroup1 = 'Field ColorGroup1';
const FieldGroup2 = 'Field ColorGroup2';
const FieldGroup3 = 'Field ColorGroup3';
const FieldGroup4 = 'Field ColorGroup4';
const FieldGroup5 = 'Field ColorGroup5';
const FieldGroup6 = 'Field ColorGroup6';
// Farbcodierung der jeweiligen Farbklasse.
let Group1Color = '#ff0000'; //'red';
let Group2Color = '#ffffff'; //'white';
let Group3Color = '#0000ff'; //'blue';
let Group4Color = '#ffff00'; //'yellow';
let Group5Color = '#000000'; //'black';
let Group6Color = '#008000'; //'green';
const colorObject = {
    Classes: [FieldGroup1, FieldGroup2, FieldGroup3, FieldGroup4, FieldGroup5, FieldGroup6],
    justColorClasses: ['ColorGroup1', 'ColorGroup2', 'ColorGroup3', 'ColorGroup4', 'ColorGroup5', 'ColorGroup6'],
    classColors: [Group1Color, Group2Color, Group3Color, Group4Color, Group5Color, Group6Color],
    primalColors: [Group1Color, Group2Color, Group3Color, Group4Color, Group5Color, Group6Color],
};
// könnte man in Objekt zusammenfassen:
let colorAmount = 2;
let columnAmount = 8;
let rowAmount = 8;
let fieldAmount = columnAmount * rowAmount;
let startTime = new Date().getTime();
let timeDifference = 0;
let timerID = null;
let blinkIntervall = null;
let abklingintervall = null;
let superklickisReady = false;
let gameisrunning = false;
let gameisWon = false;
let isVorgabe = false;
let vorgabeArray = [];
/*
const gameDataObject = {
    colorAmount : colorAmount,
    columnAmount : columnAmount,
    rowAmount : rowAmount,
    fieldAmount : fieldAmount,
    startTime : startTime,
    timeDifference: timeDifference,
    timerID : timerID,
    blinkIntervall : blinkIntervall,
    abklingintervall : abklingintervall,
    superklickisReady : superklickisReady,
    gameisrunning : gameisrunning,
    gameisWon : gameisWon,
    gameMode : 0,
    functionArray : [createBoard(), changeColorAmount()] // nur zum testen
}*/
function createBoard() {
    let Anleitung = document.getElementById('Anleitung');
    Anleitung.style.display = 'none';
    let SpielFeld = document.getElementById("Spielfeld");
    SpielFeld.innerHTML = '';
    let board = createGridBox();
    board.id = 'Spielbrett';
    for (let i = 0; i < fieldAmount; i++) {
        let field = createField();
        board.appendChild(field);
    }
    board.addEventListener("mouseleave", onLeaveBoard);
    board.addEventListener("mouseenter", onEnterBoard);
    SpielFeld.appendChild(board);
    gameisWon = false; // woandershin
}
function createGridBox() {
    let board = document.createElement('div');
    board.className = 'GridBox';
    board.style.display = 'grid';
    board.style.gridTemplateColumns = createGridTemplateColumns();
    return board;
}
function createGridTemplateColumns() {
    let column = 'auto ';
    let gridColumns = '';
    for (let i = 0; i < columnAmount; i++) {
        gridColumns += column;
    }
    return gridColumns;
}
function createField() {
    let field = document.createElement('div');
    let randomColorIndex = Math.floor(Math.random() * colorAmount);
    field.className = 'Field ' + colorObject.justColorClasses[randomColorIndex];
    field.style.backgroundColor = colorObject.classColors[randomColorIndex];
    /*let fieldHeight: number = 95 / rowAmount; //170
    field.style.height = `Math.calc(${fieldHeight.toString()}vh - 4px)`;//fieldHeight.toString() + 'vh';*/
    // um einen Parameter mitzugeben muss der Funktionsaufruf von changeField() durch eine anonyme Funktion des Events geschehen.
    field.addEventListener("mouseover", onChangeFieldEvent); /*function(this){
        changeField(this);
    });*/
    field.addEventListener("mousedown", onSuperklickEvent); /*function(this) {
        if (superklickisReady) {
            changeField(this);
            resetSuperklick();
        }
    });*/
    // field.addEventListener("dblclick", winFunction); // Cheat zum testen
    return field;
}
function onEnterBoard() {
    if (gameisWon) { // Wegen Mutmaßlichen Bugs: Spiel wird gewonnen, bevor onEnterBoard aktiviert wird. -> onEnterBoard wird nach winfunction? aktiviert.
        return;
    }
    gameisrunning = true;
    startTime = new Date().getTime();
    timerID = setInterval(function () { showTime(); }, 70);
    resetSuperklick();
}
function onLeaveBoard() {
    gameisrunning = false;
    clearInterval(timerID);
    clearInterval(blinkIntervall);
    clearInterval(abklingintervall);
    createBoard();
    let zeit = document.getElementById("ZeitAnzeige");
    if (zeit) {
        zeit.innerHTML = 'Zeit';
    }
    // document.getElementById("ZeitAnzeige")!.innerHTML = 'Zeit';
}
function onChangeFieldEvent() {
    changeField(this);
}
/*function changeField(myField?: HTMLElement) {
    if (myField == undefined) {
        myField = this;
    }
    let index: number = colorObject.Classes.indexOf(myField.className);
    index = (index + 1) % colorAmount;
    let newFieldClass: string = colorObject.Classes[index];
    myField.className = newFieldClass;
    myField.style.backgroundColor = colorObject.classColors[index];

    if (!isVorgabe) {
        checkEndShowEndCard();
    }
    else {
        checkIfVorgabeEnd();
    }
}*/
function changeField(myField) {
    let index = colorObject.Classes.indexOf(myField.className);
    index = (index + 1) % colorAmount;
    let newFieldClass = colorObject.Classes[index];
    myField.className = newFieldClass;
    myField.style.backgroundColor = colorObject.classColors[index];
    if (!isVorgabe) {
        checkEndShowEndCard();
    }
    else {
        checkIfVorgabeEnd();
    }
}
function onSuperklickEvent() {
    if (superklickisReady) {
        changeField(this);
        resetSuperklick();
    }
}
function checkEndShowEndCard() {
    const fieldList = document.getElementsByClassName('Field');
    let ourClassName = fieldList[0].className;
    for (let i of fieldList) {
        if (i.className != ourClassName) {
            return;
        }
    }
    winFunction();
}
function winFunction() {
    gameisrunning = false;
    gameisWon = true;
    clearInterval(timerID);
    clearInterval(blinkIntervall);
    clearInterval(abklingintervall);
    removeBoardEventListener();
    removeFieldsEventListener();
    let SpielFeld = document.getElementById("Spielfeld");
    let board = document.getElementById("Spielbrett");
    let winDiv = createEndCard();
    board.style.borderColor = 'goldenrod';
    board.style.opacity = '0';
    setTimeout(function () {
        SpielFeld.innerHTML = '';
        SpielFeld.appendChild(winDiv);
        setGameModeNormal();
    }, 2000);
}
function createEndCard() {
    let winDiv = document.createElement('div');
    winDiv.className = 'EndCard';
    let gratulation = document.createElement('div');
    gratulation.id = 'Gratulation';
    gratulation.innerHTML = 'Super!';
    let table = document.createElement('table');
    table.className = 'Tableclass';
    let firstRow = document.createElement('tr');
    let fieldAmountCell = document.createElement('td');
    fieldAmountCell.className = 'AnzahlSpalte';
    fieldAmountCell.innerHTML = fieldAmount.toString();
    let fieldLabel = document.createElement('td');
    fieldLabel.className = 'EinheitSpalte';
    fieldLabel.innerHTML = 'Felder';
    firstRow.appendChild(fieldAmountCell);
    firstRow.appendChild(fieldLabel);
    let secondRow = document.createElement('tr');
    let colorAmountCell = document.createElement('td');
    colorAmountCell.className = 'AnzahlSpalte';
    colorAmountCell.innerHTML = colorAmount.toString();
    let colorLabel = document.createElement('td');
    colorLabel.className = 'EinheitSpalte';
    colorLabel.innerHTML = 'Farben';
    secondRow.appendChild(colorAmountCell);
    secondRow.appendChild(colorLabel);
    let thirdRow = document.createElement('tr');
    let timeAmountCell = document.createElement('td');
    timeAmountCell.className = 'AnzahlSpalte';
    let timeAmount = document.getElementById('ZeitAnzeige').innerHTML;
    if (timeAmount == 'Zeit') {
        timeAmount = '0';
    }
    timeAmountCell.innerHTML = timeAmount;
    let timeAmountLabel = document.createElement('td');
    timeAmountLabel.className = 'EinheitSpalte';
    timeAmountLabel.innerHTML = 'Sekunden';
    thirdRow.appendChild(timeAmountCell);
    thirdRow.appendChild(timeAmountLabel);
    table.appendChild(firstRow);
    table.appendChild(secondRow);
    table.appendChild(thirdRow);
    let button = document.createElement('button');
    button.innerHTML = 'Nochmal!';
    button.id = 'Knopf';
    button.addEventListener('click', createBoard);
    winDiv.appendChild(gratulation);
    winDiv.appendChild(table);
    winDiv.appendChild(button);
    if (isVorgabe) {
        let tabelle = document.createElement('table');
        tabelle.id = 'WinCellTabelle';
        setVorgabeTabelle(tabelle);
        winDiv.appendChild(tabelle);
    }
    return winDiv;
}
function removeBoardEventListener() {
    let board = document.getElementById("Spielbrett");
    board.removeEventListener("mouseleave", onLeaveBoard);
}
function removeFieldsEventListener() {
    const fields = document.getElementsByClassName('Field');
    for (let field of fields) {
        field.removeEventListener("mouseover", onChangeFieldEvent);
        field.removeEventListener("mousedown", onSuperklickEvent);
    }
}
function changeFieldAmount() {
    columnAmount = parseInt(document.getElementById('SpaltenAnzahl').value);
    rowAmount = parseInt(document.getElementById('ReihenAnzahl').value);
    fieldAmount = columnAmount * rowAmount;
    if (!gameisWon) {
        createBoard();
    }
    if (isVorgabe) {
        onSetGameModeVorgabe();
    }
}
function changeColorAmount() {
    colorAmount = parseInt(document.getElementById('ColorAmount').value);
    const colorChoices = document.getElementsByClassName('ColorChoice');
    for (let i of colorChoices) {
        i.style.visibility = "hidden";
    }
    for (let i = 0; i < colorAmount; i++) {
        colorChoices[i].style.visibility = "";
    }
    if (!gameisWon) {
        createBoard();
    }
    if (isVorgabe) {
        onSetGameModeVorgabe();
    }
}
function changeColor(colorGroupIndex, colorElement) {
    let newColor = colorElement.value;
    colorObject.classColors[colorGroupIndex] = newColor;
    const classElements = document.getElementsByClassName(colorObject.justColorClasses[colorGroupIndex]);
    for (let element of classElements) {
        element.style.backgroundColor = newColor;
    }
}
function refreshColorInputElements() {
    const colorInputElements = document.getElementsByClassName('ColorChoice');
    for (let i = 0; i < colorInputElements.length; i++) {
        colorObject.classColors[i] = colorInputElements[i].value;
    }
}
function refreshFieldColors() {
    let fields = document.getElementsByClassName('Field');
    for (let field of fields) {
        let colorIndex = colorObject.Classes.indexOf(field.className);
        field.style.backgroundColor = colorObject.classColors[colorIndex];
    }
}
function showTime() {
    /*
    let nowTime: number = new Date().getTime();
    timeDifference = nowTime - startTime;
    timeDifference = Math.floor(timeDifference / 10);
    let timeString = Math.floor(timeDifference / 100).toString() + ':' + (timeDifference % 100).toString();
    */
    /*if (!gameisrunning) {
        clearInterval(timerID);
    }*/
    let timeString = calcTimeString();
    document.getElementById("ZeitAnzeige").innerHTML = timeString;
}
function calcTimeString() {
    let nowTime = new Date().getTime();
    let timeDifference = nowTime - startTime;
    timeDifference = Math.floor(timeDifference / 10);
    let seconds = Math.floor(timeDifference / 100);
    let deciSeconds = Math.floor((timeDifference % 100) / 10);
    let centiseconds = Math.floor((timeDifference % 10));
    let timeString = seconds.toString() + ',' + deciSeconds.toString() + centiseconds.toString();
    // let timeString = Math.floor(timeDifference / 100).toString() + ',' + (timeDifference % 100).toString();
    return timeString;
}
function resetSuperklick() {
    const cooldownElements = document.getElementsByClassName('Abkling');
    for (let hereElement of cooldownElements) {
        hereElement.style.backgroundColor = 'grey';
    }
    document.getElementById('SuperklickTabelle').style.backgroundColor = 'inherit';
    superklickisReady = false;
    clearInterval(blinkIntervall);
    let step = 0;
    abklingintervall = setInterval(function (cooldownElements) {
        //console.log(step);
        if (!gameisrunning) {
            clearInterval(blinkIntervall);
            clearInterval(abklingintervall);
            return;
        }
        cooldownElements[step].style.backgroundColor = 'gold';
        step++;
        if (step == cooldownElements.length) {
            superklickisReady = true;
            // Balken verschönern für letzten Schritt? vllt. Intervall-Blinklicht noch.
            document.getElementById('SuperklickTabelle').style.backgroundColor = 'orange';
            for (let hereElement of cooldownElements) {
                hereElement.style.backgroundColor = 'inherit';
            }
            clearInterval(abklingintervall);
            let tick = true;
            blinkIntervall = setInterval(function () {
                superklickBlinky(tick);
                tick = !tick;
            }, 150);
        }
    }, 1000, cooldownElements);
}
function superklickBlinky(tick) {
    let SuperklickTabelle = document.getElementById('SuperklickTabelle');
    if (tick) {
        SuperklickTabelle.style.backgroundColor = 'gold';
    }
    else {
        SuperklickTabelle.style.backgroundColor = 'orange';
    }
}
function resetInputElements() {
    document.getElementById('ColorAmount').value = colorAmount.toString();
    const colorChoices = document.getElementsByClassName('ColorChoice');
    for (let i = 0; i < colorChoices.length; i++) {
        colorChoices[i].value = colorObject.primalColors[i];
        colorObject.classColors[i] = colorObject.primalColors[i];
        if (i < colorAmount) {
            colorChoices[i].style.visibility = '';
        }
        else {
            colorChoices[i].style.visibility = 'hidden';
        }
    }
    document.getElementById('SpaltenAnzahl').value = columnAmount.toString();
    document.getElementById('ReihenAnzahl').value = rowAmount.toString();
}
const HBclasses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
function onSetGameModeHB() {
    columnAmount = 12;
    rowAmount = 12;
    fieldAmount = columnAmount * rowAmount;
    colorAmount = 2;
    resetInputElements();
    vorgabeArray = HBclasses;
    setGameModeVorgabe();
}
function onSetGameModeVorgabe() {
    createVorgabe();
    setGameModeVorgabe();
}
function setGameModeVorgabe() {
    isVorgabe = true;
    let tabelle = document.getElementById('CellTabelle');
    tabelle = setVorgabeTabelle(tabelle);
    tabelle.style.visibility = 'visible';
    //setHeaderHeight();
    createBoard();
}
function createVorgabe() {
    vorgabeArray = [];
    for (let i = 0; i < fieldAmount; i++) {
        let groupIndex = Math.floor(Math.random() * colorAmount);
        vorgabeArray.push(groupIndex);
    }
}
function onSetGameModeNormal() {
    setGameModeNormal();
    createBoard();
}
function setGameModeNormal() {
    isVorgabe = false;
    document.getElementById('CellTabelle').style.visibility = 'hidden';
    //setHeaderHeight();
}
function setHeaderHeight() {
    let header = document.getElementById('Header');
    let newHeight = 120;
    if (isVorgabe) {
        // newHeight += Math.max(0,(rowAmount - 12) * 7); // alte Formel
        newHeight += rowAmount * 7 + 30;
    }
    header.style.height = newHeight.toString() + 'px';
}
function checkIfVorgabeEnd() {
    const fieldList = document.getElementsByClassName('Field');
    for (let i = 0; i < fieldList.length; i++) {
        if (fieldList[i].className != colorObject.Classes[vorgabeArray[i]]) {
            return;
        }
    }
    winFunction();
}
function setVorgabeTabelle(tabelle) {
    tabelle.innerHTML = '';
    for (let i = 0; i < rowAmount; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < columnAmount; j++) {
            let cell = document.createElement('td');
            let index = i * columnAmount + j;
            cell.className = 'Cell ' + colorObject.justColorClasses[vorgabeArray[index]];
            cell.style.backgroundColor = colorObject.classColors[vorgabeArray[index]];
            row.appendChild(cell);
        }
        tabelle.appendChild(row);
    }
    return tabelle;
}
function showAnleitung() {
    let Spielfeld = document.getElementById('Spielfeld');
    let Anleitung = document.getElementById('Anleitung');
    if (Anleitung.style.display == 'none') {
        Spielfeld.innerHTML = '';
        Anleitung.style.display = 'flex';
        gameisWon = true;
        setGameModeNormal();
    }
    else {
        //Anleitung.style.display = 'none'
        createBoard();
    }
}
//# sourceMappingURL=FelderSpiel.js.map