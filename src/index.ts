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
  //   value: TABLES_TEST.system,
  //   ...settings.converterStringTable,
  // });
  // let tableMarket: string[][] = tableController.converterStringForTable({
  //   value: TABLES_TEST.market,
  //   ...settings.converterStringTable,
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

function performOperation(tableSystem: string[][], tableMarket: string[][]) {
  const tableTotal: string[][] = [["CEP INICIAL", "CEP FINAL", "FAIXA"]];

  for (let i = 1; i < tableSystem.length; i++) {
    const cepInitialSystem = Number(
      tableSystem[i][getParamsHeaderSystem().cepInitial]
    );
    const cepFinalSystem = Number(
      tableSystem[i][getParamsHeaderSystem().cepFinal]
    );

    let indexI = -1;
    let indexJ = -1;
    tableMarket.map((faixa, j) => {
      const cepInitialMarket = Number(
        faixa[getParamsHeaderMarket().cepInitial]
      );
      const cepFinalMarket = Number(faixa[getParamsHeaderMarket().cepFinal]);

      if (
        cepInitialMarket <= cepInitialSystem &&
        cepInitialSystem <= cepFinalMarket
      ) {
        indexI = j;
      }
      if (
        cepInitialMarket <= cepFinalSystem &&
        cepFinalSystem <= cepFinalMarket
      ) {
        indexJ = j;
      }

      return faixa;
    });
    let faixas: number[] = [];

    for (let k = indexI; k <= indexJ; k++) faixas.push(k);

    tableTotal.push([]);
    tableTotal[i][0] = `${cepInitialSystem}`;
    tableTotal[i][1] = `${cepFinalSystem}`;
    tableTotal[i][2] = faixas.map((faixa) => `Faixa ${faixa}`).join(",");
  }

  console.log(tableTotal);
  performDownload(tableTotal);
}

function performDownload(table: string[][]) {
  const tableInString = fileController.getContentInFormatCSV(table);

  const file = fileController.createFile({ content: [tableInString] });

  mainController.prepareForDownload("", [
    { file, name: "Tabela de Contingência" },
  ]);
}

window.onload = App;
