import { Syllable, MorphemeMaker, MatchedPattern, Morpheme } from '../unit';
import {
  freeAllomorphUncombiningRules,
  checkedAllomorphs,
  freeAllomorphs,
  ZeroAllomorph,
  AllomorphX,
  TonalLetterTags,
  lowerLettersTonal,
  tonalPositionalLetters,
  TonalSpellingTags,
  uncombiningRulesAy,
  CheckedAllomorph,
  Allomorph,
  freeToneLettersTonal,
  initialConsonantsTonal,
  stopFinalConsonantsTonal,
} from './version2';
import {
  AlphabeticLetter,
  AlphabeticGrapheme,
  PositionalLetter,
} from '../unit';
import { TonalPositionalLetterGenerator } from './lettergen';
import { isInSyllableTable } from './syllabletable';
import {
  smMnngHF,
  smMnngHWx,
  smBgkpF,
  regexJlsF,
  regexMnngHF,
  regexLsWx,
  regexMnngHWx,
  smJlsF,
  smLsWx,
  smBgkpWx,
  smIENGFywxz,
  smIK,
} from './matcher';
import {
  epentheticLetters,
  toneLettersWx,
  sandhiFinalsPPpttt,
  fourthToEighthFinalConsonants,
  nasalInitialConsonants,
  sandhiFinalConsonantsBgjlsbbggllss,
  finalConsonantsForBgjlsbbggllss,
} from './collections';
import {
  LastSyllableForms,
  PrecedingAyexUncombining,
  TonalUncombiningForms,
  TransfixUncombining,
  UncombiningFormsIetfIetwToEkEkk,
} from './metaplasm';
import { TonalCombiningMetaplasm, RemovingEpenthesisOfAy } from '../metaplasm';

