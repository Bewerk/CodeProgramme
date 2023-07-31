// Alternative Zugriffsmöglichkeit (enum bevorzugt):
// const StaerkeIndex: number = 0;
// using enum instead:
enum Attribut{
    Staerke = 0,
    Geschick = 1,
    Konstitution = 2,
    Intelligenz = 3,
    Weisheit = 4,
    Charisma = 5,
}

enum Volk{
    Mensch = 0,
    Elf = 1,
    Zwerg = 2,
    Ork = 3,
}

enum Klasse{
    Kaempfer = 0,
    Schuetze = 1,
    Magier = 2,
    Kleriker = 3,
    Dieb = 4,
    Druide = 5,
    Paladin = 6,
}
/* in Faehigkeiten.ts definiert.
enum FaehikeitIndex{
    Schleichen = 0,
    BerserkerWut = 1,
    Beten = 2,
    WaffeSchwert = 3,
    WaffeKolben = 4,
    WaffeAxt = 5,
    WaffeSpeer = 6,
    WaffeStab = 7,
}

// charKlassenFaehigkeitenArray zeigt an ob Klasse Fähigkeit besitzt, und wie gut. [enum Klasse][enum FaehigkeitIndex]
const charKlassenFaehigkeitenArray =   [[1,0,0,0,0],
                                        [1,0,0,1,0],
                                        [1,0,0,0,0],
                                        [0,0,2,0,1],
                                        [2,0,0,1,0],
                                        [1,0,0,0,1],
                                        [0,0,1,0,1]];
*/


// VolksBoniArray[enum Volk][enum Attribut]
const VolksBoniArray: number[][] = [[0,0,0,0,0,0],
                                    [0,2,-2,0,0,0],
                                    [0,0,2,0,0,-2],
                                    [2,0,0,-2,0,0]];
                                    
function getVolksBoniArray():number[][] {
    return VolksBoniArray;
}

class CharakterObjekt {
    public AttributArray: AttributsObjekt[]; // Array mit allen AttributsWerten, zugreifbar über enum 'Attribut'
    // public AttributArray: number[];

    public restPunkte: number;
    public grundSumme: number;

    public minAttributsWert: number;
    //public VolksArray: string[];
    public Volk: string;
    public Klasse: string;
    public Faehigkeiten: Faehigkeit[];
    

    // Lohnt sich vllt. in eigene Objekte zu verpacken:
    // (Aber was ist mit Abhängigkeiten von AttributsObjekt-Werten?)
    public trefferpunkte: number;
    public ruestungsklasseGesamt: number;
    public ruestungsklasseBeruehr: number;
    public ruestungsklassePanzer: number;
    public grundAngriffsbonus: number;
    public nahkampfBonus: number;
    public fernkampfBonus: number;

    constructor() {
        this.restPunkte = 25;
        this.grundSumme = 85;

        this.minAttributsWert = 3;
        this.trefferpunkte = 10;
        this.ruestungsklasseGesamt = 10;
        this.ruestungsklassePanzer = 10;
        this.ruestungsklasseBeruehr = 10;
        this.grundAngriffsbonus = 1;


        let Staerke = new AttributsObjekt(Attribut.Staerke);
        let Geschick = new AttributsObjekt(Attribut.Geschick);
        let Konstitution = new AttributsObjekt(Attribut.Konstitution);
        let Intelligenz = new AttributsObjekt(Attribut.Intelligenz);
        let Weisheit = new AttributsObjekt(Attribut.Weisheit);
        let Charisma = new AttributsObjekt(Attribut.Charisma);

        //this.AttributArray = [10, 10, 10, 10, 10, 10];
        this.AttributArray = [Staerke, Geschick, Konstitution, Intelligenz, Weisheit, Charisma];
        this.Faehigkeiten = getFaehigkeitenArray(Klasse.Kaempfer);

        //this.VolksArray = ['Mensch','Elf','Zwerg','Ork'];
        this.Volk = 'Mensch';
        this.Klasse = 'Kaempfer';

    }

    getStaerke() {
        return this.AttributArray[Attribut.Staerke];
        // return this.AttributArray[StaerkeIndex];
    }

