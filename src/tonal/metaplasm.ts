import { TonalCombiningMetaplasm } from '../metaplasm';
import {
  TonalWord,
  InflectionalEnding,
  FreeInflectionalEnding,
  CheckedInflectionalEnding,
} from './lexeme';
import { TonalSyllable, TonalUncombiningMorpheme } from './morpheme';
import {
  Allomorph,
  FreeAllomorph,
  ZeroAllomorph,
  freeAllomorphUncombiningRules,
  CheckedAllomorph,
  TonalLetterTags,
  uncombiningRulesAy,
  ZeroTonal,
  FreeTonalZ,
  FreeTonalX,
  lowerLettersTonal,
  neutralFinalConsonantsTonal,
  TonalSpellingTags,
  freeToneLettersTonal,
  Tonal,
} from './version2';
import { PositionalLetter, AlphabeticLetter } from '../unit';
import { TonalLemmatizationMetaplasm } from '../metaplasm';
import {
  finalConsonantsForBgjlsbbggllss,
  voicedVoicelessFinalConsonants,
  nasalFinalConsonants,
  fourthToEighthFinalConsonants,
  finalConsonantsForTransfix,
} from './collections';
import { isInSyllableTable } from './syllabletable';
import { smIENGFywxz } from './matcher';

/** Returns the uncombining forms of a syllable. */
export class TonalUncombiningForms extends TonalCombiningMetaplasm {
  constructor(private lettersFollowing: PositionalLetter[]) {
    super();
  }