export function syllabifyTonal(
  letters: Array<AlphabeticLetter>,
  beginOfSyllable: number
) {
  // get the longest matched syllable pattern

  let literal = '';
  let matched = '';
  let begin: number = 0;
  let ltrs: Array<string> = new Array();
  let matchedLtrs: Array<string> = new Array();
  let literalLexicalRootFourth = '';
  let literalLexicalRootEighth = '';

  for (let i = beginOfSyllable; i < letters.length; i++) {
    literal = literal + letters[i].literal;
    ltrs.push(letters[i].literal);
    // console.log(`begining of the loop: ${literal}. ${ltrs}`);
    const had = fourthToEighthFinalConsonants.has(letters[i].literal);
    if (
      i + 1 < letters.length &&
      had &&
      TonalLetterTags.w === letters[i + 1].literal
    ) {
      const got = fourthToEighthFinalConsonants.get(letters[i].literal);
      // restore the lexical roots for 4th final consonants, which is 8th finals
      // in case of absent 8th roots, 4th roots should also be restored
      // e.g. koehwlaih, jiwpowcitwlaw, khihwlih
      // 4th and 8th roots for 3rd checked tones
      if (got) {
        // since it is 4th finals, length of 4th final is one, just slice one character
        literalLexicalRootEighth =
          literalLexicalRootFourth.slice(0, literalLexicalRootFourth.length) +
          got;
        // console.log(`literalRoot4thFinal: ${literalRoot4thChecked}, 8th: ${literalRoot8thChecked}`);
        // the below fourth should go after the above eighth
        literalLexicalRootFourth =
          literalLexicalRootFourth + letters[i].literal;
      }
    } else {
      literalLexicalRootFourth = literalLexicalRootFourth + letters[i].literal;
    }

    if (
      isInSyllableTable(literal) &&
      freeToneLettersTonal.includes(letters[i].literal)
    ) {
      // console.log(`i: ${i}, literal: ${literal}, tone: ${letters[i].literal}, letters[i+1]: ${letters[i + 1].literal}`)
      if (begin === beginOfSyllable) {
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
      }
      break;
    } else if (
      (isInSyllableTable(literalLexicalRootFourth) ||
        isInSyllableTable(literalLexicalRootEighth)) &&
      stopFinalConsonantsTonal.includes(letters[i].literal)
    ) {
      // console.log(`i: ${i}, literal: ${literal}, root4th: ${literalLexicalRootFourth}, root8th: ${literalLexicalRootEighth}, stopFinalConsonant: ${letters[i].literal}`);
      // console.log(`begin: ${begin}, beginOfSyllable: ${beginOfSyllable}`);
      if (begin === beginOfSyllable) {
        matched = literal; // assign literal instead of literalRoot4thFinal
        Object.assign(matchedLtrs, ltrs);
      }
      break;
    } else if (freeToneLettersTonal.includes(letters[i].literal)) {
      // check tonals is the subset of free tonals

      // console.log(`i: ${i}, literal: ${literal}, letters[i].literal, ${letters[i].literal}`);

      // when there are tonals

      if (
        literal.length > 1 &&
        letters[i] &&
        letters[i - 1] &&
        (smBgkpF(letters[i - 1].literal, letters[i].literal) ||
          smBgkpWx(letters[i - 1].literal, letters[i].literal) ||
          smJlsF(letters[i - 1].literal, letters[i].literal) ||
          smLsWx(letters[i - 1].literal, letters[i].literal))
      ) {
        // b, g, bb, gg, l, j, s, ll, ss need to be handled in TonalCombiningMorpheme.assignAllomorph
        // this combining form is not present in the pool.
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
        break;
      } else if (
        literal.length > 2 &&
        letters[i] &&
        letters[i - 1] &&
        letters[i - 2] &&
        smMnngHWx(
          letters[i - 2].literal,
          letters[i - 1].literal,
          letters[i].literal
        )
      ) {
        // for syllables end with ~mhw.
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
        break;
      } else if (
        literal.length > 3 &&
        letters[i] &&
        letters[i - 1] &&
        letters[i - 2] &&
        letters[i - 3] &&
        smIENGFywxz(
          letters[i - 3].literal,
          letters[i - 2].literal,
          letters[i - 1].literal,
          letters[i].literal
        )
      ) {
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
        break;
      }

      // tone change of free allomorphs
      const rulesFa = freeAllomorphUncombiningRules.get(letters[i].literal);
      const tnlsFa = !rulesFa ? [] : rulesFa.map(x => x.toString());
      // tone sandhi of ay
      const rulesAy = uncombiningRulesAy.get(letters[i].literal);
      const tnlsAy = !rulesAy ? [] : rulesAy.map(x => x.toString());
      // merge the above twoo arrays
      const tnls = tnlsFa.concat(
        tnlsAy.filter(item => tnlsFa.indexOf(item) < 0)
      );
      // console.log(`literal: ${literal}}`);
      if (tnls.length > 0) {
        for (let t of tnls) {
          // console.log(literal, t.toString());
          if (
            isInSyllableTable(
              letters
                .slice(beginOfSyllable, i)
                .map(x => x.literal)
                .join('') + t
            )
          ) {
            // this combining form is not present in the pool,
            // but its uncombining forms are. e.g. aw.
            matched = literal;
            Object.assign(matchedLtrs, ltrs);
            break;
          }
        }
        if (matched.length > 0 && matchedLtrs.length > 0) break;
      } else {
        // no uncombining forms for this combining form. e.g. ax.
        matched = '';
        matchedLtrs = [];
      }
    } else if (isInSyllableTable(literal)) {
      matched = literal;
      Object.assign(matchedLtrs, ltrs);
      begin = beginOfSyllable;
      // console.log(matched);
    } else {
      // console.log('no matched for syllabifyTonal:' + ltrs);

      // when there are no tonals

      if (sandhiFinalConsonantsBgjlsbbggllss.includes(letters[i].literal)) {
        // for the syllables with sandhi final consonants that are not present in syllable tables
        const literalWithoutFinal = letters
          .map((val, ind, arr) => (ind < i ? arr[ind].literal : ''))
          .join('');
        const gotFinalConsonants = finalConsonantsForBgjlsbbggllss.get(
          letters[i].literal
        );
        if (gotFinalConsonants) {
          // check if at least one uncombinging form present
          const isUncombingFormPresent = gotFinalConsonants
            .map(it => isInSyllableTable(literalWithoutFinal + it))
            .reduce((prev, curr, ind, arr) => prev || curr);
          if (isUncombingFormPresent) {
            // at least one uncombining form is present
            matched = literal;
            Object.assign(matchedLtrs, ltrs);
          }
        }
      } else if (smIK(ltrs[ltrs.length - 2], ltrs[ltrs.length - 1])) {
        // match for -ik
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
      } else if (!freeToneLettersTonal.includes(letters[i].literal)) {
        // free first tone without a free tonal
        const rules = freeAllomorphUncombiningRules.get(TonalLetterTags.zero);
        const tnls = !rules ? [] : rules;
        for (let t of tnls) {
          // append second tonal letter
          // check the uncombining forms
          if (isInSyllableTable(literal + t.toString())) {
            // if the free first tone's lemma is included
            matched = literal;
            Object.assign(matchedLtrs, ltrs);
            //break;
          }
        }
      }

      // when there is no matched lexcial roots for this syllable, we still assign begin
      begin = beginOfSyllable;
    }
  }

  // console.log(`literal: ${literal}. matched: ${matched}`);
  // console.log(matchedLtrs);

  if (matched.length > 0 && literal.length > matched.length) {
    // when ~ay is longer than ~a by one letter y
    // for those first tone lexcial roots that are present
    matched = '';
    matchedLtrs = [];
  }

  // console.log('matched: ' + matched);
  const tsg = new TonalPositionalLetterGenerator();
  //console.log('matched: ' + matched)
  let list: Array<PositionalLetter[]> = new Array();

  if (matched.length > 0) {
    list = tsg.generate(matchedLtrs);
  } else {
    if (ltrs.length == 3 && ltrs[1] === 'a' && ltrs[2] === 'y') {
      const rea = new RemovingEpenthesisOfAy();
      const done = rea.applyToString(literal);
      //console.log(done.toString())
      if (epentheticLetters.includes(ltrs[0]) && isInSyllableTable(done)) {
        list = tsg.generate(ltrs);
      }
    }
  }

  // console.log(list);

  let matchedLen = 0;
  let mp = new MatchedPattern();

  for (let m in list) {
    const min = Math.min(letters.length - beginOfSyllable, list[m].length);
    if (list[m].length == min) {
      for (let n = 0; n < min; n++) {
        if (list[m][n] != undefined) {
          if (letters[beginOfSyllable + n].literal === list[m][n].toString()) {
            //console.log(syllabary[m])
            if (n + 1 == min && min > matchedLen) {
              // to make sure it is longer than previous patterns
              // last letter matched for the pattern
              matchedLen = min;
              // copy the matched letters
              for (let q = 0; q < matchedLen; q++) {
                mp.letters[q] = letters[beginOfSyllable + q];
              }

              // copy the pattern of positional letters
              mp.pattern = list[m];
              //console.log(syllabary.list[m])
              //console.log(mp.letters)
            }
          } else {
            break;
          }
        }
      }
    }
  }

  return mp;
}

