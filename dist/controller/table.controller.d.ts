type TTable = string[][];
declare function TableControl(): {
    converterStringForTable: ({ value, configSeparatorColumn, separatorColumn, separatorLine }: {
        value: string;
        separatorLine: string | RegExp;
        separatorColumn: string;
        configSeparatorColumn: {
            searchValue: string;
            replaceValue?: string;
            betweenText?: string;
        };
    }) => string[][];
    copyTable: ({ tablePlant }: {
        tablePlant: TTable;
    }) => TTable;
    getIndex: ({ valueSearch, where, options, method }: {
        valueSearch: string;
        where: {
            table?: TTable;
            array?: string[];
            cell?: string;
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
                line?: number;
                column?: number;
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