  apply(
    letters: Array<PositionalLetter>,
    allomorph: Allomorph
  ): TonalSyllable[] {
    if (allomorph) {
      if (allomorph instanceof FreeAllomorph) {
        if (allomorph instanceof ZeroAllomorph) {
          // push y to make tone 2
          // 1 to 2
          const s: TonalSyllable = new TonalSyllable(
            letters.map(x => new AlphabeticLetter(x.characters))
          );
          const tnltrs = freeAllomorphUncombiningRules.get('zero');
          if (tnltrs) s.pushLetter(new AlphabeticLetter(tnltrs[0].characters));
          return [s];
        } else if (
          letters.length > 3 &&
          smIENGFywxz(
            letters[letters.length - 4].toString(),
            letters[letters.length - 3].toString(),
            letters[letters.length - 2].toString(),
            letters[letters.length - 1].toString()
          )
        ) {
          // in case of -ieng plus a tone letter. e.g. liengzngauz
          // let ret: TonalSyllable[] = [];
          // const rules = freeAllomorphUncombiningRules.get(allomorph.toString());
          // const tnltrs = !rules ? [] : rules;
          // for (let i in tnltrs) {
          //   let s: TonalSyllable = new TonalSyllable(
          //     letters.map(x => new AlphabeticLetter(x.characters))
          //   );
          //   s.replaceLetter(
          //     letters.length - 2,
          //     lowerLettersTonal.get(TonalLetterTags.n)
          //   ); // replace letter ng with n
          //   if (!(tnltrs[i] instanceof ZeroAllomorph)) {
          //     // 2 to 3. 3 to 7. 7 to 5. 3 to 5.
          //     // replace z with f or x
          //     s.popLetter();
          //     s.pushLetter(new AlphabeticLetter(tnltrs[i].characters));
          //     ret.push(s);
          //   } else {
          //     // 7 to 1
          //     // pop z
          //     s.popLetter();
          //     ret.push(s);
          //   }
          // }
          // return ret;
        } else {
          // the 7th tone has two baseforms
          const ret: TonalSyllable[] = [];
          const rules = freeAllomorphUncombiningRules.get(allomorph.toString());
          const tnltrs = !rules ? [] : rules;
          for (let i in tnltrs) {
            let s: TonalSyllable = new TonalSyllable(
              letters.map(x => new AlphabeticLetter(x.characters))
            );
            if (!(tnltrs[i] instanceof ZeroAllomorph)) {
              // 2 to 3. 3 to 7. 7 to 5. 3 to 5.
              // replace z with f or x
              s.popLetter();
              s.pushLetter(new AlphabeticLetter(tnltrs[i].characters));
              ret.push(s);
            } else {
              // 7 to 1
              // pop z
              s.popLetter();
              ret.push(s);
            }
          }
          return ret;
        }
      } else if (allomorph instanceof CheckedAllomorph) {
        // pop the tone letter
        // 1 to 4. 3 to 8. 2 to 4. 5 to 8.
        if (allomorph.tonal.toString() === '') return [];
        const s: TonalSyllable = new TonalSyllable(
          letters.map(it => new AlphabeticLetter(it.characters))
        );
        const fnl = s.letters[s.letters.length - 1].literal;
        const nslFnls = letters.filter(
          it => it.name === TonalSpellingTags.nasalFinalConsonant
        );
        s.popLetter(); // pop out the tone letter

        if (
          nslFnls.length == 0 &&
          (fnl === TonalLetterTags.w || fnl === TonalLetterTags.x) &&
          Array.from(fourthToEighthFinalConsonants.keys()).includes(
            s.lastLetter.literal
          )
        ) {
          // in case of no internal sandhi
          const fnl = s.lastLetter.literal;
          s.popLetter(); // pop the 4th final consonant
          const got = fourthToEighthFinalConsonants.get(fnl);
          if (got) {
            if (
              isInSyllableTable(s.literal + lowerLettersTonal.get(got).literal)
            ) {
              // push the 8th final consonant if it is present in syllable table
              s.pushLetter(lowerLettersTonal.get(got));
            } else {
              if (
                s.letters.length === 2 &&
                s.letters[0].literal === TonalLetterTags.t &&
                s.letters[1].literal === TonalLetterTags.i &&
                fnl === TonalLetterTags.k
              ) {
                // handle combining form 'tikw' of lexical root 'tekk'
                // combining forms 'tietw' and 'tietf is handled in another function
                s.popLetter(); // pop out vowel i
                s.pushLetter(lowerLettersTonal.get(TonalLetterTags.e)); // push vowel e
                s.pushLetter(lowerLettersTonal.get(TonalLetterTags.kk)); // push final consonant kk
              } else {
                // restore the popped-out final consonant.
                // a syllable is just returned with its tone letter popped out
                s.pushLetter(lowerLettersTonal.get(fnl));
              }
            }
          }
        } else if (finalConsonantsForBgjlsbbggllss.has(s.lastLetter.literal)) {
          // in case of internal or external sandhi
          const fnlsOfLemma = finalConsonantsForBgjlsbbggllss.get(
            s.lastLetter.literal + fnl
          );
          // console.log(s, allomorph, fnl, fnlsOfLemma);
          if (fnlsOfLemma) {
            const clones = fnlsOfLemma.map(it => {
              const clone: TonalSyllable = Object.create(s);
              clone.replaceLetter(
                s.letters.length - 1,
                lowerLettersTonal.get(it.toString())
              );
              return clone;
            });
            const ret: TonalSyllable[] = [];
            clones.map(it => ret.push(it));
            return clones;
          }
        } else if (
          letters.filter(it => it.name === TonalSpellingTags.vowel).length >
            0 &&
          nasalFinalConsonants.includes(s.lastSecondLetter.literal) &&
          neutralFinalConsonantsTonal.includes(s.lastLetter.literal)
        ) {
          // in case of internal sandhi of p or t
          // if there is no medials, e.g. hmhh, hngh, just bypass this block
          // mhh, mh, nhh, nh, nghh, ngh
          if (
            this.lettersFollowing[0] &&
            this.lettersFollowing[0].name ===
              TonalSpellingTags.initialConsonant &&
            s.lastSecondLetter.literal === this.lettersFollowing[0].toString()
          ) {
            // unchange to -tt or -t
            s.popLetter(); // pop the neutral
            s.popLetter(); // pop the nasal
            const clone: TonalSyllable = Object.create(s);
            // if (ntrl === TonalLetterTags.hh) {
            if (fnl === TonalLetterTags.w) {
              clone.pushLetter(lowerLettersTonal.get(TonalLetterTags.tt));
            } else {
              clone.pushLetter(lowerLettersTonal.get(TonalLetterTags.t));
            }
            return [clone];
          } else if (this.lettersFollowing[0]) {
            // there has to be a following syllable for this syllable to change form
            // unchange to -pp or -p
            s.popLetter(); // pop the neutral
            s.popLetter(); // pop the nasal
            const clone: TonalSyllable = Object.create(s);
            // if (ntrl === TonalLetterTags.hh) {
            if (fnl === TonalLetterTags.w) {
              clone.pushLetter(lowerLettersTonal.get(TonalLetterTags.pp));
            } else {
              clone.pushLetter(lowerLettersTonal.get(TonalLetterTags.p));
            }
            return [clone];
          }
        }
        // a syllable is just returned with the tone letter popped out
        // e.g. tnghw where w is popped and tngh is returned
        return [s];
      }
    }
    return [];
  }
}

