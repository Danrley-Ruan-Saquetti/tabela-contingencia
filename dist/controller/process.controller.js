"use strict";
class ProcessController {
    constructor(tableSystem, tableMarket) {
        this.tableSystem = tableSystem;
        this.tableMarket = tableMarket;
        this.tableTotalSystem = [
            [
                "CEP INICIAL",
                "CEP FINAL",
                "PESO INICIAL",
                "PESO FINAL",
                "FRETE",
                "PRAZO",
                "FAIXA DO CEP",
                "FAIXA DO PESO",
            ],
        ];
        this.tableTotalMarket = [
            [
                "CEP INICIAL",
                "CEP FINAL",
                "PESO INICIAL",
                "PESO FINAL",
                "MAIOR FRETE",
                "MAIOR PRAZO",
            ],
        ];
        this.tableMarketGroupByCep = {};
        this.tableSystemGroupByCep = {};
    }
    perform() {
        this.insertWeightInitialInTableSystem();
        this.insertWeightInitialInTableMarket();
        this.groupTableMarketByCep();
        this.groupTableSystemByCep();
        this.createTableTotalSystem();
        this.createTableTotalMarket();
        console.log(this);
        return {
            tableTotalMarket: this.tableTotalMarket,
            tableTotalSystem: this.tableTotalSystem,
        };
    }
    createTableTotalSystem() {
        const cepOfGroupTableMarket = this.getCepOfGroupTableMarket();
        const cepOfGroupTableSystem = this.getCepOfGroupTableSystem();
        let indexLine = 1;
        cepOfGroupTableSystem.forEach(([cepInitialSystem, cepFinalSystem], i) => {
            const [cepInitialSystemInNumber, cepFinalSystemInNumber] = [
                Number(cepInitialSystem),
                Number(cepFinalSystem),
            ];
            const groupRangeCepSystem = this.getGroupSystemByRangeCep(cepInitialSystemInNumber + "-" + cepFinalSystemInNumber);
            let indexInitial = -1;
            let indexFinal = -1;
            for (let j = 0; j < cepOfGroupTableMarket.length; j++) {
                const [cepInitialMarket, cepFinalMarket] = cepOfGroupTableMarket[j];
                const [cepInitialMarketInNumber, cepFinalMarketInNumber] = [
                    Number(cepInitialMarket),
                    Number(cepFinalMarket),
                ];
                if (cepInitialMarketInNumber <= cepInitialSystemInNumber &&
                    cepInitialSystemInNumber <= cepFinalMarketInNumber) {
                    indexInitial = j;
                }
                if (cepInitialMarketInNumber <= cepFinalSystemInNumber &&
                    cepFinalSystemInNumber <= cepFinalMarketInNumber) {
                    indexFinal = j;
                }
            }
            const ranges = [];
            if (indexInitial >= 0 || indexFinal >= 0) {
                for (let k = indexInitial >= 0 ? indexInitial : indexFinal; k <= (indexFinal >= 0 ? indexFinal : indexInitial); k++)
                    ranges.push(k);
            }
            const weightsMarket = ranges
                .map((range) => this.getGroupMarketByIndex(range))
                .flat();
            groupRangeCepSystem.forEach(({ deadline, freight, weightFinal: weightFinalSystem, weightInitial: weightInitialSystem, }, k) => {
                if (typeof this.tableTotalSystem[indexLine] == "undefined") {
                    this.tableTotalSystem.push([]);
                }
                const weightFinalSystemInNumber = Number(weightFinalSystem);
                let indexFinal = -1;
                weightsMarket.forEach(({ weightFinal: weightFinalMarket, weightInitial: weightInitialMarket, }, l) => {
                    const [weightFinalMarketInNumber, weightInitialMarketInNumber] = [
                        Number(weightFinalMarket),
                        Number(weightInitialMarket),
                    ];
                    if (weightInitialMarketInNumber <= weightFinalSystemInNumber &&
                        weightFinalSystemInNumber <= weightFinalMarketInNumber) {
                        indexFinal = l;
                    }
                });
                this.tableTotalSystem[indexLine][getParamsHeaderTotalSystem().cepInitial] = cepInitialSystem;
                this.tableTotalSystem[indexLine][getParamsHeaderTotalSystem().cepFinal] = cepFinalSystem;
                this.tableTotalSystem[indexLine][getParamsHeaderTotalSystem().deadline] = `${deadline}`;
                this.tableTotalSystem[indexLine][getParamsHeaderTotalSystem().freight] = `${freight}`;
                this.tableTotalSystem[indexLine][getParamsHeaderTotalSystem().weightInitial] = `${weightInitialSystem}`;
                this.tableTotalSystem[indexLine][getParamsHeaderTotalSystem().weightFinal] = `${weightFinalSystem}`;
                this.tableTotalSystem[indexLine][getParamsHeaderTotalSystem().rangeCep] = ranges.map((range) => `Faixa ${range + 1}`).join(",");
                this.tableTotalSystem[indexLine][getParamsHeaderTotalSystem().rangeWeight] = indexFinal >= 0 ? `Faixa ${indexFinal + 1}` : "";
                indexLine++;
            });
        });
    }
    createTableTotalMarket() {
        const cepOfGroupTableMarket = this.getCepOfGroupTableMarket();
        let indexLine = 1;
        for (let i = 0; i < cepOfGroupTableMarket.length; i++) {
            const [cepInitialMarket, cepFinalMarket] = cepOfGroupTableMarket[i];
            const rangeCepTotalSystem = this.tableTotalSystem.filter((line) => line[getParamsHeaderTotalSystem().rangeCep]
                .split(",")
                .find((range) => range == `Faixa ${i + 1}`));
            if (!rangeCepTotalSystem.length) {
                continue;
            }
            const rangeCepTotalSystemOrderedByFreight = TableControl().orderTable({
                table: rangeCepTotalSystem,
                column: getParamsHeaderTotalSystem().freight,
            });
            const rangeCepTotalSystemOrderedByDeadline = TableControl().orderTable({
                table: rangeCepTotalSystem,
                column: getParamsHeaderTotalSystem().deadline,
            });
            const biggestFreight = rangeCepTotalSystemOrderedByFreight[rangeCepTotalSystemOrderedByFreight.length - 1];
            const biggestDeadline = rangeCepTotalSystemOrderedByDeadline[rangeCepTotalSystemOrderedByDeadline.length - 1];
            const rangeCepGroupMarket = this.getGroupMarketByRangeCep(cepInitialMarket + "-" + cepFinalMarket);
            rangeCepGroupMarket.forEach(({ weightFinal, weightInitial }) => {
                if (typeof this.tableTotalMarket[indexLine] == "undefined") {
                    this.tableTotalMarket.push([]);
                }
                this.tableTotalMarket[indexLine][getParamsHeaderTotalMarket().cepInitial] = `${cepInitialMarket}`;
                this.tableTotalMarket[indexLine][getParamsHeaderTotalMarket().cepFinal] = `${cepFinalMarket}`;
                this.tableTotalMarket[indexLine][getParamsHeaderTotalMarket().weightFinal] = `${weightFinal}`;
                this.tableTotalMarket[indexLine][getParamsHeaderTotalMarket().weightInitial] = `${weightInitial}`;
                this.tableTotalMarket[indexLine][getParamsHeaderTotalMarket().biggestFreight] = `${biggestFreight[getParamsHeaderTotalSystem().freight]}`;
                this.tableTotalMarket[indexLine][getParamsHeaderTotalMarket().biggestDeadline] = `${biggestDeadline[getParamsHeaderTotalSystem().deadline]}`;
                indexLine++;
            });
        }
    }
    insertWeightInitialInTableSystem() {
        this.tableSystem.forEach((line, i) => {
            if (i == 0) {
                return;
            }
            const lastWeightFinal = i != 1
                ? Number(this.tableSystem[i - 1][getParamsHeaderSystem().weightFinal])
                : 0;
            const weightFinal = i != 1
                ? Number(this.tableSystem[i][getParamsHeaderSystem().weightFinal])
                : 0;
            if (isNaN(lastWeightFinal)) {
                console.log(`Weight ${lastWeightFinal} of range cep ${line[getParamsHeaderSystem().cepInitial]} - ${line[getParamsHeaderSystem().cepFinal]} is not a number`);
                return;
            }
            const isFirstWeightOfCep = lastWeightFinal > weightFinal;
            if (!isFirstWeightOfCep) {
                line[getParamsHeaderSystem().weightInitial] = `${lastWeightFinal + (i != 1 ? 0.001 : 0)}`;
            }
            else {
                line[getParamsHeaderSystem().weightInitial] = `0`;
            }
        });
    }
    insertWeightInitialInTableMarket() {
        this.tableMarket.forEach((line, i) => {
            if (i == 0) {
                return;
            }
            const lastWeightFinal = i != 1
                ? Number(this.tableMarket[i - 1][getParamsHeaderMarket().weightFinal])
                : 0;
            const weightFinal = i != 1
                ? Number(this.tableMarket[i][getParamsHeaderMarket().weightFinal])
                : 0;
            if (isNaN(lastWeightFinal)) {
                console.log(`Weight ${lastWeightFinal} of range cep ${line[getParamsHeaderMarket().cepInitial]} - ${line[getParamsHeaderMarket().cepFinal]} is not a number`);
                return;
            }
            const isFirstWeightOfCep = lastWeightFinal > weightFinal;
            if (!isFirstWeightOfCep) {
                line[getParamsHeaderMarket().weightInitial] = `${lastWeightFinal + (i != 1 ? 0.001 : 0)}`;
            }
            else {
                line[getParamsHeaderMarket().weightInitial] = `0`;
            }
        });
    }
    groupTableMarketByCep() {
        this.tableMarketGroupByCep = this.groupTableByCep(this.tableMarket, getParamsHeaderMarket());
    }
    groupTableSystemByCep() {
        this.tableSystem.forEach((line, i) => {
            if (i == 0) {
                return;
            }
            const cepInitial = line[getParamsHeaderSystem().cepInitial];
            const cepFinal = line[getParamsHeaderSystem().cepFinal];
            const weightInitial = line[getParamsHeaderSystem().weightInitial];
            const weightFinal = line[getParamsHeaderSystem().weightFinal];
            const deadline = line[getParamsHeaderSystem().deadline];
            const freight = line[getParamsHeaderSystem().freight];
            if (typeof this.tableSystemGroupByCep[`${cepInitial}-${cepFinal}`] ==
                "undefined") {
                this.tableSystemGroupByCep[`${cepInitial}-${cepFinal}`] = [];
            }
            this.tableSystemGroupByCep[`${cepInitial}-${cepFinal}`].push({
                weightInitial,
                weightFinal,
                deadline: Number(deadline.replace(/,/g, ".")),
                freight: Number(freight.replace(/,/g, ".")),
            });
        });
    }
    groupTableByCep(table, config) {
        const tableGroupByCep = {};
        table.forEach((line, i) => {
            if (i == 0) {
                return;
            }
            const cepInitial = line[config.cepInitial];
            const cepFinal = line[config.cepFinal];
            const weightInitial = line[config.weightInitial];
            const weightFinal = line[config.weightFinal];
            if (typeof tableGroupByCep[`${cepInitial}-${cepFinal}`] == "undefined") {
                tableGroupByCep[`${cepInitial}-${cepFinal}`] = [];
            }
            tableGroupByCep[`${cepInitial}-${cepFinal}`].push({
                weightInitial,
                weightFinal,
            });
        });
        return tableGroupByCep;
    }
    getGroupSystemByRangeCep(cep) {
        return this.tableSystemGroupByCep[cep];
    }
    getGroupMarketByIndex(index) {
        return Object.keys(this.tableMarketGroupByCep).map((group) => this.tableMarketGroupByCep[group])[index];
    }
    getGroupMarketByRangeCep(cep) {
        return this.tableMarketGroupByCep[cep];
    }
    getCepOfGroupTableSystem() {
        return Object.keys(this.tableSystemGroupByCep).map((cepInitialFinal) => {
            const [cepInitialSystem, cepFinalSystem] = cepInitialFinal.split("-");
            return [cepInitialSystem, cepFinalSystem];
        });
    }
    getCepOfGroupTableMarket() {
        return Object.keys(this.tableMarketGroupByCep).map((cepInitialFinal) => {
            const [cepInitialSystem, cepFinalSystem] = cepInitialFinal.split("-");
            return [cepInitialSystem, cepFinalSystem];
        });
    }
}