export class TonalSyllable extends Syllable {
  popLetter() {
    this.letters = this.letters.slice(0, this.letters.length - 1);
    this.concat();
  }

  get lastLetter() {
    if (this.letters.length >= 1) return this.letters[this.letters.length - 1];
    return new AlphabeticLetter([]);
  }

  get lastSecondLetter() {
    if (this.letters.length >= 2) return this.letters[this.letters.length - 2];
    return new AlphabeticLetter([]);
  }
}

/** A syllable and its uncombining forms. */
export class TonalUncombiningMorpheme extends Morpheme {
  syllable: TonalSyllable;
  allomorph: Allomorph;
  private metaplasm: TonalCombiningMetaplasm;
  private forms: TonalSyllable[];
  letters: Array<PositionalLetter>;

  constructor(
    syllable: TonalSyllable,
    letters: Array<PositionalLetter>,
    metaplasm: TonalCombiningMetaplasm
  ) {
    super();
    this.syllable = syllable;
    this.metaplasm = metaplasm;

    // assign allomorph for each syllable
    this.letters = letters;
    this.allomorph = this.assignAllomorph(this.letters);
    this.forms = this.metaplasm.apply(this.letters, this.allomorph);
  }

  getForms(): TonalSyllable[] {
    return this.forms;
  }

  addForms(syllables: TonalSyllable[]) {
    if (syllables && syllables.length == 1) {
      this.forms.push(syllables[0]);
    }
  }