/** Returns the uncombining forms of the syllable preceding ay */
export class PrecedingAyexUncombining extends TonalCombiningMetaplasm {
  private getUncombiningForms(
    syllable: TonalSyllable,
    letters: Array<PositionalLetter>
  ) {
    if (
      voicedVoicelessFinalConsonants.has(letters[letters.length - 2].toString())
    ) {
      // in case of sandhi finals
      const fnl = voicedVoicelessFinalConsonants.get(
        syllable.lastLetter.literal + letters[letters.length - 1].toString()
      );
      if (fnl)
        syllable.replaceLetter(
          syllable.letters.length - 1,
          lowerLettersTonal.get(fnl)
        );
    } else if (
      fourthToEighthFinalConsonants.has(
        letters[letters.length - 2].toString()
      ) &&
      letters[letters.length - 1].toString() === TonalLetterTags.x
    ) {
      const fnl = fourthToEighthFinalConsonants.get(
        syllable.lastLetter.literal
      );
      if (fnl)
        syllable.replaceLetter(
          syllable.letters.length - 1,
          lowerLettersTonal.get(fnl)
        );
    }
  }

  apply(
    letters: Array<PositionalLetter>,
    allomorph: Allomorph
  ): TonalSyllable[] {
    if (allomorph) {
      if (allomorph.tonal.toString() === TonalLetterTags.f) {
        if (allomorph instanceof FreeAllomorph) {
          const ret = [];
          const rls = uncombiningRulesAy.get(allomorph.toString());
          const tnls = !rls ? [] : rls;
          for (let i in tnls) {
            let s: TonalSyllable = new TonalSyllable(
              letters.map(it => new AlphabeticLetter(it.characters))
            );
            // 1 to 2. 1 to 3
            // replace f with y or w
            s.popLetter();
            s.pushLetter(new AlphabeticLetter(tnls[i].characters));
            ret.push(s);
          }
          return ret;
        } else if (allomorph instanceof CheckedAllomorph) {
          const s: TonalSyllable = new TonalSyllable(
            letters.map(it => new AlphabeticLetter(it.characters))
          );
          // pop f
          s.popLetter();
          this.getUncombiningForms(s, letters);
          return [s];
        }
      } else if (allomorph.tonal.toString() === TonalLetterTags.x) {
        // 5 to 1. 5 to 7. 5 to 5.
        if (allomorph instanceof FreeAllomorph) {
          const ret = [];
          const rls = uncombiningRulesAy.get(allomorph.toString());
          const tnls = !rls ? [] : rls;
          for (let i in tnls) {
            let s: TonalSyllable = new TonalSyllable(
              letters.map(it => new AlphabeticLetter(it.characters))
            );
            if (!(tnls[i] instanceof ZeroTonal)) {
              if (tnls[i] instanceof FreeTonalZ) {
                // 5 to 7
                // replace x with z
                s.popLetter();
                s.pushLetter(new AlphabeticLetter(tnls[i].characters));
                ret.push(s);
              } else if (tnls[i] instanceof FreeTonalX) {
                // 5 to 5
                ret.push(s);
              }
            } else {
              // 5 to 1
              // pop x
              s.popLetter();
              ret.push(s);
            }
          }
          return ret;
        } else if (allomorph instanceof CheckedAllomorph) {
          // 5 to 8.
          const s: TonalSyllable = new TonalSyllable(
            letters.map(it => new AlphabeticLetter(it.characters))
          );
          s.popLetter(); // pop x
          this.getUncombiningForms(s, letters);
          return [s];
        }
      } else if (allomorph.tonal.toString() === TonalLetterTags.y) {
        return [];
      }
    }
    return [];
  }
}

/** Returns the last syllable of a double or triple construction as an uncombining form. */
export class LastSyllableForms extends TonalCombiningMetaplasm {
  constructor(private lettersLastSyllable: PositionalLetter[]) {
    super();
  }

  apply(
    letters: Array<PositionalLetter>,
    allomorph: Allomorph
  ): TonalSyllable[] {
    if (allomorph) {
      // skip the last syllable. it is the base form of the preceding 2 syllables.
      if (
        this.lettersLastSyllable[
          this.lettersLastSyllable.length - 1
        ].toString() === letters[letters.length - 1].toString()
      )
        return [];
      const s: TonalSyllable = new TonalSyllable(
        this.lettersLastSyllable.map(it => new AlphabeticLetter(it.characters))
      );
      return [s];
    }
    return [];
  }
}

