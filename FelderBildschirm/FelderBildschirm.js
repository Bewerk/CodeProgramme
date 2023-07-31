function createGridScreen() {
    let gridBox = document.getElementById('GridBox');
    gridBox.style.gridTemplateRows = 'auto auto auto auto auto';
    let pixelamount = 5 * 50;
    for (let i = 0; i < pixelamount; i++) {
        let pixel = document.createElement('div');
        pixel.className = 'Pixel';
        gridBox.appendChild(pixel);
    }
    document.body.appendChild(gridBox);
}
function todoOnLoad() {
    createTableScreen();
}
function createTableScreen() {
    let table = document.getElementById('BildSchirmTabelle');
    table.innerHTML = '';
    for (let i = 0; i < ScreenData.screenHeight; i++) {
        let tableRow = document.createElement('tr');
        tableRow.className = 'Pixelreihe';
        for (let j = 0; j < ScreenData.screenLength; j++) {
            let tableCell = document.createElement('td');
            tableCell.className = 'Pixel ';
            tableCell.className += ScreenData.pixelValues[ScreenData.screenArray[i][j]];
            tableRow.appendChild(tableCell);
        }
        table.appendChild(tableRow);
    }
}
function refreshTableScreen() {
    const rows = document.getElementsByClassName('Pixelreihe');
    if (!rows) {
        return;
    }
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const pixels = row.children;
        for (let j = 0; j < pixels.length; j++) {
            const pixel = pixels[j];
            pixel.className = 'Pixel ' + ScreenData.pixelValues[ScreenData.screenArray[i][j]];
        }
    }
}
function onTextInput() {
    let inputElement = document.getElementById('TextInput');
    if (!inputElement) {
        console.log('"TextInput" nicht gefunden.');
        return;
    }
    let text = inputElement.value;
    pushText(text);
    letScreenRun();
    clearTextInput();
}
function clearTextInput() {
    let inputElement = document.getElementById('TextInput');
    inputElement.value = '';
}
function onTextInputKeyDown(event) {
    if (event.code == 'Enter') {
        onTextInput();
    }
}
function letScreenRun() {
    clearInterval(ScreenData.screenInterval);
    ScreenData.screenInterval = setInterval(function () {
        moveScreen();
        refreshTableScreen();
    }, ScreenData.screenSpeeds[ScreenData.speedIndex]);
}
function onResetScreen() {
    clearInterval(ScreenData.screenInterval);
    ScreenData.setScreenArrayBlank();
    refreshTableScreen();
}
function stopScreen() {
    clearInterval(ScreenData.screenInterval);
}
function onSlowScreen() {
    ScreenData.speedDecrease();
    stopScreen();
    letScreenRun();
}
function onFasterScreen() {
    ScreenData.speedIncrease();
    stopScreen();
    letScreenRun();
}
//# sourceMappingURL=FelderBildschirm.js.map