  private assignAllomorph(letters: PositionalLetter[]): Allomorph {
    let allomorph: Allomorph = new ZeroAllomorph();
    // assign the matched allomorph for this syllable
    let las: Array<Allomorph> = []; // list of allomorphs

    const s: TonalSyllable = new TonalSyllable(
      letters.map(it => new AlphabeticLetter(it.characters))
    );
    const keys = Array.from(checkedAllomorphs.keys());
    for (let k = 0; k < keys.length; k++) {
      const am = checkedAllomorphs.get(keys[k]);
      if (am && am instanceof CheckedAllomorph) {
        if (am.tonal) {
          if (
            am.tonal.toString() === s.lastLetter.literal &&
            am.final.toString() === s.lastSecondLetter.literal
          ) {
            las.push(am);
            break;
          } else {
            if (am.final.toString() === s.lastLetter.literal) {
              las.push(am);
              break;
            }
          }
        }
      }
    }

    if (las.length > 0) {
      // there is only one match after processing, we just assign it
      const ret = las.shift();
      if (ret) return ret;
    }

    // after matching with checked allomorphs, we go on matching free allomorphs
    las = [];
    if (freeAllomorphs.has(s.lastLetter.literal)) {
      const am = freeAllomorphs.get(s.lastLetter.literal);
      const stpFnls = letters.filter(
        it => it.name === TonalSpellingTags.stopFinalConsonant
      );
      const chkttnls = letters.filter(
        it => it.name === TonalSpellingTags.checkedTone
      );

      if (
        am &&
        !(
          stpFnls.length == 1 &&
          stpFnls[0].toString().length == 2 &&
          chkttnls.length == 1
        )
      ) {
        // when 8th finals *not* followed by a tonal
        las.push(am);
      } else las.push(new Allomorph());
    }

    if (las.length == 0) {
      // tone 1 has no allomorph
      allomorph = new ZeroAllomorph();
    } else if (las.length == 1) {
      // are there multiple allomorphs? there should be only one.
      for (let i = 0; i < las.length; i++) {
        if (las[i].tonal.toString() === new AllomorphX().tonal.toString()) {
          // this syllable is already in base form
          // in order to display this inflectional ending, we have to assign
          allomorph = las[i];
        } else {
          allomorph = las[i];
        }
      }
    }
    return allomorph;
  }
}

export class TonalUncombiningMorphemeMaker extends MorphemeMaker {
  private sandhiFinals = new Array<AlphabeticLetter>();
  private sandhiFinalTonals = new Array<{
    index: number;
    letters: AlphabeticLetter[];
  }>();

  constructor() {
    super();
  }

  protected createMorphemes() {
    return new Array<TonalUncombiningMorpheme>();
  }

  protected createMorpheme(
    matched: MatchedPattern,
    metaplasm: TonalCombiningMetaplasm
  ) {
    const tum: TonalUncombiningMorpheme = new TonalUncombiningMorpheme(
      new TonalSyllable(matched.letters),
      matched.pattern,
      metaplasm
    );
    return tum;
  }

  private isCombiningAy(syllables: MatchedPattern[]) {
    const keysAy = Array.from(uncombiningRulesAy.keys());

    // bug?
    // console.log(regexMnngHF.test('vunghf')); // true
    // console.log(regexMnngHF.test('vunghfngay')); // false
    // console.log(regexMnngHF.test('cunhf')) // true
    // console.log(regexMnngHF.test('cunhfmiax')) // false

    if (syllables.length >= 2) {
      const nslFnlLast2nd = syllables[syllables.length - 2].pattern.filter(
        it => it.name === TonalSpellingTags.nasalFinalConsonant
      );
      const stpFnlH = syllables[syllables.length - 2].pattern.filter(
        it =>
          it.name === TonalSpellingTags.stopFinalConsonant &&
          it.toString() === TonalLetterTags.h
      );
      const tnl = syllables[syllables.length - 2].pattern.filter(
        it =>
          (it.name === TonalSpellingTags.nasalFinalConsonant ||
            it.name === TonalSpellingTags.checkedTone) &&
          keysAy.includes(it.toString())
      );
      const nslInitLast = syllables[syllables.length - 1].pattern.filter(
        it =>
          it.name === TonalSpellingTags.initialConsonant &&
          nasalInitialConsonants.includes(it.toString())
      );

      // ending ay
      const endingAy =
        syllables[syllables.length - 1].lastSecondLetter.literal ===
          TonalLetterTags.a &&
        syllables[syllables.length - 1].lastLetter.literal ===
          TonalLetterTags.y;
      // ending a is the proceeding form of ay
      const endingA =
        syllables[syllables.length - 1].lastLetter.literal ===
        TonalLetterTags.a;

      if (
        !(
          nslFnlLast2nd.length == 1 &&
          stpFnlH.length == 1 &&
          tnl.length == 1
        ) &&
        (endingAy || endingA)
      ) {
        // bypass sandhi t. e.g. vunghf~.
        if (nslInitLast.length == 1 && nslFnlLast2nd.length == 0) {
          // in case of words like vutfngay
          return false;
        }
        const initLast = syllables[syllables.length - 1].pattern.filter(
          it =>
            it.name === TonalSpellingTags.initialConsonant &&
            initialConsonantsTonal.includes(it.toString())
        );
        if (
          stpFnlH.length == 0 &&
          nslFnlLast2nd.length == 1 &&
          initLast.length == 1 &&
          nslFnlLast2nd[0].toString() != initLast[0].toString()
        ) {
          // in case of words like angzchoay, ngzchoay
          return false;
        }
        return true;
      }
    }

    return false;
  }

