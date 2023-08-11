declare const fileController: {
    getContentFile: (file: Blob, onload: (result: string) => void, onerror?: (() => void) | undefined) => {
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
declare const tableController: {
    converterStringForTable: ({ value, configSeparatorColumn, separatorColumn, separatorLine }: {
        value: string;
        separatorLine: string | RegExp;
        separatorColumn: string;
        configSeparatorColumn: {
            searchValue: string;
            replaceValue?: string | undefined;
            betweenText?: string | undefined;
        };
    }) => string[][];
    copyTable: ({ tablePlant }: {
        tablePlant: TTable;
    }) => TTable;
    getIndex: ({ valueSearch, where, options, method }: {
        valueSearch: string;
        where: {
            table?: TTable | undefined;
            array?: string[] | undefined;
            cell?: string | undefined;
        };
        method?: "some" | "filled" | undefined;
        options?: {
            line?: number | undefined;
            column?: number | undefined;
        } | undefined;
    }) => number;
    getTableFiltering: ({ indexColumn, table: tableBase, value }: {
        table: TTable;
        indexColumn: number;
        value: string;
    }) => TTable;
    getDistinctColumnValues: ({ columnIndex, table, excludes }: {
        table: string[][];
        columnIndex: number;
        excludes?: {
            line?: number | undefined;
        } | undefined;
    }) => string[];
    addColumn: ({ table, header, index, value }: {
        table: TTable;
        header?: string | undefined;
        value?: string | undefined;
        index?: number | undefined;
    }) => void;
    removeCharacter: ({ characters, table, options }: {
        table: TTable;
        characters: string[];
        options?: {
            specific: {
                line?: number | undefined;
                column?: number | undefined;
            };
            excludes?: {
                line?: number[] | undefined;
                column?: number[] | undefined;
            } | undefined;
        } | undefined;
    }) => boolean;
    orderTable: ({ column, table }: {
        table: TTable;
        column: number;
    }) => string[][];
    removeLinesEmpty: ({ table }: {
        table: TTable;
    }) => string[][];
};
declare const mainController: {
    prepareForDownload: (name: string | undefined, files: {
        file: any;
        name: string;
    }[]) => void;
};
declare function App(): void;
declare function perform(): void;
declare function getTableOfInput(selectorInput: string, callback: (table: string[][]) => void): void;
declare const PARAMS_HEADER_SYSTEM: {
    cepInitial: number;
    cepFinal: number;
};
declare const PARAMS_HEADER_MARKET: {
    ml: {
        cepInitial: number;
        cepFinal: number;
    };
};
declare const MARKET = "ml";
declare function getParamsHeaderMarket(): {
    cepInitial: number;
    cepFinal: number;
};
declare function getParamsHeaderSystem(): {
    cepInitial: number;
    cepFinal: number;
};
declare function performOperation(tableSystem: string[][], tableMarket: string[][]): void;
declare function performDownload(table: string[][]): void;