    getAttribut(x: Attribut) {
        return this.AttributArray[x].GrundWert;
    }

    getAttributEffektivWert(x: Attribut) {
        this.AttributArray[x].refreshEffektivWert();
        return this.AttributArray[x].EffektivWert;
    }

    setAttribut(x: Attribut, toAdd: number) {
        this.AttributArray[x].GrundWert += toAdd;
        this.AttributArray[x].refreshEffektivWert();
    }

    calcFaehigkeiten(){
        this.Faehigkeiten = getFaehigkeitenArray(Klasse[this.Klasse]);
        
        /*
        for (let i of this.Faehigkeiten) {
            if (charKlassenFaehigkeitenArray[Klasse[this.Klasse]][FaehigkeitIndex[i.name]] > 0) {
                if(i.besitz) {
                    //i.wert += i.pluswert
                }
                else {
                    i.besitz = true;
                }
            }
            // nochmal für Volksfähigkeiten
            else {
                i.besitz = false;
            }
        }
        */
    }

    calcTrefferPunkte(){
        this.AttributArray[Attribut.Konstitution].refreshModifikator();
        // Trefferwürfel der Klasse bestimmen. Maximum.
        let klassenTrefferpunkte: number = 0;
        if (Klasse[this.Klasse] == Klasse.Magier) {
            klassenTrefferpunkte = 6;
        }
        else if ([Klasse.Schuetze, Klasse.Kleriker, Klasse.Dieb, Klasse.Druide].includes(Klasse[this.Klasse])) {
            klassenTrefferpunkte = 8;
        }
        else {
            klassenTrefferpunkte = 10;
        }
        this.trefferpunkte = klassenTrefferpunkte + this.AttributArray[Attribut.Konstitution].Modifikator;

    }

    calcRuestungsklasse() {
        this.ruestungsklasseBeruehr = 10 + this.AttributArray[Attribut.Geschick].Modifikator;
        this.ruestungsklasseGesamt = 10 + this.AttributArray[Attribut.Geschick].Modifikator;
        this.ruestungsklassePanzer = 10;

        this.ruestungsklasseGesamt = Math.max(this.ruestungsklasseBeruehr, this.ruestungsklassePanzer, this.ruestungsklasseGesamt);
    }

    calcGrundAngriffsBonus() {
        let classBonus: number = 0;
        let hasClassBonus: boolean = [Klasse.Kaempfer,Klasse.Schuetze,Klasse.Paladin].includes(Klasse[this.Klasse]);
        if (hasClassBonus) {
            classBonus = 1;
        }
        this.grundAngriffsbonus = classBonus;
        this.nahkampfBonus = classBonus + this.AttributArray[Attribut.Staerke].Modifikator;
        this.fernkampfBonus = classBonus + this.AttributArray[Attribut.Geschick].Modifikator;
    }

    /*
    checkIntegrity() {

    }
    */
}

class AttributsObjekt {
    // noch zu tun: GrundBonus/ VolksBonus entscheiden welches nötig ist.
    AttributsTyp: Attribut;
    GrundWert: number;
    GrundBonus: number;
    VolksBonus: number;
    DauerBonus: number;
    KurzBonus: number;
    EffektivWert: number;
    Modifikator: number;

    constructor(attributsTyp: Attribut) {
        this.AttributsTyp = attributsTyp;
        this.GrundWert = 10;
        this.GrundBonus = 0;
        this.VolksBonus = 0;
        this.DauerBonus = 0;
        this.KurzBonus = 0;
        this.EffektivWert = 10;
        this.Modifikator = 0;
    }

    refreshModifikator() {
        this.Modifikator = Math.floor((this.EffektivWert - 10) / 2); 
    }

    refreshEffektivWert() {
        this.EffektivWert = this.GrundWert + this.VolksBonus + this.DauerBonus + this.KurzBonus;
        this.refreshModifikator();
    }

    setGrundWert(value: number) {
        this.GrundWert = value;
        this.refreshEffektivWert();
    }

    setVolksBonus(value:number) {
        this.VolksBonus = value;
        this.refreshEffektivWert();
    }
}