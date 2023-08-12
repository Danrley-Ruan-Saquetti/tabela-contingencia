"use strict";
console.clear();
const fileController = FileControl();
const tableController = TableControl();
const mainController = MainControl();
function App() {
    var _a;
    (_a = document
        .querySelector('[name="confirm"]')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", perform);
}
function perform() {
    let tableSystem = tableController.converterStringForTable(Object.assign({ value: TABLES_TEST.system }, settings.converterStringTable));
    let tableMarket = tableController.converterStringForTable(Object.assign({ value: TABLES_TEST.market }, settings.converterStringTable));
    return performOperation(tableSystem, tableMarket);
    const validExec = { system: false, market: false };
    function exeOperation() {
        if (!validExec.market || !validExec.system) {
            return;
        }
        performOperation(tableSystem, tableMarket);
    }
    getTableOfInput('[name="table-contingency-system"]', (table) => {
        validExec.system = true;
        tableSystem = table;
        exeOperation();
    });
    getTableOfInput('[name="table-contingency-market"]', (table) => {
        validExec.market = true;
        tableMarket = table;
        exeOperation();
    });
}
function getTableOfInput(selectorInput, callback) {
    const inputFile = document.querySelector(selectorInput);
    if (!inputFile.files || !inputFile.files.length) {
        return;
    }
    const file = inputFile.files[0];
    fileController.getContentFile(file, (res) => {
        const table = tableController.converterStringForTable(Object.assign({ value: res }, settings.converterStringTable));
        callback(table);
    });
}
function performOperation(tableSystem, tableMarket) {
    const result = mainController.performProcessContingency(tableSystem, tableMarket);
}
function performDownload(table) {
    const tableInString = fileController.getContentInFormatCSV(table);
    const file = fileController.createFile({ content: [tableInString] });
    mainController.prepareForDownload("", [
        { file, name: "Tabela de Contingência" },
    ]);
}
window.onload = App;
