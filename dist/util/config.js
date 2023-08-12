"use strict";
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
const PARAMS_HEADER_SYSTEM = {
    weightInitial: 0,
    weightFinal: 1,
    cepInitial: 2,
    cepFinal: 3,
    freight: 4,
    deadline: 5,
};
const PARAMS_HEADER_MARKET = {
    ml: {
        cepInitial: 0,
        cepFinal: 1,
        weightInitial: 2,
        weightFinal: 3,
    },
};
const PARAMS_HEADER_TOTAL_SYSTEM = {
    cepInitial: 0,
    cepFinal: 1,
    weightInitial: 2,
    weightFinal: 3,
    freight: 4,
    deadline: 5,
    rangeCep: 6,
    rangeWeight: 7
};
const PARAMS_HEADER_TOTAL_MARKET = {
    cepInitial: 0,
    cepFinal: 1,
    weightInitial: 2,
    weightFinal: 3,
    biggestFreight: 4,
    biggestDeadline: 5,
};
const MARKET = "ml";
function getParamsHeaderMarket() {
    return PARAMS_HEADER_MARKET[MARKET];
}
function getParamsHeaderSystem() {
    return PARAMS_HEADER_SYSTEM;
}
function getParamsHeaderTotalSystem() {
    return PARAMS_HEADER_TOTAL_SYSTEM;
}
function getParamsHeaderTotalMarket() {
    return PARAMS_HEADER_TOTAL_MARKET;
}
