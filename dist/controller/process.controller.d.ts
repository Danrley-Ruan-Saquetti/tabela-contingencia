type Table = string[][];
declare class ProcessController {
    tableSystem: Table;
    tableMarket: Table;
    tableTotalSystem: Table;
    tableTotalMarket: Table;
    tableMarketGroupByCep: {
        [x: string]: {
            weightInitial: string;
            weightFinal: string;
        }[];
    };
    tableSystemGroupByCep: {
        [x: string]: {
            weightInitial: string;
            weightFinal: string;
            freight: number;
            deadline: number;
        }[];
    };
    constructor(tableSystem: Table, tableMarket: Table);
    perform(): void;
    private insertRangeCepInTotalSystem;
    private insertWeightInitialInTableSystem;
    private insertWeightInitialInTableMarket;
    private groupTableMarketByCep;
    private groupTableSystemByCep;
    private groupTableByCep;
    private getGroupSystemByRangeCep;
    private getGroupMarketByIndex;
    private getGroupMarketByRangeCep;
    private getCepOfGroupTableSystem;
    private getCepOfGroupTableMarket;
}