/** Returns the uncombining forms of a transfix inflected syllable. */
export class TransfixUncombining extends TonalCombiningMetaplasm {
  apply(
    letters: Array<PositionalLetter>,
    allomorph: Allomorph
  ): TonalSyllable[] {
    if (allomorph) {
      const vowelA = letters.filter(it => it.toString() === TonalLetterTags.a);
      const chkFnls = letters.filter(
        it => it.name === TonalSpellingTags.checkedTone
      );
      const s: TonalSyllable = new TonalSyllable(
        letters.map(it => new AlphabeticLetter(it.characters))
      );

      if (vowelA.length == 1) {
        // aw -> ay
        s.popLetter(); // pop letter w
        s.pushLetter(lowerLettersTonal.get(TonalLetterTags.y));
        return [s];
      } else if (chkFnls.length == 1) {
        // checked tones
        s.popLetter(); // pop letter w
        const clone: TonalSyllable = Object.create(s);
        // get hh or tt
        const got = finalConsonantsForTransfix.get(
          s.letters[s.letters.length - 1].literal
        );
        if (got) {
          clone.popLetter(); // pop final t
          clone.pushLetter(lowerLettersTonal.get(got)); // push hh or tt
        }
        return [s, clone];
      } else {
        // in case of free tones other than aw, return the other four free tones
        s.popLetter(); // pop letter w. 1st tone
        const clone2: TonalSyllable = Object.create(s); // 2nd tone
        const clone5: TonalSyllable = Object.create(s); // 5th tone
        const clone7: TonalSyllable = Object.create(s); // 7th tone
        clone2.pushLetter(lowerLettersTonal.get(TonalLetterTags.y));
        clone5.popLetter(); // letter y was also pushed to clone5, so we have to pop it out. bug?
        clone5.pushLetter(lowerLettersTonal.get(TonalLetterTags.x));
        clone7.popLetter(); // letter y was also pushed to clone7, so we have to pop it out. bug?
        clone7.pushLetter(lowerLettersTonal.get(TonalLetterTags.z));
        return [s, clone2, clone5, clone7];
      }
    }
    return [];
  }
}

/** Change ~ietf or ietw to ~ek or ~ekk. */
export class UncombiningFormsIetfIetwToEkEkk extends TonalCombiningMetaplasm {
  apply(
    letters: Array<PositionalLetter>,
    allomorph: Allomorph
  ): TonalSyllable[] {
    if (allomorph) {
      const ics = letters.filter(
        i => i.name === TonalSpellingTags.initialConsonant
      );
      const ts = letters.filter(i => i.name === TonalSpellingTags.checkedTone);
      if (ics.length > 0 && ts.length > 0) {
        if (ts[0].toString() === TonalLetterTags.f) {
          // in case of ~ietf
          const s: TonalSyllable = new TonalSyllable([
            new AlphabeticLetter(ics[0].characters),
            lowerLettersTonal.get(TonalLetterTags.e),
            lowerLettersTonal.get(TonalLetterTags.k),
          ]);
          return [s];
        } else if (ts[0].toString() === TonalLetterTags.w) {
          // in case of ~ietw
          const s: TonalSyllable = new TonalSyllable([
            new AlphabeticLetter(ics[0].characters),
            lowerLettersTonal.get(TonalLetterTags.e),
            lowerLettersTonal.get(TonalLetterTags.kk),
          ]);
          return [s];
        }
      }
    }
    return [];
  }
}

/** Lemmatizes a word and returns its base forms. */
export class TonalLemmatization extends TonalLemmatizationMetaplasm {
  apply(
    morphemes: Array<TonalUncombiningMorpheme>,
    inflectionalEnding: InflectionalEnding
  ): TonalWord[] {
    return this.populateLemmata(morphemes, inflectionalEnding);
  }

  private getLemmas(
    morphemes: Array<TonalUncombiningMorpheme>,
    inflectionalEnding: InflectionalEnding
  ): Array<TonalWord> {
    if (inflectionalEnding) {
      if (inflectionalEnding instanceof FreeInflectionalEnding) {
        const ret = [];
        const arr = morphemes[morphemes.length - 1].getForms();

        for (const key in arr) {
          const wrd = new TonalWord(morphemes.map(it => it.syllable));
          wrd.popSyllable();
          wrd.pushSyllable(arr[key]);
          ret.push(wrd);
        }
        return ret;
      } else if (inflectionalEnding instanceof CheckedInflectionalEnding) {
        if (morphemes[morphemes.length - 1].getForms().length == 0) return [];
        const wrd = new TonalWord(morphemes.map(it => it.syllable));
        wrd.popSyllable();
        wrd.pushSyllable(morphemes[morphemes.length - 1].getForms()[0]);
        return [wrd];
      }
    }

    return [];
  }

  private populateLemmata(
    morphemes: Array<TonalUncombiningMorpheme>,
    inflectionalEnding: InflectionalEnding
  ) {
    let lemmata: Array<TonalWord> = new Array();

    // turn morphemes into lemmas
    let lms = this.getLemmas(morphemes, inflectionalEnding);
    if (lms.length > 0) {
      for (let key in lms) {
        lemmata.push(lms[key]);
      }
    }
    return lemmata;
  }
}
