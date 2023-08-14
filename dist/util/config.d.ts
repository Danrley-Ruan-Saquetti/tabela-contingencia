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
declare const PARAMS_HEADER_SYSTEM: {
    weightInitial: number;
    weightFinal: number;
    cepInitial: number;
    cepFinal: number;
    freight: number;
    deadline: number;
};
declare const PARAMS_HEADER_MARKET: {
    ml: {
        cepInitial: number;
        cepFinal: number;
        weightInitial: number;
        weightFinal: number;
        rate: number;
    };
};
declare const PARAMS_HEADER_TOTAL_SYSTEM: {
    cepInitial: number;
    cepFinal: number;
    weightInitial: number;
    weightFinal: number;
    freight: number;
    deadline: number;
    rangeCep: number;
    rangeWeight: number;
    rate: number;
};
declare const PARAMS_HEADER_TOTAL_MARKET: {
    cepInitial: number;
    cepFinal: number;
    weightInitial: number;
    weightFinal: number;
    biggestFreight: number;
    biggestDeadline: number;
    rate: number;
};
declare const MARKET = "ml";
declare function getParamsHeaderMarket(): {
    cepInitial: number;
    cepFinal: number;
    weightInitial: number;
    weightFinal: number;
    rate: number;
};
declare function getParamsHeaderSystem(): {
    weightInitial: number;
    weightFinal: number;
    cepInitial: number;
    cepFinal: number;
    freight: number;
    deadline: number;
};
declare function getParamsHeaderTotalSystem(): {
    cepInitial: number;
    cepFinal: number;
    weightInitial: number;
    weightFinal: number;
    freight: number;
    deadline: number;
    rangeCep: number;
    rangeWeight: number;
    rate: number;
};
declare function getParamsHeaderTotalMarket(): {
    cepInitial: number;
    cepFinal: number;
    weightInitial: number;
    weightFinal: number;
    biggestFreight: number;
    biggestDeadline: number;
    rate: number;
};
