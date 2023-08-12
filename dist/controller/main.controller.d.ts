declare function MainControl(): {
    prepareForDownload: (name: string | undefined, files: {
        file: any;
        name: string;
    }[]) => void;
    performProcessContingency: (tableSystem: Table, tableMarket: Table) => {
        tableTotalMarket: Table;
        tableTotalSystem: Table;
    };
};