  private isTransfixInflection(syllables: MatchedPattern[]) {
    // TODO: there are not many of them. make a tiny dictionary to cover the ocurrences
    const thirds = syllables
      .map(it => it.pattern.filter(ltr => ltr.toString() === TonalLetterTags.w))
      .map(seq => seq.map(ltr => ltr.toString()))
      .filter(arr => arr.length > 0);
    const endingAw: boolean =
      syllables[syllables.length - 1].lastSecondLetter.literal ===
      TonalLetterTags.a;
    if (syllables.length > 1 && thirds.length == syllables.length && endingAw)
      return true;
    return false;
  }

  private isDoublet(syllables: MatchedPattern[]) {
    if (syllables.length == 2) {
      const stems = syllables
        .map(it =>
          it.pattern.filter(s => s.name !== TonalSpellingTags.freeTone)
        )
        .map(seq => seq.map(s => s.toString()).join(''));

      // TODO: add checks for tone group
      const tnls = syllables
        .map(it =>
          it.pattern.filter(s => s.name === TonalSpellingTags.freeTone)
        )
        .map(seq => seq.map(ltr => ltr.toString()).join(''));

      // compare 2 strings/lexical stems
      if (stems[0] === stems[1]) return true; // identical
    }
    return false;
  }

  private isTriplet(syllables: MatchedPattern[]) {
    if (syllables.length == 3) {
      const stems = syllables
        .map(it =>
          it.pattern.filter(
            ltr =>
              ltr.name !== TonalSpellingTags.freeTone &&
              ltr.name !== TonalSpellingTags.checkedTone
          )
        )
        .map(seq => seq.map(ltr => ltr.toString()).join(''));

      const fnls = syllables
        .map(it =>
          it.pattern.filter(
            s => s.name === TonalSpellingTags.stopFinalConsonant
          )
        )
        .map(seq => seq.map(s => s.toString()).join(''));

      // TODO: add checks for tone group
      const tnls = syllables
        .map(it =>
          it.pattern.filter(s => s.name === TonalSpellingTags.freeTone)
        )
        .map(seq => seq.map(s => s.toString()).join(''));

      // compare 3 strings/lexical stems
      if (fnls && fnls.length > 0) {
        // stems of checked tones
        if (stems[0] === stems[1] && stems[0] + fnls[0] === stems[2])
          return true;
      } else {
        // stems of free tones
        if (stems.every((v, i, a) => v === a[a.length - 1])) return true; // identical
      }
    }
    return false;
  }

  /** Check if ~ek or ~ekk available for the ~iet syllable. */
  private isEKekkAvailableRimeIet(syllables: MatchedPattern[]) {
    if (syllables.length >= 2) {
      const vs = syllables[syllables.length - 2].pattern.filter(
        i => i.name === TonalSpellingTags.vowel
      );
      const fcs = syllables[syllables.length - 2].pattern.filter(
        i => i.name === TonalSpellingTags.stopFinalConsonant
      );
      const ts = syllables[syllables.length - 2].pattern.filter(
        i => i.name === TonalSpellingTags.checkedTone
      );
      if (
        vs.length == 2 &&
        fcs.length == 1 &&
        ts.length == 1 &&
        vs[0].toString() === TonalLetterTags.i &&
        vs[1].toString() === TonalLetterTags.e &&
        fcs[0].toString() === TonalLetterTags.t &&
        (ts[0].toString() === TonalLetterTags.f ||
          ts[0].toString() === TonalLetterTags.w)
      ) {
        // TODO: check if the uncombining forms present in syllable table.
        return true;
      }
    }
    return false;
  }

