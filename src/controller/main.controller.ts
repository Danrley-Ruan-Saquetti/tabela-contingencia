function MainControl() {
    const fileControl = FileControl()

    const exportFiles = ({ files, callback }: { files: { file: any, name: string }[], callback: (url: string) => void }) => {
        const filesZip: { file: Blob, name: string }[] = []

        for (let i = 0; i < files.length; i++) {
            const file = files[i]

            const fileBlob = fileControl.createFile({ content: [file.file] })

            filesZip.push({ file: fileBlob, name: file.name || "?" })
        }

        const zip = fileControl.createFileZip({ files: filesZip })

        zip.generateAsync({ type: "blob" }).then((zipBlob: Blob) => {
            const url = fileControl.createObjectURL(zipBlob)

            callback(url)
        })
    }

    const createURLDownload = (callback: (url: string, name: string) => void, files: { file: any, name: string }[]) => {
        const now = new Date(Date.now())

        const date = replaceText({ replaceValue: ".", searchValue: "/", val: now.toLocaleDateString('pt-br') })

        const hour = `${now.getHours().toString().padStart(2, "0")}.${now.getMinutes().toString().padStart(2, "0")}`

        const zipName = `${date} - ${hour}.zip`

        exportFiles({ files, callback: (url) => callback(url, zipName) })
    }

    const createFile = (props: { content: BlobPart[], charset?: string, type?: string }) => {
        return fileControl.createFile(props)
    }

    const prepareForDownload = (name = "", files: { file: any, name: string }[]) => {
        createURLDownload((url, zipName) => {
            const linkDownloadElement = document.createElement('a')

            linkDownloadElement.setAttribute("href", url)
            linkDownloadElement.setAttribute("download", `Fazenda - ${name ? `${name} ` : ``}${zipName}`)

            document.body.appendChild(linkDownloadElement)
        }, files)
    }

    return {prepareForDownload}
}