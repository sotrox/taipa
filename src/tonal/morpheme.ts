import { Syllable, MorphemeMaker, MatchedPattern, Morpheme } from '../unit';
import {
  freeAllomorphUncombiningRules,
  checkedAllomorphs,
  freeAllomorphs,
  ZeroAllomorph,
  AllomorphX,
  TonalLetterTags,
  lowerLettersTonal,
  tonalPositionalSounds,
  TonalSoundTags,
  uncombiningRulesAy,
  CheckedAllomorph,
  Allomorph,
  freeTonalSounds,
  initialSounds,
  stopFinalSounds,
} from './version2';
import { AlphabeticLetter, AlphabeticGrapheme, Sound } from '../unit';
import { TonalSoundGenerator } from './soundgen';
import { isInLexcialRoots } from './lexicalroots2';
import {
  smMnngHF,
  smMnngHHWx,
  smBgkpF,
  smBbggkkppWx,
  regexJlsF,
  regexMnngHF,
  regexJjllssWx,
  regexMnngHhWx,
  smMHhW,
  smJlsF,
  smJJllssWx,
} from './matcher';
import { epentheticSounds, tonalsWx } from './collections';
import {
  TonalReduplication,
  UncombiningPrecedingAyex,
  TonalUncombiningForms,
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

  for (let i = beginOfSyllable; i < letters.length; i++) {
    literal = literal + letters[i].literal;
    ltrs.push(letters[i].literal);
    // console.log(`begining of the loop: ${literal}. ${ltrs}`);
    if (
      isInLexcialRoots(literal) &&
      freeTonalSounds.includes(letters[i].literal)
    ) {
      // console.log(`i: ${i}, literal: ${literal}, tone: ${letters[i].literal}, letters[i+1]: ${letters[i + 1].literal}`)
      if (begin === beginOfSyllable) {
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
      }
      break;
    } else if (
      isInLexcialRoots(literal) &&
      stopFinalSounds.includes(letters[i].literal)
    ) {
      //console.log(`i: ${i}, literal: ${literal}, stopFinal: ${letters[i].literal}`)
      //console.log(`begin: ${begin}, beginOfSyllable: ${beginOfSyllable}`)
      if (begin === beginOfSyllable) {
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
      }
      break;
    } else if (freeTonalSounds.includes(letters[i].literal)) {
      // check tonals is the subset of free tonals

      // console.log('i: %d', i);
      // console.log(
      //   `i: ${i}, literal: ${literal}, letters[i].literal, ${letters[i].literal}`
      // );

      // when there are tonals

      if (
        literal.length > 1 &&
        letters[i] &&
        letters[i - 1] &&
        (smBgkpF(letters[i - 1].literal, letters[i].literal) ||
          smBbggkkppWx(letters[i - 1].literal, letters[i].literal) ||
          smJlsF(letters[i - 1].literal, letters[i].literal) ||
          smJJllssWx(letters[i - 1].literal, letters[i].literal))
      ) {
        // b, g, bb, gg, l, j, s, ll, jj, ss need to be handled in TonalCombiningMorpheme.assignAllomorph
        // this combining form is not present in the pool.
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
        break;
      } else if (
        literal.length > 2 &&
        letters[i] &&
        letters[i - 1] &&
        letters[i - 2] &&
        smMHhW(
          letters[i - 2].literal,
          letters[i - 1].literal,
          letters[i].literal
        )
      ) {
        // for lexical roots end with ~mhhw.
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
        break;
      }

      // tone sandhi of free allomorph
      const rulesFa = freeAllomorphUncombiningRules.get(letters[i].literal);
      const tnlsFa = !rulesFa ? [] : rulesFa.map(x => x.toString());
      // tone sandhi of ay
      const rulesAy = uncombiningRulesAy.get(letters[i].literal);
      const tnlsAy = !rulesAy ? [] : rulesAy.map(x => x.toString());
      // merge the above twoo arrays
      const tnls = tnlsFa.concat(
        tnlsAy.filter(item => tnlsFa.indexOf(item) < 0)
      );
      //console.log(ts)
      if (tnls.length > 0) {
        for (let t of tnls) {
          //console.log(lit + t.toString())
          if (
            isInLexcialRoots(
              letters
                .slice(beginOfSyllable, i)
                .map(x => x.literal)
                .join('') + t
            )
          ) {
            // this combining form is not present in the pool,
            // but its uncombining forms are. e.g. aw.
            matched = literal;
            //begin = beginOfSyllable;
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
    } else if (isInLexcialRoots(literal)) {
      matched = literal;
      Object.assign(matchedLtrs, ltrs);
      begin = beginOfSyllable;
      // console.log(matched);
    } else {
      //console.log('no matched for syllabifyTonal:' + ltrs)

      // when there are no tonals

      if (letters[i].literal === TonalLetterTags.gg) {
        // for surface form gg whose underlying form could be tt or kk.
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
      } else if (!freeTonalSounds.includes(letters[i].literal)) {
        // free first tone without a free tonal
        const rules = freeAllomorphUncombiningRules.get(TonalLetterTags.zero);
        const tnls = !rules ? [] : rules;
        for (let t of tnls) {
          // append second tonal letter
          // check the uncombining forms
          if (isInLexcialRoots(literal + t.toString())) {
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
  const tsg = new TonalSoundGenerator();
  //console.log('matched: ' + matched)
  let list: Array<Sound[]> = new Array();

  if (matched.length > 0) {
    list = tsg.generate(matchedLtrs);
  } else {
    if (ltrs.length == 3 && ltrs[1] === 'a' && ltrs[2] === 'y') {
      const rea = new RemovingEpenthesisOfAy();
      const done = rea.applyToString(literal);
      //console.log(done.toString())
      if (epentheticSounds.includes(ltrs[0]) && isInLexcialRoots(done)) {
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

              // copy the pattern of sounds
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
  sounds: Array<Sound>;

  constructor(
    syllable: TonalSyllable,
    sounds: Array<Sound>,
    metaplasm: TonalCombiningMetaplasm
  ) {
    super();
    this.syllable = syllable;
    this.metaplasm = metaplasm;

    // assign allomorph for each syllable
    this.allomorph = this.assignAllomorph(this.syllable);
    this.sounds = sounds;
    this.forms = this.metaplasm.apply(this.sounds, this.allomorph);
  }

  getForms(): TonalSyllable[] {
    return this.forms;
  }

  private assignAllomorph(syllable: TonalSyllable): Allomorph {
    let allomorph: Allomorph = new ZeroAllomorph();
    // assign the matched allomorph for this syllable
    let aoas: Array<Allomorph> = []; // array of allomorphs

    let keys = Array.from(checkedAllomorphs.keys());
    for (let k = 0; k < keys.length; k++) {
      let am = checkedAllomorphs.get(keys[k]);
      if (am && am instanceof CheckedAllomorph) {
        if (am.tonal) {
          if (
            am.tonal.toString() === syllable.lastLetter.literal &&
            am.final.toString() === syllable.lastSecondLetter.literal
          ) {
            aoas.push(am);
            break;
          } else {
            if (am.final.toString() === syllable.lastLetter.literal) {
              aoas.push(am);
              break;
            }
          }
        }
      }
    }

    if (aoas.length > 0) {
      // there is only one match after processing, we just assign it
      let ret = aoas.shift();
      if (ret) return ret;
    }

    // after matching with checked allomorphs, we go on matching free allomorphs
    aoas = [];
    if (freeAllomorphs.has(syllable.lastLetter.literal)) {
      const am = freeAllomorphs.get(syllable.lastLetter.literal);
      if (am) aoas.push(am);
      else aoas.push(new Allomorph());
    }

    if (aoas.length == 0) {
      // tone 1 has no allomorph
      allomorph = new ZeroAllomorph();
    } else if (aoas.length == 1) {
      // are there multiple allomorphs? there should be only one.
      for (let i = 0; i < aoas.length; i++) {
        if (aoas[i].tonal.toString() === new AllomorphX().tonal.toString()) {
          // this syllable is already in base form
          // in order to display this inflectional ending, we have to assign
          allomorph = aoas[i];
        } else {
          allomorph = aoas[i];
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

  private isCombiningAyex(patterns: MatchedPattern[]) {
    const keysAy = Array.from(uncombiningRulesAy.keys());

    if (
      patterns.length == 2 &&
      keysAy.filter(
        it => it === patterns[patterns.length - 2].lastLetter.literal
      ).length > 0 &&
      ((patterns[patterns.length - 1].lastSecondLetter.literal ===
        TonalLetterTags.a &&
        patterns[patterns.length - 1].lastLetter.literal ===
          TonalLetterTags.y) ||
        patterns[patterns.length - 1].lastLetter.literal === TonalLetterTags.a)
    ) {
      return true;
    }
    return false;
  }

  private isDoublet(matches: MatchedPattern[]) {
    if (matches.length == 2) {
      const stms = matches
        .map(it => it.pattern.filter(s => s.name !== TonalSoundTags.freeTonal))
        .map(seq => seq.map(s => s.toString()).join(''));

      // TODO: add checks for tone group
      const tnls = matches
        .map(it => it.pattern.filter(s => s.name === TonalSoundTags.freeTonal))
        .map(seq => seq.map(s => s.toString()).join(''));

      // compare 2 strings/lexical stems
      if (stms[0] === stms[1]) return true; // identical
    }
    return false;
  }

  private isTriplet(matches: MatchedPattern[]) {
    if (matches.length == 3) {
      const stms = matches
        .map(it => it.pattern.filter(s => s.name !== TonalSoundTags.freeTonal))
        .map(seq => seq.map(s => s.toString()).join(''));

      // TODO: add checks for tone group
      const tnls = matches
        .map(it => it.pattern.filter(s => s.name === TonalSoundTags.freeTonal))
        .map(seq => seq.map(s => s.toString()).join(''));

      // compare 3 strings/lexical stems
      if (stms.every((v, i, a) => v === a[0])) return true; // identical
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
    const arr = literal.match(regex);
    // console.log(arr);

    let indx = -1;
    if (len == 1) {
      for (let i = 0; i < letters.length - 1; i++) {
        if (
          smJlsF(letters[i].literal, letters[i + 1].literal) ||
          smJJllssWx(letters[i].literal, letters[i + 1].literal)
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
          smMnngHHWx(
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

    if (arr) {
      for (let i in arr) {
        const idxl = literal.search(arr[i]);
        const sub1 = literal.substring(0, idxl);
        const sub2 = literal.substring(idxl + arr[i].length);

        // in case of hmhhw or hmhhwhmhhw
        // check if the previous letter is a consonant

        if (initialSounds.includes(sub1)) return letters;

        let fnl;
        if (TonalLetterTags.f === arr[i].charAt(arr[i].length - 1)) {
          literal = sub1.concat(TonalLetterTags.t + TonalLetterTags.f, sub2);
          fnl = letters.splice(
            indx,
            len,
            lowerLettersTonal.get(TonalLetterTags.t)
          );
        } else if (tonalsWx.includes(arr[i].charAt(arr[i].length - 1))) {
          if (arr[i].charAt(arr[i].length - 1) === TonalLetterTags.w) {
            if (sub2[0] === arr[0][0]) {
              literal = sub1.concat(
                TonalLetterTags.tt + TonalLetterTags.w,
                sub2
              );
            } else {
              literal = sub1.concat(
                TonalLetterTags.pp + TonalLetterTags.w,
                sub2
              );
            }
          } else if (arr[i].charAt(arr[i].length - 1) === TonalLetterTags.x) {
            if (sub2[0] === arr[0][0]) {
              literal = sub1.concat(
                TonalLetterTags.tt + TonalLetterTags.x,
                sub2
              );
            } else {
              literal = sub1.concat(
                TonalLetterTags.pp + TonalLetterTags.x,
                sub2
              );
            }
          }
          // console.log(letters.map(x => x.literal).join(''), 'before splicing');
          if (sub2[0] === arr[0][0]) {
            // if the initial of the following syllable equals to the final of the preceding one
            // hh -> tt
            fnl = letters.splice(
              indx,
              len,
              lowerLettersTonal.get(TonalLetterTags.tt)
            );
          } else {
            // hh -> pp
            fnl = letters.splice(
              indx,
              len,
              lowerLettersTonal.get(TonalLetterTags.pp)
            );
          }
          // console.log(letters.map(x => x.literal).join(''), 'after splicing');
        }

        // console.log(literal, sub1, sub2);

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
      isInLexcialRoots(slicedLiteral + TonalLetterTags.tt) &&
      !isInLexcialRoots(slicedLiteral + TonalLetterTags.kk)
    ) {
      // for surface form gg whose underlying form is tt but not kk
      const ls = this.preprocessSandhiFinal(letters);
      // append tt to sliced letters
      ls.push(lowerLettersTonal.get(TonalLetterTags.tt));
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
    } else if (literal.length > 1 && regexJjllssWx.test(literal)) {
      const ls = this.preprocessSandhiFinalTonal(
        letters,
        literal,
        regexJjllssWx,
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
    } else if (literal.length > 2 && regexMnngHhWx.test(literal)) {
      const ls = this.preprocessSandhiFinalTonal(
        letters,
        literal,
        regexMnngHhWx,
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

  private postprocessSandhiTTt(
    pattern: MatchedPattern,
    lenPrecedingLetters: number
  ) {
    if (
      (pattern.letters[pattern.letters.length - 1].literal ===
        TonalLetterTags.t ||
        pattern.letters[pattern.letters.length - 1].literal ===
          TonalLetterTags.tt) &&
      this.sandhiFinals.length > 0
    ) {
      // if there isn't a tonal
      pattern.letters.pop();
      pattern.pattern.pop();
      const fnl = this.sandhiFinals.pop();
      if (fnl) {
        pattern.letters.push(fnl);
        const snd = tonalPositionalSounds.get(fnl.literal);
        if (snd) pattern.pattern.push(snd(TonalSoundTags.stopFinal));
      }
    } else if (
      this.sandhiFinalTonals.length > 0 &&
      (pattern.letters[pattern.letters.length - 2].literal ===
        TonalLetterTags.t ||
        pattern.letters[pattern.letters.length - 2].literal ===
          TonalLetterTags.tt ||
        pattern.letters[pattern.letters.length - 2].literal ===
          TonalLetterTags.p ||
        pattern.letters[pattern.letters.length - 2].literal ===
          TonalLetterTags.pp)
    ) {
      // if there is a tonal
      const fnl = this.sandhiFinalTonals.pop();
      if (fnl) {
        if (fnl.letters.length == 1) {
          pattern.letters.splice(fnl.index, 1, fnl.letters[0]);
          const snd = tonalPositionalSounds.get(fnl.letters[0].literal);
          if (snd)
            pattern.pattern.splice(fnl.index, 1, snd(TonalSoundTags.stopFinal));
        } else if (fnl.letters.length == 2) {
          // replace 1 letter at fnl.index with 2 letters
          pattern.letters.splice(
            fnl.index - lenPrecedingLetters,
            1,
            fnl.letters[0],
            fnl.letters[1]
          );
          const snd1 = tonalPositionalSounds.get(fnl.letters[0].literal);
          const snd2 = tonalPositionalSounds.get(fnl.letters[1].literal);
          if (snd1 && snd2)
            pattern.pattern.splice(
              fnl.index - lenPrecedingLetters,
              1,
              snd1(TonalSoundTags.nasalFinal),
              snd2(TonalSoundTags.stopFinal)
            );
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
      // accumulate the lenght of letters preceding the sandhi finals
      const lenPrecedingLetters: number = matched
        .map((v, j) => (j < i ? v.letters.length : 0))
        .reduce((prev, v) => prev + v);
      const ptn = this.postprocessSandhiTTt(matched[i], lenPrecedingLetters);

      if (this.isCombiningAyex(matched)) {
        // ~fa, ~xa, fay, or ~xay. ex.
        morphemes.push(
          this.createMorpheme(ptn, new UncombiningPrecedingAyex())
        );
      } else if (this.isTriplet(matched)) {
        // triplet construction
        morphemes.push(
          this.createMorpheme(ptn, new TonalReduplication(matched[2].pattern))
        );
      } else if (this.isDoublet(matched)) {
        // doublet construction
        morphemes.push(
          this.createMorpheme(ptn, new TonalReduplication(matched[1].pattern))
        );
      } else {
        morphemes.push(this.createMorpheme(ptn, new TonalUncombiningForms()));
      }
    }

    return morphemes;
  }

  makeMorphemes(graphemes: Array<AlphabeticGrapheme>) {
    const ltrs = this.preprocess(graphemes);
    const ptns = this.make(ltrs, syllabifyTonal);
    const ms = this.postprocess(ptns);
    // TODO: to further check if the lexical roots valid, given the following syllable

    return ms;
  }
}
