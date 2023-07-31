export class SpreizungData {
    public alphabet: string;
    public keyword: string;
    public keynumbers: string;
    public confusingProperty: number;
    field: string = 'test';

    constructor(alphabet: string, keyword: string, keynumbers: string, field: string) {
        this.alphabet = alphabet;
        this.keyword = keyword;
        this.keynumbers = keynumbers;
        this.field = field;
        console.log('constructor here');
    }

    public calculate() {
        console.log('calculate');
        this.calculate_intern();
    }

    private calculate_intern() {
        console.log('calculate_intern');
    }
}

class NextClass extends SpreizungData {
    constructor(alphabet:string, keyword: string, keynumbers: string, field: string) {
        super(alphabet, keyword, keynumbers, field);
        this.alphabet = alphabet;
    }
}

class SpreizungObjekt {
    public alphabet: string;
    public keyword: string;
    public keynumbers: string;
    public input: string;
    public whichway: string;
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
