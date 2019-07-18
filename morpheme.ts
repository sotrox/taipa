import { AlphabeticLetter, Sound, AlphabeticGrapheme } from './grapheme'
import { TonalAffix, Allomorph } from './tonal/version2'
import { TonalUncombiningMorpheme, TonalSyllable } from './tonal/morpheme';
import { KanaUncombiningMorpheme } from './kana/morpheme';
import { TonalCombiningMorpheme } from './dependencyparser/rulebasedtagger';

//------------------------------------------------------------------------------
//  Metaplasm
//------------------------------------------------------------------------------

export abstract class CombiningMetaplasm {
    abstract apply(syllable: Syllable, allomorphe: Allomorph): Array<Syllable>
}

export class TonalCombiningMetaplasm extends CombiningMetaplasm {
    apply(syllable: TonalSyllable, allomorph: Allomorph): Array<TonalSyllable> { return [] }
}

export class RemovingEpenthesisOfAy extends TonalCombiningMetaplasm {
    // epenthesis, nasalization.
}

export class RemovingNasalizationOfAy extends TonalCombiningMetaplasm {}

//------------------------------------------------------------------------------
//  Syllabary
//------------------------------------------------------------------------------

export abstract class Syllabary {
    list: Array<Sound[]> = new Array()
    abstract setFirstLetter(beginning: string): void
}

//------------------------------------------------------------------------------
//  Tone Morpheme
//------------------------------------------------------------------------------

class PluralMorpheme {}
class TonalMorpheme {}

//------------------------------------------------------------------------------
//  Root
//------------------------------------------------------------------------------

class LexicalRoot {
    //stem: LexicalStem
    //affix: TonalAffix
}

export class LexicalStem {
    //sounds: Array<Sound>;
}

class VowelStem extends LexicalStem {}
class ConsonantStem extends LexicalStem {}

class DerivationalAffix {
    // lexical ending
}

class GrammaticalSuffix {
    // desinence
}

//------------------------------------------------------------------------------
//  Tone Sandhi Morpheme
//------------------------------------------------------------------------------

export abstract class Morpheme {
    abstract syllable: Syllable
}

//------------------------------------------------------------------------------
//  Syllable Patterns
//------------------------------------------------------------------------------

export class MatchedPattern {
    letters: Array<AlphabeticLetter> = new Array();
    pattern: Array<Sound> = new Array();
    get matchedLength() { return this.letters.length; } // length of pattern can be optionally returned
}

//------------------------------------------------------------------------------
//  Syllable
//------------------------------------------------------------------------------

export class Syllable {
    literal: string = '';

    letters: Array<AlphabeticLetter>;

    constructor(letters?: Array<AlphabeticLetter>) {
        this.letters = new Array();
        if(letters != undefined) {
            let len = letters.length;
            for(let i = 0; i < len; i++) {
                this.pushLetter(letters[i]);
            }
        }
    }

    pushLetter(l: AlphabeticLetter) {
        this.letters.push(l);
        this.literal += l.literal;
        //console.log("%s", l.literal);
    }

    get lastLetter() {
        if(this.letters.length >= 1) return this.letters[this.letters.length-1]
        return null
    }

    get lastSecondLetter() {
        if(this.letters.length >= 2) return this.letters[this.letters.length-2]
        return null
    }
}

//------------------------------------------------------------------------------
//  Lexeme Maker
//------------------------------------------------------------------------------

export abstract class MorphemeMaker {
    abstract graphemes: Array<AlphabeticGrapheme>

    //abstract create(syllable: Syllable): Morpheme

    //abstract createArray<T extends Morpheme>(): Array<T>
    
    preprocess() {
        // unpack graphemes and get letters from them
        let letters: Array<AlphabeticLetter> = new Array();
        for(let key in this.graphemes) {
            letters.push(this.graphemes[key].letter);
        }
        return letters        
    }

    abstract make(letters: Array<AlphabeticLetter>, 
                    syllabary: Syllabary, 
                    syllabify: (letters: Array<AlphabeticLetter>, 
                                beginOfSyllable: number, 
                                syllabary: Syllabary) => MatchedPattern): TonalUncombiningMorpheme[] | TonalCombiningMorpheme[] | KanaUncombiningMorpheme[]
/*
    make(letters: Array<AlphabeticLetter>, syllabary: Syllabary, syllabify: (letters: Array<AlphabeticLetter>, beginOfSyllable: number, syllabary: Syllabary) => MatchedPattern) {
        // a word can be made of multiple syllables
        let morphemes = this.createArray()
        //let arraysOfSounds: Array<Sound[]> = new Array()
        
        //console.log(letters);
        let beginOfSyllable: number = 0;
        for(let i = 0; i < letters.length; i++) {
            //console.debug("examining letter: %s. length of letters: %d. i: %d. beginOfSyllable: %d", letters[i].literal, letters.length, i, beginOfSyllable);
            
            let msp: MatchedPattern = new MatchedPattern();
            if(i-beginOfSyllable == 0) {
                
                msp = syllabify(letters, beginOfSyllable, syllabary)

                if(msp.matchedLength == 0) {
                    //console.log('no matched syllables found. the syllable might need to be added')
                }

                //console.log("matchedLen: %d", msp.matchedLength);
                //console.log(msp.pattern);
                //console.log(msp.letters)

                let tsm: Morpheme;
                if(msp.letters.length > 0) {
                    for(let j in msp.letters) {
                        //console.log("msp.letters: %s", msp.letters[j].literal)
                    }
                    tsm =  this.create(new Syllable(msp.letters))

                    if(tsm instanceof TonalUncombiningMorpheme) {
                        tsm.sounds = msp.pattern
                    }

                    //arraysOfSounds.push(msp.pattern)

                    // here we should match the combining form with its root

                    morphemes.push(tsm);
                }

                beginOfSyllable += msp.matchedLength;
            }
            
            if(morphemes.length == 0) {
                //console.log('nothing matched')
            } else if(morphemes.length >= 1) {
                if(msp == undefined) break

                if(msp.matchedLength > 0) {
                    i += beginOfSyllable-i-1;
                }

            }
        }
        //if(result.messages.length == 0) result = new Success()
        return morphemes
    }
    */
}
