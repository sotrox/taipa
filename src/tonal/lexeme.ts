import { TonalSyllable, TonalUncombiningMorpheme } from './morpheme';
import { Word, LexemeMaker, Lexeme } from '../unit';
import { FreeAllomorph, CheckedAllomorph, Allomorph } from './version2';
import { TonalAffix } from './version2';
import { TonalLemmatization } from './metaplasm';

class Ending {}

export class InflectionalEnding extends Ending {
  affix: TonalAffix = new TonalAffix(); // the affix of this word
  toString() {
    return this.affix.toString();
  }
}

export class FreeInflectionalEnding extends InflectionalEnding {}

export class CheckedInflectionalEnding extends InflectionalEnding {}

export class AllomorphicEnding extends Ending {
  allomorph: Allomorph = new Allomorph();
  toString() {
    return this.allomorph.toString();
  }
}

export class FreeAllomorphicEnding extends AllomorphicEnding {}

export class CheckedAllomorphicEnding extends AllomorphicEnding {}

/** A word made of syllables. */
export class TonalWord extends Word {
  syllables: Array<TonalSyllable>;
  constructor(syllables: Array<TonalSyllable>) {
    super();
    this.syllables = new Array<TonalSyllable>();
    if (syllables != undefined) {
      this.syllables = syllables;
      this.concat();
    }
  }

  popSyllable() {
    this.syllables = this.syllables.slice(0, this.syllables.length - 1);
    this.concat();
  }

  pushSyllable(syllable: TonalSyllable) {
    this.syllables.push(syllable);
    this.concat();
  }

  shiftSyllable() {
    const syl = this.syllables.shift();
    this.concat();
    return syl;
  }

  unshiftSyllable(syllable: TonalSyllable) {
    const num = this.syllables.unshift(syllable);
    this.concat();
    return num;
  }

  replaceSyllable(i: number, syllable: TonalSyllable) {
    if (i < this.syllables.length) {
      this.syllables.splice(i, 1, syllable);
    }
    this.concat();
  }

  private concat() {
    this.literal = this.syllables.map(x => (x ? x.literal : '')).join('');
  }
}

/** A word and its lemmas/base forms. */
export class TonalLemmatizationLexeme extends Lexeme {
  word: TonalWord;
  private lemmata: Array<TonalWord> = new Array(); // lexical forms. underlying forms
  private inflectionalEnding: InflectionalEnding;

  constructor(
    morphemes: Array<TonalUncombiningMorpheme>,
    metaplasm: TonalLemmatization
  ) {
    super();

    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map(x => x.syllable));

    if (morphemes.length > 0) {
      if (morphemes[morphemes.length - 1].allomorph) {
        this.inflectionalEnding = this.assignInflectionalEnding(
          morphemes[morphemes.length - 1].allomorph
        );
      } else {
        this.inflectionalEnding = new InflectionalEnding();
      }
    } else {
      this.inflectionalEnding = new InflectionalEnding();
    }

    if (morphemes.length > 0)
      this.lemmata = metaplasm.apply(morphemes, this.inflectionalEnding);
  }

  getLemmas() {
    // this must be called after populateLemmata is called
    return this.lemmata;
  }

  getInflectionalEnding() {
    if (this.inflectionalEnding) return this.inflectionalEnding.toString();
    return '';
  }

  private assignInflectionalEnding(allomorph: Allomorph) {
    let infe: InflectionalEnding = new InflectionalEnding();
    // change allomorph to affix
    if (allomorph instanceof FreeAllomorph) {
      let fie = new FreeInflectionalEnding();
      fie.affix.tonal = allomorph.tonal;
      infe = fie;
    } else if (allomorph instanceof CheckedAllomorph) {
      let cie = new CheckedInflectionalEnding();
      cie.affix.tonal = allomorph.tonal;
      infe = cie;
    }
    // this word is already in base form, and its last syllable is checked tone
    return infe;
  }
}

export class TonalLemmatizationLexemeMaker extends LexemeMaker {
  constructor() {
    super();
  }

  makeLexemes(morphemes: Array<TonalUncombiningMorpheme>) {
    return this.make(morphemes);
  }

  protected make(morphemes: Array<TonalUncombiningMorpheme>) {
    // inflectional stem with x in the middle
    return new TonalLemmatizationLexeme(morphemes, new TonalLemmatization());
  }
}
