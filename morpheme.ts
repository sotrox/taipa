import { AlphabeticLetter, Final, ToneMark, Sound, MedialGraphs, NasalGraphs, 
        FreeToneMarkGraphs, CheckedToneMarkGraphs, NeutralFinalGraphs, FinalGraphs, InitialNasalGraphs,
        InitialGraphs, ToneMarkSS, FreeToneMarkY, ToneMarkW, FreeToneMarkX, ToneMarkXX, ToneMarkXXX, ToneMarkZZS, ToneMarkZS, 
        FinalP, FinalT, FinalK, FinalH, FinalB, FinalD, FinalG, FinalF, ToneMarkP, ToneMarkT, ToneMarkK, ToneMarkH, CheckedToneMarkY, 
        ToneMarkB, ToneMarkD, ToneMarkG, ToneMarkF, CheckedToneMarkX, Letter } from './grapheme'
import { ZeroToneMark } from './grapheme'
import { IDictionary, Dictionary } from './collection'
import { lowerLetters } from './graphememaker';

//------------------------------------------------------------------------------
//  Morph
//------------------------------------------------------------------------------

class Morph {}

//------------------------------------------------------------------------------
//  Tone Morpheme
//------------------------------------------------------------------------------

class PluralMorpheme {}
class TonalMorpheme {}

//------------------------------------------------------------------------------
//  Allomorph
//------------------------------------------------------------------------------


export class Allomorph extends Morph {
    toneMark: ToneMark = null;

    isToneMarkEqualTo(letter: AlphabeticLetter) {
        return this.toneMark.isEqualTo(letter);
    }

    hasZeroToneMark() {
        //return this.toneMark.isLetterNull();
        return this.toneMark.isCharacterNull();
    }

    getLiteral() {
        if(this.toneMark.getLiteral().length == 0) { 
            // return string 'zero' for first tone. member variable characters for graph is still null.
            return 'zero'; 
        } else return this.toneMark.getLiteral();
    }
}

export class FreeAllomorph extends Allomorph {}

export class CheckedAllomorph extends Allomorph {
    final: Final = null;
}

export class ZeroAllomorph extends FreeAllomorph {
    toneMark = new ZeroToneMark()
}

class AllomorphSS extends FreeAllomorph {
    toneMark = new ToneMarkSS()
}

export class AllomorphY extends FreeAllomorph {
    toneMark = new FreeToneMarkY()
}

export class AllomorphW extends FreeAllomorph {
    toneMark = new ToneMarkW()
}

export class AllomorphX extends FreeAllomorph {
    toneMark = new FreeToneMarkX()
}

class AllomorphXX extends FreeAllomorph {
    toneMark = new ToneMarkXX()
}

class AllomorphXXX extends FreeAllomorph {
    toneMark = new ToneMarkXXX()
}

class AllomorphZZS extends FreeAllomorph {
    toneMark = new ToneMarkZZS()
}

export class AllomorphZS extends FreeAllomorph {
    toneMark = new ToneMarkZS()
}

class AllomorphPP extends CheckedAllomorph {
    toneMark = new ToneMarkP()
    final = new FinalP()
}

class AllomorphTT extends CheckedAllomorph {
    toneMark = new ToneMarkT()
    final = new FinalT()
}

class AllomorphKK extends CheckedAllomorph {
    toneMark = new ToneMarkK()
    final = new FinalK()
}

class AllomorphHH extends CheckedAllomorph {
    toneMark = new ToneMarkH()
    final = new FinalH()
}

class AllomorphHY extends CheckedAllomorph {
    toneMark = new CheckedToneMarkY()
    final = new FinalH()
}

class AllomorphBB extends CheckedAllomorph {
    toneMark = new ToneMarkB()
    final = new FinalB()
}

class AllomorphDD extends CheckedAllomorph {
    toneMark = new ToneMarkD()
    final = new FinalD()
}

class AllomorphGG extends CheckedAllomorph {
    toneMark = new ToneMarkG()
    final = new FinalG()
}

class AllomorphFF extends CheckedAllomorph {
    toneMark = new ToneMarkF()
    final = new FinalF()
}

class AllomorphBX extends CheckedAllomorph {
    toneMark = new CheckedToneMarkX()
    final = new FinalB()
}

class AllomorphDX extends CheckedAllomorph {
    toneMark = new CheckedToneMarkX()
    final = new FinalD()
}

