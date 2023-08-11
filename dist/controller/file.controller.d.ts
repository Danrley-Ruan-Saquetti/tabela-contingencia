declare const settings: {
    converterStringTable: {
        separatorLine: RegExp;
        separatorColumn: string;
        configSeparatorColumn: {
            separator: string;
            searchValue: string;
            replaceValue: string;
            betweenText: string;
        };
    };
};
declare function FileControl(): {
    getContentFile: (file: Blob, onload: (result: string) => void, onerror?: () => void) => {
        error: {
            msg: string;
        };
    } | undefined;
    getContentInFormatCSV: (table: string[][]) => string;
    createFile: ({ content, type, charset }: {
        content: BlobPart[];
        charset?: string | undefined;
        type?: string | undefined;
    }) => Blob;
    createFileZip: ({ files }: {
        files: {
            file: Blob;
            name: string;
        }[];
    }) => any;
    createObjectURL: (obj: Blob | MediaSource) => string;
};
