console.clear();

const fileController = FileControl();
const tableController = TableControl();

const settings = {
  converterStringTable: {
    separatorLine: /\r?\n/,
    separatorColumn: ";",
    configSeparatorColumn: {
      separator: ",",
      searchValue: ",",
      replaceValue: "?",
      betweenText: '"',
    },
  },
};

function App() {
  document
    .querySelector('[name="confirm"]')
    ?.addEventListener("click", perform);
}

function perform() {
  const inputFile = document.querySelector(
    '[name="table-contingency"]'
  ) as HTMLInputElement;

  if (!inputFile.files || !inputFile.files.length) {
    return;
  }

  const file = inputFile.files[0];

  fileController.getContentFile(file, (res) => {
    const table = tableController.converterStringForTable({
      value: res,
      ...settings.converterStringTable,
    });

    console.log(table);
  });
}

window.onload = App;