class AllomorphGX extends CheckedAllomorph {
    toneMark = new CheckedToneMarkX()
    final = new FinalG()
}

class AllomorphFX extends CheckedAllomorph {
    toneMark = new CheckedToneMarkX()
    final = new FinalF()
}

class ListOfFreeAllomorphs {
    protected getSS() { return new AllomorphSS() }
    protected getW() { return new AllomorphW() }
    protected getXX() { return new AllomorphXX() }
    protected getXXX() { return new AllomorphXXX() }
    protected getZZS() { return new AllomorphZZS() }
    protected getZS() { return new AllomorphZS() }
    protected getY() { return new AllomorphY() }
    protected getX() { return new AllomorphX() }
}

class ListOfFreeAllomorphsForInputing extends ListOfFreeAllomorphs {
    get ss() { return this.getSS() }
    get w() { return this.getW() }
    get xx() { return this.getXX () }
    get xxx() { return this.getXXX() }
    get zzs() { return this.getZZS() }
    get zs() { return this.getZS() }
    get y() { return this.getY() }
    get x() { return this.getX() }
}

class ListOfFreeAllomorphsForParsing extends ListOfFreeAllomorphs {
    get w() { return this.getW() }
    get zs() { return this.getZS() }

    get x() { return this.getX() }
    get y() { return this.getY() }
}

class ListOfAllomorphsInSandhiForm {
    // to specify the allomorphs in sandhi form
    listOfFreeAllomorphs: Array<Allomorph>  = new Array();
    listOfChechedAllomorphs: Array<Allomorph>  = new Array();

    lofafi = new ListOfFreeAllomorphsForInputing()

    constructor() {
        this.listOfFreeAllomorphs.push(this.lofafi.ss)
        this.listOfFreeAllomorphs.push(this.lofafi.w)
        this.listOfFreeAllomorphs.push(this.lofafi.xx)
        this.listOfFreeAllomorphs.push(this.lofafi.xxx)
        this.listOfFreeAllomorphs.push(this.lofafi.zzs)
        this.listOfFreeAllomorphs.push(this.lofafi.zs)

        this.listOfFreeAllomorphs.push(this.lofafi.y)
        this.listOfFreeAllomorphs.push(this.lofafi.x)

        //<> 

        this.listOfChechedAllomorphs.push(new AllomorphPP());
        this.listOfChechedAllomorphs.push(new AllomorphTT());
        this.listOfChechedAllomorphs.push(new AllomorphKK());
        this.listOfChechedAllomorphs.push(new AllomorphHH());
        this.listOfChechedAllomorphs.push(new AllomorphBB());
        this.listOfChechedAllomorphs.push(new AllomorphDD());
        this.listOfChechedAllomorphs.push(new AllomorphGG());
        this.listOfChechedAllomorphs.push(new AllomorphFF());
        this.listOfChechedAllomorphs.push(new AllomorphHY());
        this.listOfChechedAllomorphs.push(new AllomorphBX());
        this.listOfChechedAllomorphs.push(new AllomorphDX());
        this.listOfChechedAllomorphs.push(new AllomorphGX());
        this.listOfChechedAllomorphs.push(new AllomorphFX());
    }
}

class AllomorphP extends CheckedAllomorph {
    final = new FinalP()
}

class AllomorphT extends CheckedAllomorph {
    final = new FinalT()
}

class AllomorphK extends CheckedAllomorph {
    final = new FinalK()
}

class AllomorphH extends CheckedAllomorph {
    final = new FinalH()
}

class AllomorphB extends CheckedAllomorph {
    final = new FinalB()
}

class AllomorphD extends CheckedAllomorph {
    final = new FinalD()
}

class AllomorphG extends CheckedAllomorph {
    final = new FinalG()
}

class AllomorphF extends CheckedAllomorph {
    final = new FinalF()
}

class ListOfAllomorphsInBaseForm {
    // to specify the allomorphs in base form
    listOfFreeAllomorphs: Array<Allomorph>  = new Array();
    listOfChechedAllomorphs: Array<Allomorph>  = new Array();

    lofafp = new ListOfFreeAllomorphsForParsing()

