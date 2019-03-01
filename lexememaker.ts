
import { ToneSandhiInputingMorpheme, ToneSandhiSyllable, ToneSandhiRootMorpheme, Syllable, Morpheme } from './morpheme'
import { ToneSandhiInputingLexeme, ToneSandhiInflectionLexeme, TonalWord, DummyLexeme, Word, ToneSandhiLexeme, SandhiFormLexeme } from './lexeme'
import { GraphemeMaker } from './graphememaker'
import { ToneSandhiRootMorphemeMaker, ToneSandhiInputingMorphemeMaker, CombiningFormMorphemeMaker } from './morphememaker'
import { Tonal } from './system';
import { lowerLettersOfTonal } from './version2';

//------------------------------------------------------------------------------
//  Lexeme Maker
//------------------------------------------------------------------------------

abstract class SuperLexemeMaker {
    abstract morphemes

    preprocess() {
        // extract syllables from morphemes. concatenate syllables into a word.
        // wrap the word in a lexeme. use morephemes to populate lemmata of a lexeme.
        // assign inflectinal affix to a lexeme.
        // push the lexeme into an array of lexemes.
        // unpack morphemes and take syllables out from them
        let syllables: Array<ToneSandhiSyllable> = new Array();
        for(let key in this.morphemes) {
            syllables.push(this.morphemes[key].syllable);
        }

        return syllables
    }

    abstract make(syllables: Array<Syllable>)
}

abstract class LexemeMaker extends SuperLexemeMaker{
    abstract postprocess(tsl: ToneSandhiLexeme)
}

export abstract class InputingLexemeMaker extends SuperLexemeMaker {
    abstract postprocess(tsil: ToneSandhiInputingLexeme)
}

//------------------------------------------------------------------------------
//  Tone Sandhi Lexeme Maker
//------------------------------------------------------------------------------

export class ToneSandhiInputingLexemeMaker extends InputingLexemeMaker {
    morphemes: Array<ToneSandhiInputingMorpheme>;

    constructor(morphemes: Array<ToneSandhiInputingMorpheme>) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeInputingLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<ToneSandhiSyllable>) {
        return new ToneSandhiInputingLexeme(new TonalWord(syllables));
    }

    postprocess(tsil: ToneSandhiInputingLexeme) {
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
                // inflectional ending needs to be assigned to inputing lexeme
                tsil.assignInflectionalEnding(this.morphemes[this.morphemes.length-1].allomorph);
            }
        }

        // lemmata needs to be populated for inputing lexeme
        tsil.populateLemmata(this.morphemes);


        let lexemes: Array<ToneSandhiInputingLexeme> = new Array();

        for(let k in this.morphemes) {
            tsil.arrayOfSounds.push(this.morphemes[k].sounds)
        }
        
        lexemes.push(tsil);

        return lexemes
    }
}

export class ToneSandhiInflectionLexemeMaker extends LexemeMaker {
    morphemes: Array<ToneSandhiRootMorpheme>;

    constructor(morphemes: Array<ToneSandhiRootMorpheme>) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeInflectionLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<ToneSandhiSyllable>) {
        return new ToneSandhiInflectionLexeme(new TonalWord(syllables));
    }

    postprocess(tspl: ToneSandhiInflectionLexeme) {
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
            }
        }

        let lexemes: Array<ToneSandhiInflectionLexeme> = new Array();
        lexemes.push(tspl);

        return lexemes
    }
}

class SandhiFormLexemeMaker extends ToneSandhiInflectionLexemeMaker {
    tonal: Tonal

    constructor(morphemes: Array<ToneSandhiRootMorpheme>, tm?: Tonal) {
        super(morphemes)
        //this.morphemes = new Array();
        //this.morphemes = morphemes;
        if(tm != undefined) {
            this.tonal = tm
        }
    }

    makeSandhiLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<ToneSandhiSyllable>) {
        return new SandhiFormLexeme(new TonalWord(syllables));
    }

    postprocess(tspl: SandhiFormLexeme) {
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
                // tonal ending needs to be assigned to sandhi lexeme
                tspl.assignTonalEnding(this.morphemes[this.morphemes.length-1].allomorph);
            }
        }

        tspl.populateSandhiForm(this.morphemes, this.tonal)

        let lexemes: Array<SandhiFormLexeme> = new Array();
        lexemes.push(tspl);

        return lexemes
    }
    
}

export class DummyLexemeMaker {
    makeLexeme(str: string) {
        let l = new DummyLexeme();
        l.word = new Word();
        l.word.literal = str;
        return l;
    }
}

//------------------------------------------------------------------------------
//  Lexeme Turner
//------------------------------------------------------------------------------

export class TonalTurner {
    turnIntoGraphemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        return gm.makeGraphemes();
    }

    turnIntoMorphemes(str: string) {
        let graphemes = this.turnIntoGraphemes(str)

        // Morpheme Maker
        let tsimm = new ToneSandhiInputingMorphemeMaker(graphemes);
        return tsimm.makeInputingMorphemes();
    }

    turnIntoLexemes(str: string) {

        let morphemes = this.turnIntoMorphemes(str)

        // Lexeme Maker
        let tsilm = new ToneSandhiInputingLexemeMaker(morphemes);
        return tsilm.makeInputingLexemes();
    }
}

export class TurningIntoInflectionLexeme {
    turnIntoLexemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        let graphemes = gm.makeGraphemes();

        // Morpheme Maker
        let tsmm = new ToneSandhiRootMorphemeMaker(graphemes);
        let morphemes = tsmm.makeRootMorphemes();

        // Lexeme Maker
        let tslm = new ToneSandhiInflectionLexemeMaker(morphemes);
        let lexemes = tslm.makeInflectionLexemes();

        return lexemes;
    }
}

export class TurningIntoSandhiForm extends TurningIntoInflectionLexeme {
    tonal: Tonal

    constructor (tm: Tonal) {
        super()
        this.tonal = tm
    }

    turnIntoLexemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        let graphemes = gm.makeGraphemes();

        // Morpheme Maker
        let tsmm = new CombiningFormMorphemeMaker(graphemes);
        let morphemes = tsmm.makeCombiningMorphemes(); // only the last morpheme is used

        // Lexeme Maker
        let tslm = new SandhiFormLexemeMaker(morphemes, this.tonal);
        let lexemes = tslm.makeSandhiLexemes();

        return lexemes;
    }
}
