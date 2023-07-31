"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpreizungData = void 0;
class SpreizungData {
    constructor(alphabet, keyword, keynumbers, field) {
        this.field = 'test';
        this.alphabet = alphabet;
        this.keyword = keyword;
        this.keynumbers = keynumbers;
        this.field = field;
        console.log('constructor here');
    }
    calculate() {
        console.log('calculate');
        this.calculate_intern();
    }
    calculate_intern() {
        console.log('calculate_intern');
    }
}
exports.SpreizungData = SpreizungData;
class NextClass extends SpreizungData {
    constructor(alphabet, keyword, keynumbers, field) {
        super(alphabet, keyword, keynumbers, field);
        this.alphabet = alphabet;
    }
}
class SpreizungObjekt {
    //public toEncryptElseDecrypt: boolean;
    // whichway und toEncryptElseDecrypt sind für den gleichen Zweck -> ob zu verschlüsseln oder entschlüsseln.
    constructor() {
        this.alphabet = '';
        this.keyword = '';
        this.keynumbers = '';
        this.input = '';
        this.whichway = '';
        //this.toEncryptElseDecrypt = null;
    }
}
//# sourceMappingURL=SpreizungData.js.map