  private preprocessSandhiFinal(letters: Array<AlphabeticLetter>) {
    this.sandhiFinals.push(letters[letters.length - 1]);
    return letters.slice(0, letters.length - 1);
  }

  private preprocessSandhiFinalTonal(
    letters: Array<AlphabeticLetter>,
    literal: string,
    regex: RegExp,
    len: number
  ) {
    const matchedStrs = literal.match(regex);
    // console.log(matchedStrs);

    let indx = -1;
    if (len == 1) {
      for (let i = 0; i < letters.length - 1; i++) {
        if (
          smJlsF(letters[i].literal, letters[i + 1].literal) ||
          smLsWx(letters[i].literal, letters[i + 1].literal)
        ) {
          indx = i;
          break;
        }
      }
    } else if (len == 2) {
      for (let i = 0; i < letters.length - 2; i++) {
        if (
          smMnngHF(
            letters[i].literal,
            letters[i + 1].literal,
            letters[i + 2].literal
          ) ||
          smMnngHWx(
            letters[i].literal,
            letters[i + 1].literal,
            letters[i + 2].literal
          )
        ) {
          indx = i;
          break;
        }
      }
    }

    if (matchedStrs) {
      for (let i in matchedStrs) {
        const idxl = literal.search(matchedStrs[i]);
        const head = literal.substring(0, idxl);
        const tail = literal.substring(idxl + matchedStrs[i].length);

        // in case of hmhw or hmhwhmhw
        // check if the previous letter is a consonant

        if (initialConsonantsTonal.includes(head)) return letters;

        let fnl;
        if (
          TonalLetterTags.f === matchedStrs[i].charAt(matchedStrs[i].length - 1)
        ) {
          literal = head.concat(TonalLetterTags.t + TonalLetterTags.f, tail);
          fnl = letters.splice(
            indx,
            len,
            lowerLettersTonal.get(TonalLetterTags.t)
          );
        } else if (
          toneLettersWx.includes(
            matchedStrs[i].charAt(matchedStrs[i].length - 1)
          )
        ) {
          if (
            matchedStrs[i].charAt(matchedStrs[i].length - 1) ===
            TonalLetterTags.w
          ) {
            // 3rd tone
            if (matchedStrs[0][0] === tail[0]) {
              literal = head.concat(
                TonalLetterTags.t + TonalLetterTags.w,
                tail
              );
            } else {
              literal = head.concat(
                TonalLetterTags.p + TonalLetterTags.w,
                tail
              );
            }
          } else if (
            matchedStrs[i].charAt(matchedStrs[i].length - 1) ===
            TonalLetterTags.x
          ) {
            // 5th tone
            if (matchedStrs[0][0] === tail[0]) {
              literal = head.concat(
                TonalLetterTags.t + TonalLetterTags.x,
                tail
              );
            } else {
              literal = head.concat(
                TonalLetterTags.p + TonalLetterTags.x,
                tail
              );
            }
          }
          // console.log(letters.map(x => x.literal).join(''), 'before splicing');
          // console.log(matchedStrs[0][0], tail[0]);
          if (
            matchedStrs[0][0] === tail[0] ||
            (matchedStrs[0][0] === TonalLetterTags.l &&
              tail[0] === TonalLetterTags.j)
          ) {
            // if the initial of the following syllable equals to the final of the preceding one
            // h -> tt
            fnl = letters.splice(
              indx,
              len,
              lowerLettersTonal.get(TonalLetterTags.t)
            );
          } else if (matchedStrs[0][0] === TonalLetterTags.h) {
            // h -> pp
            fnl = letters.splice(
              indx,
              len,
              lowerLettersTonal.get(TonalLetterTags.p)
            );
          }
          // console.log(letters.map(x => x.literal).join(''), 'after splicing');
        }

        // console.log(literal, head, tail);

        if (fnl && len == 1)
          this.sandhiFinalTonals.push({ index: indx, letters: [fnl[0]] });
        else if (fnl && len == 2)
          this.sandhiFinalTonals.push({
            index: indx,
            letters: [fnl[0], fnl[1]],
          });
      }
    }

    return letters;
  }

