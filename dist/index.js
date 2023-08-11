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
const PARAMS_HEADER_SYSTEM = {
    cepInitial: 2,
    cepFinal: 3,
};
const PARAMS_HEADER_MARKET = {
    ml: {
        cepInitial: 0,
        cepFinal: 1,
    },
};
const MARKET = "ml";
function getParamsHeaderMarket() {
    return PARAMS_HEADER_MARKET[MARKET];
}
function getParamsHeaderSystem() {
    return PARAMS_HEADER_SYSTEM;
}
function performOperation(tableSystem, tableMarket) {
    const tableTotal = [["CEP INICIAL", "CEP FINAL", "FAIXA"]];
    for (let i = 1; i < tableSystem.length; i++) {
        const cepInitialSystem = Number(tableSystem[i][getParamsHeaderSystem().cepInitial]);
        const cepFinalSystem = Number(tableSystem[i][getParamsHeaderSystem().cepFinal]);
        let indexI = -1;
        let indexJ = -1;
        tableMarket.map((faixa, j) => {
            const cepInitialMarket = Number(faixa[getParamsHeaderMarket().cepInitial]);
            const cepFinalMarket = Number(faixa[getParamsHeaderMarket().cepFinal]);
            if (cepInitialMarket <= cepInitialSystem &&
                cepInitialSystem <= cepFinalMarket) {
                indexI = j;
            }
            if (cepInitialMarket <= cepFinalSystem &&
                cepFinalSystem <= cepFinalMarket) {
                indexJ = j;
            }
            return faixa;
        });
        let faixas = [];
        if (indexI >= 0 || indexJ >= 0) {
            for (let k = indexI >= 0 ? indexI : indexJ; k <= (indexJ >= 0 ? indexJ : indexI); k++)
                faixas.push(k);
        }
        tableTotal.push([]);
        tableTotal[i][0] = `${cepInitialSystem}`;
        tableTotal[i][1] = `${cepFinalSystem}`;
        tableTotal[i][2] = faixas.map((faixa) => `Faixa ${faixa}`).join(",");
    }
    console.log(tableTotal);
    performDownload(tableTotal);
}
function performDownload(table) {
    const tableInString = fileController.getContentInFormatCSV(table);
    const file = fileController.createFile({ content: [tableInString] });
    mainController.prepareForDownload("", [
        { file, name: "Tabela de Contingência" },
    ]);
}
window.onload = App;
