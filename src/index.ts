console.clear();

const fileController = FileControl();
const tableController = TableControl();
const mainController = MainControl();

function App() {
    document
        .querySelector('[name="confirm"]')
        ?.addEventListener("click", perform);
}

function perform() {
    // let tableSystem: string[][] = tableController.converterStringForTable({
    //     value: TABLES_TEST.system,
    //     ...settings.converterStringTable,
    // });
    // let tableMarket: string[][] = tableController.converterStringForTable({
    //     value: TABLES_TEST.market,
    //     ...settings.converterStringTable,
    // });

    // return performOperation(tableSystem, tableMarket);

    let tableSystem: string[][];
    let tableMarket: string[][];

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

function getTableOfInput(
    selectorInput: string,
    callback: (table: string[][]) => void
) {
    const inputFile = document.querySelector(selectorInput) as HTMLInputElement;

    if (!inputFile.files || !inputFile.files.length) {
        return;
    }

    const file = inputFile.files[0];

    fileController.getContentFile(file, (res) => {
        const table = tableController.converterStringForTable({
            value: res,
            ...settings.converterStringTable,
        });

        callback(table);
    });
}

function performOperation(tableSystem: string[][], tableMarket: string[][]) {
    const result = mainController.performProcessContingency(tableSystem, tableMarket)

    performDownload({ tables: [result.tableTotalMarket, result.tableTotalSystem] })
}

function performDownload({ tables }: { tables: string[][][] }) {
    const tableInString = tables.map(table => fileController.getContentInFormatCSV(table))

    const files = tableInString.map(table => fileController.createFile({ content: [table] }));

    mainController.prepareForDownload("", [
        { file: files[0], name: "Tabela Total de Contingência do Marketing" },
        { file: files[1], name: "Tabela Total de Contingência do Sistema" },
    ]);
}

window.onload = App;
