
import { ToneSandhiSyllable, Affix, LexicalStem, ToneSandhiMorpheme, Allomorph, FreeAllomorph, CheckedAllomorph } from './morpheme';
import { GrammaticalUnit } from './expression'


//------------------------------------------------------------------------------
//  Internal Sandhi Rule
//------------------------------------------------------------------------------


export class InternalSandhiRule {
    lexicalStem: LexicalStem
    affix: Affix
}

class ConsonantMutation extends InternalSandhiRule {}
class Epenthesis extends InternalSandhiRule {}
class Nasalization extends InternalSandhiRule {}
class Aspiration extends InternalSandhiRule {}
class Reduplication extends InternalSandhiRule {}

export class InflectionalEnding {
    affix: Affix = null;

    //makeAffix(){}
}

class FreeInflectionalEnding extends InflectionalEnding {
    affix: Affix = new Affix();
    baseAffixes: Array<Affix> = new Array();
/*
    havingZeroAffix() {
        return this.affix.havingZeroToneMark();
    }
*/
    //makeAffix(){}
}

class CheckedInflectionalEnding extends InflectionalEnding {
    affix: Affix = new Affix();
}


class Lexeme extends GrammaticalUnit {
}

export class ToneSandhiLexeme extends Lexeme {
    word: ToneSandhiWord
    inflectionalAffix: InflectionalEnding
    lemmata: Array<ToneSandhiWord>

    constructor(word: ToneSandhiWord) {
        super();
        this.word = word;
        this.inflectionalAffix = new InflectionalEnding();
    }

    assignInflectionalAffix(allomorph: Allomorph) {
        if(allomorph instanceof FreeAllomorph) {
            let fia = new FreeInflectionalEnding();
            fia.affix.toneMark = allomorph.toneMark;
            for(let key in allomorph.baseToneMarks) {
                let a = new Affix();
                a.toneMark = allomorph.baseToneMarks[key];
                fia.baseAffixes.push(a);
            }
            this.inflectionalAffix = fia;
        } else if(allomorph instanceof CheckedAllomorph) {
            let cia = new CheckedInflectionalEnding();
            cia.affix.toneMark = allomorph.toneMark;
            this.inflectionalAffix = cia;
        }
    }

    assignInternalSandhiRule() {
    }

    replaceLastSyllable(morphemes: Array<ToneSandhiMorpheme>) {
        let word = new ToneSandhiWord(this.word.syllables);
        word.popSyllable();
        word.pushSyllable(morphemes[morphemes.length-1].getBaseForms()[0]);
        //console.log(word.literal)
        return word;
    }

    getBaseForms(morphemes: Array<ToneSandhiMorpheme>): Array<ToneSandhiWord> {
        if(this.inflectionalAffix != null) {
            if(this.inflectionalAffix instanceof FreeInflectionalEnding) {
                if(this.inflectionalAffix.baseAffixes.length == 1) {
                    return [this.replaceLastSyllable(morphemes)];
                } else if(this.inflectionalAffix.baseAffixes.length > 1) {
                    let ret = [];
                    let arr = morphemes[morphemes.length-1].getBaseForms();
                    //console.log(arr)
                    for(let key in arr) {
                        let word = new ToneSandhiWord(this.word.syllables);
                        word.popSyllable();
                        word.pushSyllable(arr[key]);
                        ret.push(word);
                    }
                    return ret;
                }
            } else if(this.inflectionalAffix instanceof CheckedInflectionalEnding) {
                return [this.replaceLastSyllable(morphemes)];
            }
        }

        return [];
    }

    populateLemmata(morphemes: Array<ToneSandhiMorpheme>) {
        this.lemmata = new Array();

        // turn morphemes into lemmas
        let lms = this.getBaseForms(morphemes);
        //console.log(tmp.length)
        if(lms.length > 0) {
            for(let key in lms) {
                //console.log(bfs[key].literal)
                this.lemmata.push(lms[key]);
            }
        }

    }
}


//------------------------------------------------------------------------------
//  Lexeme
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Lexemes
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
//  Word
//------------------------------------------------------------------------------

export class Word {
    literal: string = '';

    evaluate() {}
}

export class InflectionWord extends Word {
}

export class AgglutinationWord extends Word {
}

export class ToneSandhiWord extends Word {
    syllables: Array<ToneSandhiSyllable>;

    constructor(syllables?: Array<ToneSandhiSyllable>) {
        super();
        this.syllables = new Array();
        if(syllables != undefined) {
            let len = syllables.length;
            for(var i = 0; i < len; i++) {
                this.pushSyllable(syllables[i]);
            }
        }
    }

    isBaseForm() {
        // look up in the lexicon to check if this lexeme is in base form
    }

    popSyllable() {
        let tmp = this.literal.substr(0, this.literal.length-this.syllables[this.syllables.length-1].literal.length);
        this.literal = tmp;
        this.syllables = this.syllables.slice(0, this.syllables.length-1);
    }

    pushSyllable(tss: ToneSandhiSyllable) {
        this.syllables.push(tss);
        this.literal += tss.literal;
    }
}

//------------------------------------------------------------------------------
//  IWords
//------------------------------------------------------------------------------
/*
export interface IWords {
    readonly [index: string]: ToneSandhiWord
}
*/
//------------------------------------------------------------------------------
//  Words
//------------------------------------------------------------------------------

export class Words {
}

export class ToneSandhiWords extends Words {
    process(morphemes: Array<ToneSandhiMorpheme>){
        // extract syllables from morphemes. concatenate syllables into a word.
        // wrap the word in a lexeme. use morephemes to populate lemmata of a lexeme.
        // assign inflectinal affix to a lexeme.
        // push the lexeme into an array of lexeme.

        let lexemes: Array<ToneSandhiLexeme> = new Array();

        // unpack lexical affixes and get syllables from them
        let syllables: Array<ToneSandhiSyllable> = new Array();
        for(let key in morphemes) {
            syllables.push(morphemes[key].syllable);
        }

        let tsl = new ToneSandhiLexeme(new ToneSandhiWord(syllables));
        if(morphemes.length > 0) {
            if(morphemes[morphemes.length-1].allomorphOfToneMorpheme != null) {
                tsl.assignInflectionalAffix(morphemes[morphemes.length-1].allomorphOfToneMorpheme);
                //console.log("pos got assigned inflectional affix")
            }
        }

        tsl.populateLemmata(morphemes);

        lexemes.push(tsl);

        return lexemes
    }
}

//------------------------------------------------------------------------------
//  Tone Sandhi Words
//------------------------------------------------------------------------------
/*
export let tonesandhiwords: IWords = {
}
*/