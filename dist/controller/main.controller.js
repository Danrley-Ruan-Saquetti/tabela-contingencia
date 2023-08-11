"use strict";
function MainControl() {
    const fileControl = FileControl();
    const exportFiles = ({ files, callback }) => {
        const filesZip = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileBlob = fileControl.createFile({ content: [file.file] });
            filesZip.push({ file: fileBlob, name: file.name || "?" });
        }
        const zip = fileControl.createFileZip({ files: filesZip });
        zip.generateAsync({ type: "blob" }).then((zipBlob) => {
            const url = fileControl.createObjectURL(zipBlob);
            callback(url);
        });
    };
    const createURLDownload = (callback, files) => {
        const now = new Date(Date.now());
        const date = replaceText({ replaceValue: ".", searchValue: "/", val: now.toLocaleDateString('pt-br') });
        const hour = `${now.getHours().toString().padStart(2, "0")}.${now.getMinutes().toString().padStart(2, "0")}`;
        const zipName = `${date} - ${hour}.zip`;
        exportFiles({ files, callback: (url) => callback(url, zipName) });
    };
    const createFile = (props) => {
        return fileControl.createFile(props);
    };
    const prepareForDownload = (name = "", files) => {
        createURLDownload((url, zipName) => {
            const linkDownloadElement = document.createElement('a');
            linkDownloadElement.setAttribute("href", url);
            linkDownloadElement.innerHTML = "Download";
            linkDownloadElement.setAttribute("download", `Fazenda - ${name ? `${name} ` : ``}${zipName}`);
            document.body.appendChild(linkDownloadElement);
        }, files);
    };
    return { prepareForDownload };
}