  private replaceSandhiFinal(letters: Array<AlphabeticLetter>) {
    const slicedLetters = letters.slice(0, letters.length - 1);
    const slicedLiteral = slicedLetters.map(it => it.literal).join('');
    if (
      letters.length > 0 &&
      letters[letters.length - 1].literal === TonalLetterTags.gg &&
      isInSyllableTable(slicedLiteral + TonalLetterTags.tt) &&
      !isInSyllableTable(slicedLiteral + TonalLetterTags.kk)
    ) {
      // for surface form gg whose underlying form is tt but not kk
      const ls = this.preprocessSandhiFinal(letters);
      // append tt to sliced letters
      ls.push(lowerLettersTonal.get(TonalLetterTags.tt));
      return ls;
    } else if (
      letters.length > 0 &&
      letters[letters.length - 1].literal === TonalLetterTags.b &&
      isInSyllableTable(slicedLiteral + TonalLetterTags.p)
    ) {
      // for surface form b whose underlying form is p
      const ls = this.preprocessSandhiFinal(letters);
      // append tt to sliced letters
      ls.push(lowerLettersTonal.get(TonalLetterTags.p));
      return ls;
    }

    return letters;
  }

  private replaceSandhiFinalTonal(letters: Array<AlphabeticLetter>) {
    let literal = letters.map(x => x.literal).join('');

    if (literal.length > 1 && regexJlsF.test(literal)) {
      const ls = this.preprocessSandhiFinalTonal(
        letters,
        literal,
        regexJlsF,
        1
      );
      return ls;
    } else if (literal.length > 1 && regexLsWx.test(literal)) {
      const ls = this.preprocessSandhiFinalTonal(
        letters,
        literal,
        regexLsWx,
        1
      );
      return ls;
    } else if (literal.length > 2 && regexMnngHF.test(literal)) {
      const ls = this.preprocessSandhiFinalTonal(
        letters,
        literal,
        regexMnngHF,
        2
      );
      return ls;
    } else if (literal.length > 2 && regexMnngHWx.test(literal)) {
      const ls = this.preprocessSandhiFinalTonal(
        letters,
        literal,
        regexMnngHWx,
        2
      );
      return ls;
    }

    return letters;
  }

  protected preprocess(
    graphemes: Array<AlphabeticGrapheme>
  ): AlphabeticLetter[] {
    let ltrs = new Array<AlphabeticLetter>();

    ltrs = graphemes.map(it => it.letter);

    // handle sandhi finals without a tonal
    ltrs = this.replaceSandhiFinal(ltrs);

    // handle sandhi finals with a tonal
    ltrs = this.replaceSandhiFinalTonal(ltrs);

    return ltrs;
  }

  private postprocessSandhiPPpttt(
    pattern: MatchedPattern,
    lenPrecedingLetters: number
  ) {
    if (
      (pattern.letters[pattern.letters.length - 1].literal ===
        TonalLetterTags.t ||
        pattern.letters[pattern.letters.length - 1].literal ===
          TonalLetterTags.tt ||
        pattern.letters[pattern.letters.length - 1].literal ===
          TonalLetterTags.p) &&
      this.sandhiFinals.length > 0
    ) {
      // if there isn't a tonal
      pattern.letters.pop();
      pattern.pattern.pop();
      const fnl = this.sandhiFinals.pop();
      if (fnl) {
        pattern.letters.push(fnl);
        const positions = tonalPositionalLetters.get(fnl.literal);
        if (positions)
          pattern.pattern.push(positions(TonalSpellingTags.stopFinalConsonant));
      }
    } else if (
      this.sandhiFinalTonals.length > 0 &&
      sandhiFinalsPPpttt.includes(
        pattern.letters[pattern.letters.length - 2].literal
      )
    ) {
      // if there is a tonal
      const fnl = this.sandhiFinalTonals.pop();
      if (fnl) {
        if (fnl.letters.length == 1) {
          pattern.letters.splice(fnl.index, 1, fnl.letters[0]);
          const positions = tonalPositionalLetters.get(fnl.letters[0].literal);
          if (positions)
            pattern.pattern.splice(
              fnl.index,
              1,
              positions(TonalSpellingTags.stopFinalConsonant)
            );
        } else if (fnl.letters.length == 2) {
          // replace 1 letter at fnl.index with 2 letters
          pattern.letters.splice(
            fnl.index - lenPrecedingLetters,
            1,
            fnl.letters[0],
            fnl.letters[1]
          );
          const positions = tonalPositionalLetters.get(fnl.letters[0].literal);
          const ltr2 = tonalPositionalLetters.get(fnl.letters[1].literal);
          if (positions && ltr2) {
            pattern.pattern.splice(
              fnl.index - lenPrecedingLetters,
              1,
              positions(TonalSpellingTags.nasalFinalConsonant),
              ltr2(TonalSpellingTags.stopFinalConsonant)
            );
          }
        }
      }
    }
    return pattern;
  }