    constructor() {
        this.listOfFreeAllomorphs.push(this.lofafp.w)
        this.listOfFreeAllomorphs.push(this.lofafp.zs)
        
        this.listOfFreeAllomorphs.push(this.lofafp.x)
        this.listOfFreeAllomorphs.push(this.lofafp.y)

        this.listOfChechedAllomorphs.push(new AllomorphP()); // -> pp
        this.listOfChechedAllomorphs.push(new AllomorphT()); // -> tt
        this.listOfChechedAllomorphs.push(new AllomorphK()); // -> kk
        this.listOfChechedAllomorphs.push(new AllomorphH()); // -> hh and hy
        this.listOfChechedAllomorphs.push(new AllomorphB()); // -> bb
        this.listOfChechedAllomorphs.push(new AllomorphD()); // -> dd
        this.listOfChechedAllomorphs.push(new AllomorphG()); // -> gg
        this.listOfChechedAllomorphs.push(new AllomorphF()); // -> ff
    }
}

//------------------------------------------------------------------------------
//  Root
//------------------------------------------------------------------------------

class LexicalRoot {
    stem: Stem
    affix: Affix
}

export class Stem {
    //stem of free tone
    //stem of checked tone
    //stem of neutral tone
    sounds: Array<Sound>;
    // abstract factory
}

class VowelStem extends Stem {}
class ConsonantStem extends Stem {}

export class Affix extends Morph {
    toneMark: ToneMark = null;
}

class FreeAffix extends Affix {}

class CheckedAffix extends Affix {
    final: Final = null;
}

class ZeroAffix extends FreeAffix {
    toneMark = new ZeroToneMark()
}

class Interfix extends Affix {}
class Suffix extends Affix {}

class DerivationalAffix {}

class GrammaticalSuffix {
    // desinence
}

//------------------------------------------------------------------------------
//  Free Allomorph Base Rules
//------------------------------------------------------------------------------

interface IDictionaryOfRules extends IDictionary {}

class DictionaryOfRules extends Dictionary {
    constructor(init: { key: string; value: Array<ToneMark>; }[]) {
        super(init);
    }

    toLookup(): IDictionaryOfRules {
        return this;
    }
}

export class FreeAllomorphBaseRules {
    readonly rules = new DictionaryOfRules([
        { key: 'ss', value: [new FreeToneMarkY()] },
        { key: 'w', value: [new ToneMarkZS(), new FreeToneMarkX()] },
        { key: 'xx', value: [new ToneMarkZS(), new ToneMarkSS, new FreeToneMarkX()] },
        { key: 'xxx', value: [new ToneMarkZS(), new ToneMarkSS(), new FreeToneMarkX()] },
        { key: 'zs', value: [new FreeToneMarkX(), new ToneMarkSS(), new ZeroToneMark()] },
        { key: 'zzs', value: [] },

        { key: 'x', value: [] },
        { key: 'y', value: [new ToneMarkW()] },

        { key: 'zero', value: [new FreeToneMarkY()] },
    ]).toLookup();
}
/*
export class FreeAllomorphSandhiRules {
    readonly rules = new DictionaryOfRules([
        { key: 'w', value: [new FreeToneMarkY()] },
        { key: 'zs', value: [new ToneMarkW()] },

        { key: 'x', value: [new ToneMarkZS()] },
        { key: 'y', value: [new ZeroToneMark()] },

        { key: 'zero', value: [new ToneMarkZS()] },
    ]).toLookup();
    
    readonly rulesOfZuan =new DictionaryOfRules([
        { key: 'x', value: [new ToneMarkW()] },
    ]).toLookup();
}
*/
//------------------------------------------------------------------------------
//  Tone Sandhi Morpheme
//------------------------------------------------------------------------------

export class Morpheme {}

class TonemarklessMorpheme extends Morpheme {}

export class ToneSandhiMorpheme extends Morpheme {}

export class ToneSandhiInputingMorpheme extends ToneSandhiMorpheme {
    syllable: ToneSandhiSyllable;
    allomorph: Allomorph = null; // required to populate stems

    constructor(syllable: ToneSandhiSyllable) {
        super();
        this.syllable = syllable;
        // assign allomorph for each syllable
        this.assignAllomorph();
    }

