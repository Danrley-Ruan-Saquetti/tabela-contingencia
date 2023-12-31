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
    let tableSystem;
    let tableMarket;
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
    performDownload({ tables: [result.tableTotalMarket, result.tableTotalSystem] });
}
function performDownload({ tables }) {
    const tableInString = tables.map(table => fileController.getContentInFormatCSV(table));
    const files = tableInString.map(table => fileController.createFile({ content: [table] }));
    mainController.prepareForDownload("", [
        { file: files[0], name: "Tabela Total de Contingência do Marketing" },
        { file: files[1], name: "Tabela Total de Contingência do Sistema" },
    ]);
}
window.onload = App;
