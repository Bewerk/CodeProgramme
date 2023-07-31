// Muss wenn zu nutzen noch in HMTL-Datei verlinkt werden.
/* VolksObjekt Klasse unnötig und ungenutzt.
class VolksObjekt {
    VolksBonus: number[];

    constructor() {
        this.VolksBonus = [0,0,0,0,0,0];
    }

    setVolksBonus(str:number, ges:number, konst:number, int:number, weis:number, cha:number) {
        this.VolksBonus[Attribut.Staerke] = str;
        this.VolksBonus[Attribut.Geschick] = ges;
        this.VolksBonus[Attribut.Konstitution] = konst;
        this.VolksBonus[Attribut.Intelligenz] = int;
        this.VolksBonus[Attribut.Weisheit] = weis;
        this.VolksBonus[Attribut.Charisma] = cha;
    }
}
*/
class Faehigkeit {
    constructor() {
    }
}
// unnötig.
var FaehigkeitIndex;
(function (FaehigkeitIndex) {
    FaehigkeitIndex[FaehigkeitIndex["Schleichen"] = 0] = "Schleichen";
    FaehigkeitIndex[FaehigkeitIndex["BerserkerWut"] = 1] = "BerserkerWut";
    FaehigkeitIndex[FaehigkeitIndex["Beten"] = 2] = "Beten";
    FaehigkeitIndex[FaehigkeitIndex["BlattSchuss"] = 3] = "BlattSchuss";
    FaehigkeitIndex[FaehigkeitIndex["HandAuflegen"] = 4] = "HandAuflegen";
    /*
    WaffeSchwert = 3,
    WaffeKolben = 4,
    WaffeAxt = 5,
    WaffeSpeer = 6,
    WaffeStab = 7,
    */
})(FaehigkeitIndex || (FaehigkeitIndex = {}));
const Schleichen = new Faehigkeit();
Schleichen.name = 'Schleichen';
Schleichen.besitz = false;
Schleichen.wert = 15;
Schleichen.beschreibung = 'Schleich dich, um nicht gesehen zu werden. Je höher der Wert, desto unsichtbarer bist du. Bei 100 hörst du auf zu existieren.';
//faehigkeitenArray.push(Schleichen);
const BerserkerWut = new Faehigkeit();
BerserkerWut.name = 'Berserkerwut';
BerserkerWut.besitz = false;
BerserkerWut.wert = 3;
BerserkerWut.beschreibung = 'Aktiviere Berserkerwut, um deinen Zorn in andere hineinzufräßen. Der Wert bestimmt die Anzahl an verfügbaren Runden. Nach dem Wüten bist du aber erstmal sehr entspannt und müde.';
//faehigkeitenArray.push(BerserkerWut);
const Beten = new Faehigkeit();
Beten.name = 'Beten';
Beten.besitz = false;
Beten.wert = 0;
Beten.beschreibung = 'Bete zu deinem Gott. Wenn du gut genug betest, wirst du erhört. Effekt Glaubensabhängig.';
//faehigkeitenArray.push(Beten);
const BlattSchuss = new Faehigkeit();
BlattSchuss.name = 'Blattschuss';
BlattSchuss.besitz = false;
BlattSchuss.wert = 0;
BlattSchuss.beschreibung = 'Schuss und weg.';
//faehigkeitenArray.push(BlattSchuss);
const HandAuflegen = new Faehigkeit();
HandAuflegen.name = 'Hand auflegen';
HandAuflegen.besitz = false;
HandAuflegen.beschreibung = 'leichte Wundheilung für einen Verbündeten in Armreichweite';
const MagieWirken = new Faehigkeit();
MagieWirken.name = 'Magie wirken';
MagieWirken.beschreibung = 'Die Fähigkeit, die Zauber eines Magiers wirken zu können';
const NaturKunde = new Faehigkeit();
NaturKunde.name = 'Naturkunde';
NaturKunde.beschreibung = 'Du kannst Frösche sezieren.';
const EinfacheWaffen = new Faehigkeit();
EinfacheWaffen.name = 'Einfache Waffen';
EinfacheWaffen.beschreibung = 'Die Fähigkeit einfache Waffen wie Dolche, Keulen und Stäbe zu nutzen.';
const KriegsWaffen = new Faehigkeit();
KriegsWaffen.name = 'Kriegswaffen';
KriegsWaffen.beschreibung = 'Die Fähigkeit Kriegswaffen wie Schwerter, Äxte und Armbrüste zu verwenden.';
const kaempferFaehigkeiten = [EinfacheWaffen, KriegsWaffen];
const schuetzenFaehigkeiten = [EinfacheWaffen, KriegsWaffen, BlattSchuss,];
const magierFaehigkeiten = [EinfacheWaffen, MagieWirken,];
const klerikerFaehigkeiten = [EinfacheWaffen, Beten, HandAuflegen];
const diebfaehigkeiten = [EinfacheWaffen, Schleichen, BlattSchuss];
const druideFaehigkeiten = [EinfacheWaffen, NaturKunde, HandAuflegen];
const paladinFaehigkeiten = [EinfacheWaffen, KriegsWaffen, HandAuflegen];
// faehigkeitenArray muss in Reihenfolge des enum Klasse aufgebaut sein. 
const faehigkeitenArray = [kaempferFaehigkeiten, schuetzenFaehigkeiten, magierFaehigkeiten, klerikerFaehigkeiten, diebfaehigkeiten, druideFaehigkeiten, paladinFaehigkeiten];
function getFaehigkeitenArray(klassenIndex) {
    return faehigkeitenArray[klassenIndex];
}
/*
const waffenTalentArray: Faehigkeit[] = [];

const WaffeSchwert = new Faehigkeit();
WaffeSchwert.name = 'Waffengattung: Schwert';
WaffeSchwert.besitz = false;
WaffeSchwert.wert = 0;
WaffeSchwert.beschreibung = 'Dein Können mit dieser Waffengattung. Der Wert verbessert deine Würfe.';
waffenTalentArray.push(WaffeSchwert);

const WaffeKolben = new Faehigkeit();
WaffeKolben.name = 'Waffengattung: Kolben';
WaffeKolben.besitz = false;
WaffeKolben.wert = 0;
WaffeKolben.beschreibung = 'Dein Können mit dieser Waffengattung. Der Wert verbessert deine Würfe.';
waffenTalentArray.push(WaffeKolben);

const WaffeAxt = new Faehigkeit();
WaffeAxt.name = 'Waffengattung: Axt';
WaffeAxt.besitz = false;
WaffeAxt.wert = 0;
WaffeAxt.beschreibung = 'Dein Können mit dieser Waffengattung. Der Wert verbessert deine Würfe.';
waffenTalentArray.push(WaffeAxt);

const WaffeSpeer = new Faehigkeit();
WaffeSpeer.name = 'Waffengattung: Speer';
WaffeSpeer.besitz = false;
WaffeSpeer.wert = 0;
WaffeSpeer.beschreibung = 'Dein Können mit dieser Waffengattung. Der Wert verbessert deine Würfe.';
waffenTalentArray.push(WaffeSpeer);

const WaffeStab = new Faehigkeit();
WaffeStab.name = 'Waffengattung: Stab';
WaffeStab.besitz = false;
WaffeStab.wert = 0;
WaffeStab.beschreibung = 'Dein Können mit dieser Waffengattung. Der Wert verbessert deine Würfe.';
waffenTalentArray.push(WaffeStab);
*/
//# sourceMappingURL=Faehigkeiten.js.map