    assignAllomorph() {
        // assign the matched allomorph for this syllable
        // don't assign if the checked syllable is already in base form
        let allomorphs = new ListOfAllomorphsInSandhiForm();
        let aoas = []; // array of allomorphs

        //console.log(aotms)
        for(let key in allomorphs.listOfChechedAllomorphs) {
            if(allomorphs.listOfChechedAllomorphs[key].isToneMarkEqualTo(this.syllable.letters[this.syllable.letters.length-1])) {
                aoas.push(allomorphs.listOfChechedAllomorphs[key]);
                break;
            }
        }
        //console.log(aotms)

        if(aoas.length) {
            for(let i = 0; i < aoas.length; i++) {
                //console.log("aotms[i].final: %s", aotms[i].final.letter.literal);
                //console.log("letter: %s", this.syllable.letters[this.syllable.letters.length-2].literal)
                if(aoas[i].final.isEqualTo(this.syllable.letters[this.syllable.letters.length-2])) {
                    //console.log("hit. i: %d.", i)
                    this.allomorph = aoas[i];
                } else if(aoas[i].final.isEqualTo(this.syllable.letters[this.syllable.letters.length-1])) {
                    // if final is equal to tone mark
                    // this syllable is in base form
                    return;
                }
                // when there are no matches, it means this syllable is already in base form
            }
            if(this.allomorph != null) {
                // if there is allomorph
                return;
            }
        }
        //console.log(aotms)

        aoas = [];
        for(let key in allomorphs.listOfFreeAllomorphs) {
            if(allomorphs.listOfFreeAllomorphs[key].isToneMarkEqualTo(this.syllable.letters[this.syllable.letters.length-1])) {
                aoas.push(allomorphs.listOfFreeAllomorphs[key]);
                break;
            }
        }
        //console.log(aotms)

        if(aoas.length == 0) {
            // tone 1 has no allomorph
            this.allomorph = new ZeroAllomorph();
        } else if(aoas.length) {
            // are there multiple allomorphs? there should be only one.
            for(let i = 0; i < aoas.length; i++) {
                if(aoas[i].toneMark.isEqualToToneMark(new AllomorphX().toneMark)) {
                    // this syllable is already in base form
                } else {
                    this.allomorph = aoas[i];
                }
            }
        }
    }

    getBaseForms(): Array<ToneSandhiSyllable> {
        let facrs = new FreeAllomorphBaseRules();
        // get base forms as strings
        if(this.allomorph != null) {
            // member variable allomorph is not null
            if(this.allomorph instanceof FreeAllomorph) {
                if(this.allomorph.hasZeroToneMark()) {
                    // no need to pop letter
                    // push letter to make tone 2
                    // the base tone of the first tone is the second tone
                    // 1 to 2 <----
                    let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                    s.pushLetter(new AlphabeticLetter(facrs.rules['zero'][0].characters));
                    //console.log(this.syllable)
                    return [s];
                } else {
                    // the 7th tone has two baseforms
                    let ret = [];
                    for(let i in facrs.rules[this.allomorph.getLiteral()]) {
                        // pop letter
                        // push letter
                        let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                        if(!facrs.rules[this.allomorph.getLiteral()][i].isCharacterNull()) {
                            // when there is allomorph
                            // 2 to 3. 3 to 7. 7 to 5. 3 to 5.  <----
                            s.popLetter();
                            // there are base tonemarks
                            // includes ss and x, exclude zero suffix
                            s.pushLetter(new AlphabeticLetter(facrs.rules[this.allomorph.getLiteral()][i].characters));
                            ret.push(s);
                        } else {
                            // include zero suffix. the base tone of the seventh tone.
                            // exclude ss and x.
                            // 7 to 1 <----
                            // tone 1 has no allomorph
                            s.popLetter();
                            ret.push(s);
                        }
                    }
                    //console.log(ret)
                    return ret;
                }
            } else if(this.allomorph instanceof CheckedAllomorph) {
                // pop the last letter
                // no need to push letter
                // 1 to 4. 3 to 8. 2 to 4. 5 to 8.  <----
                let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                s.popLetter();
                //console.log(s)
                return [s];
            }
        } else {
            // member variable allomorph is null
            // this syllable is already in base form
            return [new ToneSandhiSyllable(this.syllable.letters)];
        }
        return []; // return empty array
    }
}

export class ToneSandhiParsingMorpheme extends ToneSandhiMorpheme {
    syllable: ToneSandhiSyllable;
    allomorph: Allomorph = null;


    constructor(syllable: ToneSandhiSyllable) {
        super();
        this.syllable = syllable;
    }

    assignAllomorph() {}
}

