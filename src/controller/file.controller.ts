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

function FileControl() {
  const getContentFile = (file: Blob, onload: (result: string) => void, onerror?: () => void) => {
      if (!file) { return { error: { msg: "File not defined" } } }

      const reader = new FileReader();

      reader.readAsText(file, "ISO-8859-1");

      // @ts-expect-error
      reader.onload = ({ target: { result } }) => { onload(result) }
      reader.onerror = onerror || function (err) { console.log(err) }
  }

  const getContentInFormatCSV = (table: string[][]) => {
      let csvContent = ""

      table.forEach(function (rowArray) {
          const row = rowArray.join(settings.converterStringTable.separatorColumn)

          csvContent += row + "\r\n"
      })

      return csvContent
  }

  const createFile = ({ content, type = "text/csv", charset = "ISO-8859-1" }: { content: BlobPart[], charset?: string, type?: string }) => {
      const file = new Blob(content, {
          type: `${type};charset=${charset};`
      })

      return file
  }

  const createObjectURL = (obj: Blob | MediaSource) => {
      return URL.createObjectURL(obj)
  }

  const createFileZip = ({ files }: { files: { file: Blob, name: string }[] }) => {
    // @ts-expect-error
      const zip = new JSZip()

      files.forEach(({ file, name }) => {
          zip.file(`${name}.csv`, file);
      })

      return zip
  }

  return {
      getContentFile,
      getContentInFormatCSV,
      createFile,
      createFileZip,
      createObjectURL,
  }
}