  protected postprocess(
    matched: MatchedPattern[]
  ): Array<TonalUncombiningMorpheme> {
    const morphemes = this.createMorphemes();

    for (let i = 0; i < matched.length; i++) {
      // accumulate the lenght of letters preceding the current syllable
      const lenPrecedingLetters: number = matched
        .map((val, j) => (j < i ? val.letters.length : 0))
        .reduce((prev, val) => prev + val);

      const ptn = this.postprocessSandhiPPpttt(matched[i], lenPrecedingLetters);

      if (this.isCombiningAy(matched) && matched.length == 2) {
        // ~fa, ~xa, fay, or ~xay. only 2 syllables
        morphemes.push(
          this.createMorpheme(ptn, new PrecedingAyexUncombining())
        );
      } else if (
        this.isCombiningAy(matched) &&
        (matched.length == 3 || matched.length == 4)
      ) {
        // ~fa, ~xa, fay, or ~xay. more than 2 syllables
        if (i == matched.length - 2 || i == matched.length - 1)
          // the last 2 syllables
          morphemes.push(
            this.createMorpheme(ptn, new PrecedingAyexUncombining())
          );
        else if (i == matched.length - 3)
          // the first syllable of a 3-syllable word or the 2nd syllable of a 4-syllable word
          morphemes.push(
            this.createMorpheme(
              ptn,
              new TonalUncombiningForms(matched[i + 1].pattern)
            )
          );
        else if (matched.length == 4 && i == matched.length - 4)
          // the first syllable of a 4-syllable word
          morphemes.push(
            this.createMorpheme(
              ptn,
              new TonalUncombiningForms(matched[i + 1].pattern)
            )
          );
      } else if (this.isTriplet(matched)) {
        // triplet construction. pass the last syllable as an argument
        morphemes.push(
          this.createMorpheme(ptn, new LastSyllableForms(matched[2].pattern))
        );
      } else if (this.isDoublet(matched)) {
        // doublet construction. pass the last syllable as an argument
        morphemes.push(
          this.createMorpheme(ptn, new LastSyllableForms(matched[1].pattern))
        );
      } else if (this.isTransfixInflection(matched)) {
        morphemes.push(this.createMorpheme(ptn, new TransfixUncombining()));
      } else {
        if (i < matched.length - 1) {
          // pass the letters of the following syllable to unchange letters accordingly
          morphemes.push(
            this.createMorpheme(
              ptn,
              new TonalUncombiningForms(matched[i + 1].pattern)
            )
          );
        } else {
          // no sandhi letters to unchange, just pass an empty array
          morphemes.push(
            this.createMorpheme(ptn, new TonalUncombiningForms([]))
          );
        }
        if (this.isEKekkAvailableRimeIet(matched) && i < matched.length - 1) {
          const forms = this.createMorpheme(
            ptn,
            new UncombiningFormsIetfIetwToEkEkk()
          ).getForms();
          if (forms && forms.length == 1) {
            morphemes[i].addForms(forms);
          }
        }
      }
    }

    return morphemes;
  }

  makeMorphemes(graphemes: Array<AlphabeticGrapheme>) {
    const ltrs = this.preprocess(graphemes);
    const ptns = this.make(ltrs, syllabifyTonal);
    const ms = this.postprocess(ptns);
    // TODO: to further check if the syllable is valid, given the following syllable

    return ms;
  }
}