export class SandhiFormMorpheme extends ToneSandhiParsingMorpheme {
    ruleSetter: {[k: string]: any} = {
        firstToZS: function() {
            this.allomorph = new AllomorphZS()
        },
        zsToW: function() {
            this.allomorph = new AllomorphW()
        },
        wToY: function() {
            this.allomorph = new AllomorphY()
        },
        yToFirst: function() {
            this.allomorph = new ZeroAllomorph()
        },
        xToZS: function() {
            this.allomorph = new AllomorphZS()
            return 'allomorph xToZS set'
        },
        xToW: function() {
            this.allomorph = new AllomorphW()
        },
    }

    get rules() { return this.ruleSetter }

    getSandhiForm(): ToneSandhiSyllable  {
        return new ToneSandhiSyllable()
    }
}

export class RootMorpheme extends ToneSandhiMorpheme {
    // affix
    populateStem(msp: MatchedPattern) {
    }
}

//------------------------------------------------------------------------------
//  Syllable Patterns
//------------------------------------------------------------------------------

class PatternOfSounds {
    list: Array<Sound>

    toString() {
        let str = '';
        for(let i = 0; i < this.list.length; i++) {
            if(i+1 < this.list.length) {
                str += this.list[i].toString();
                str += '|';
            } else if(i+1 == this.list.length) {
                str += this.list[i].toString();
            }
        }
        return str;
    }
}

export class SyllablePatterns {
    list = new Array();

    constructor() {
        // one letter
        this.list.push([new MedialGraphs()]);
        this.list.push([new InitialNasalGraphs()]);

        // two letters
        this.list.push([new MedialGraphs(), new MedialGraphs()]);
        this.list.push([new MedialGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new MedialGraphs(), new FinalGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs()]);
        this.list.push([new InitialGraphs(), new NasalGraphs()]);
        this.list.push([new InitialNasalGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new InitialNasalGraphs(), new NasalGraphs()]);

        // three letters
        this.list.push([new MedialGraphs(), new MedialGraphs(), new MedialGraphs()]);
        this.list.push([new MedialGraphs(), new MedialGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new MedialGraphs(), new MedialGraphs(), new NasalGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new FinalGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new NasalGraphs()]);
        this.list.push([new InitialNasalGraphs(), new NasalGraphs(), new NeutralFinalGraphs()]);
        this.list.push([new InitialGraphs(), new NasalGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new MedialGraphs(), new FinalGraphs(), new CheckedToneMarkGraphs()]);

        // four letters
        this.list.push([new MedialGraphs(), new MedialGraphs(), new MedialGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new MedialGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new FinalGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new NasalGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new NasalGraphs(), new NeutralFinalGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new NasalGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new MedialGraphs(), new MedialGraphs(), new NasalGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new FinalGraphs(), new CheckedToneMarkGraphs()]);

        // five letters
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new NasalGraphs(), new NeutralFinalGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new NasalGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new FinalGraphs(), new CheckedToneMarkGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new MedialGraphs(), new FreeToneMarkGraphs()]);

        // lueifx, lurifx
    }
}

export class MatchedPattern {
    letters: Array<AlphabeticLetter> = new Array();
    pattern: Array<PatternOfSounds> = new Array();
    get matchedLength() { return this.pattern.length; }
}

//------------------------------------------------------------------------------
//  Syllable
//------------------------------------------------------------------------------


export class Syllable {
    literal: string = '';
}

export class ToneSandhiSyllable extends Syllable {
    letters: Array<AlphabeticLetter>;

    constructor(letters?: Array<AlphabeticLetter>) {
        super();
        this.letters = new Array();
        if(letters != undefined) {
            let len = letters.length;
            for(let i = 0; i < len; i++) {
                this.pushLetter(letters[i]);
            }
        }
    }

    isBaseForm() {
        // look up in the lexicon to check if this syllable is in base form
    }

    pushLetter(l: AlphabeticLetter) {
        this.letters.push(l);
        this.literal += l.literal;
        //console.log("%s", l.literal);
    }

    popLetter() {
        let tmp = this.literal.substr(0, this.literal.length-this.letters[this.letters.length-1].literal.length);
        this.literal = '';
        this.literal = tmp;
        this.letters = this.letters.slice(0, this.letters.length-1);
    }

    get lastLetter() {
        return this.letters[this.letters.length-1]
    }
}
