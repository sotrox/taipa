import { PositionalLetter, PositionalLetterGeneration, sgPipe } from '../unit';
import {
  tonalPositionalLetters,
  TonalSpellingTags,
  lowerLettersTonal,
  checkedToneLettersTonal,
  freeToneLettersTonal,
  initialConsonantsTonal,
  materLectionisTonal,
  vowelsTonal,
  neutralFinalConsonantsTonal,
  nasalFinalConsonantsTonal,
  nasalizationsTonal,
  stopFinalConsonantsTonal,
  stopFinalConsonantsBgjklpsTonal,
  stopFinalConsonantsBBggkkllppssTonal,
} from './version2';
import { combiningRules } from './collections';

function initialConsonant(sg: PositionalLetterGeneration) {
  if (initialConsonantsTonal.includes(sg.letters[sg.matchedLetters.length])) {
    const positions = tonalPositionalLetters.get(
      sg.letters[sg.matchedLetters.length]
    );
    if (positions) {
      const s = positions(TonalSpellingTags.initialConsonant);
      if (s) sg.matchedLetters.push(s);
    }
  } else sg.matching = false;

  return sg;
}

function stopFinalConsonant(sg: PositionalLetterGeneration) {
  if (!sg.matching) return sg;

  if (stopFinalConsonantsTonal.includes(sg.letters[sg.matchedLetters.length])) {
    const positions = tonalPositionalLetters.get(
      sg.letters[sg.matchedLetters.length]
    );
    if (positions) {
      const s = positions(TonalSpellingTags.stopFinalConsonant);
      if (s) sg.matchedLetters.push(s);
    }
  } else {
    sg.matching = false;
    if (sg.letters.length == sg.matchedLetters.length && sg.predictive)
      sg.predictions.push(stopFinalConsonantsTonal.letters);
  }

  return sg;
}

function neutralFinalConsonant(sg: PositionalLetterGeneration) {
  if (!sg.matching) return sg;

  if (
    neutralFinalConsonantsTonal.includes(sg.letters[sg.matchedLetters.length])
  ) {
    const positions = tonalPositionalLetters.get(
      sg.letters[sg.matchedLetters.length]
    );
    if (positions) {
      const s = positions(TonalSpellingTags.stopFinalConsonant);
      if (s) sg.matchedLetters.push(s);
    }
  } else {
    sg.matching = false;
    if (sg.letters.length == sg.matchedLetters.length && sg.predictive)
      sg.predictions.push(neutralFinalConsonantsTonal.letters);
  }

  return sg;
}

function nasalFinalConsonant(sg: PositionalLetterGeneration) {
  // check out the length of letters like we do in the loop in function vowel
  if (!sg.matching || sg.letters.length == 0) return sg;

  if (
    nasalFinalConsonantsTonal.includes(sg.letters[sg.matchedLetters.length])
  ) {
    const positions = tonalPositionalLetters.get(
      sg.letters[sg.matchedLetters.length]
    );
    if (positions) {
      const s = positions(TonalSpellingTags.nasalFinalConsonant);
      if (s) sg.matchedLetters.push(s);
    }
  } else {
    sg.matching = false;
    if (sg.letters.length == sg.matchedLetters.length && sg.predictive)
      sg.predictions.push(nasalFinalConsonantsTonal.letters);
  }

  return sg;
}

function vowel(sg: PositionalLetterGeneration) {
  // we need the below line when the preceding initial consonant is not matched
  if (!sg.matching) return sg;

  let toBePredicted = true;
  let matches: number = 0;
  for (let i = sg.matchedLetters.length; i < sg.letters.length; i++) {
    if (vowelsTonal.includes(sg.letters[i])) {
      toBePredicted = true;
      const positions = tonalPositionalLetters.get(sg.letters[i]);
      if (positions) {
        const s = positions(TonalSpellingTags.vowel);
        matches++;
        if (s) sg.matchedLetters.push(s);
      }
    } else {
      toBePredicted = false;
      if (matches == 0) sg.matching = false;
      break;
    }
  }

  if (toBePredicted) {
    if (sg.predictive && sg.letters.length > 0) {
      sg.predictions.push(vowelsTonal.letters);
    }
    sg.matching = true;
  }

  return sg;
}

function materLectionis(sg: PositionalLetterGeneration) {
  if (materLectionisTonal.includes(sg.letters[sg.matchedLetters.length])) {
    const positions = tonalPositionalLetters.get(
      sg.letters[sg.matchedLetters.length]
    );
    if (positions) {
      const s = positions(TonalSpellingTags.vowel);
      if (s) sg.matchedLetters.push(s);
    }
  } else sg.matching = false;

  return sg;
}

function nasalization(sg: PositionalLetterGeneration) {
  if (!sg.matching) return sg;

  if (nasalizationsTonal.includes(sg.letters[sg.matchedLetters.length])) {
    const positions = tonalPositionalLetters.get(
      sg.letters[sg.matchedLetters.length]
    );
    if (positions) {
      const s = positions(TonalSpellingTags.nasalization);
      if (s) sg.matchedLetters.push(s);
    }
  } else {
    sg.matching = false;
    if (sg.letters.length == sg.matchedLetters.length && sg.predictive)
      sg.predictions.push(nasalizationsTonal.letters);
  }

  return sg;
}

function freeToneLetter(sg: PositionalLetterGeneration) {
  if (!sg.matching) return sg;

  if (freeToneLettersTonal.includes(sg.letters[sg.matchedLetters.length])) {
    const positions = tonalPositionalLetters.get(
      sg.letters[sg.matchedLetters.length]
    );
    if (positions) {
      const s = positions(TonalSpellingTags.freeTone);
      if (s) sg.matchedLetters.push(s);
    }
  } else {
    sg.matching = false;
    if (sg.letters.length == sg.matchedLetters.length && sg.predictive)
      sg.predictions.push(freeToneLettersTonal.letters);
  }

  return sg;
}

function checkedToneLetter(sg: PositionalLetterGeneration) {
  if (!sg.matching) return sg;

  if (checkedToneLettersTonal.includes(sg.letters[sg.matchedLetters.length])) {
    const positions = tonalPositionalLetters.get(
      sg.letters[sg.matchedLetters.length]
    );
    if (positions) {
      const s = positions(TonalSpellingTags.checkedTone);
      if (s) sg.matchedLetters.push(s);
    }
  } else {
    sg.matching = false;
    if (sg.letters.length == sg.matchedLetters.length && sg.predictive)
      sg.predictions.push(checkedToneLettersTonal.letters);
  }

  return sg;
}

function sandhiFinalConsonant(sg: PositionalLetterGeneration) {
  if (!sg.matching) return sg;

  if (
    stopFinalConsonantsBgjklpsTonal.includes(
      sg.letters[sg.matchedLetters.length]
    ) ||
    stopFinalConsonantsBBggkkllppssTonal.includes(
      sg.letters[sg.matchedLetters.length]
    )
  ) {
    const positions = tonalPositionalLetters.get(
      sg.letters[sg.matchedLetters.length]
    );
    if (positions) {
      const s = positions(TonalSpellingTags.stopFinalConsonant);
      if (s) sg.matchedLetters.push(s);
    }
  } else {
    sg.matching = false;
    if (
      sg.letters.length == sg.matchedLetters.length &&
      sg.predictive &&
      sg.predictSandhiFinalConsonant
    ) {
      sg.predictions.push(stopFinalConsonantsBgjklpsTonal.letters);
      sg.predictions.push(stopFinalConsonantsBBggkkllppssTonal.letters);
    }
  }

  return sg;
}

// common syllables
const scV = sgPipe(vowel);
const scM = sgPipe(materLectionis);
const scVT = sgPipe(vowel, freeToneLetter);
const scMT = sgPipe(materLectionis, freeToneLetter);
const scMC = sgPipe(materLectionis, neutralFinalConsonant);
const scCV = sgPipe(initialConsonant, vowel);
const scVC1 = sgPipe(vowel, stopFinalConsonant);
const scVC2 = sgPipe(vowel, nasalFinalConsonant);
const scVCT1 = sgPipe(vowel, stopFinalConsonant, checkedToneLetter);
const scVCT2 = sgPipe(vowel, nasalFinalConsonant, freeToneLetter);
const scCVT = sgPipe(initialConsonant, vowel, freeToneLetter);
const scCVC1 = sgPipe(initialConsonant, vowel, stopFinalConsonant);
const scCVC2 = sgPipe(initialConsonant, vowel, nasalFinalConsonant);
const scCVCT1 = sgPipe(
  initialConsonant,
  vowel,
  stopFinalConsonant,
  checkedToneLetter
);
const scCVCT2 = sgPipe(
  initialConsonant,
  vowel,
  nasalFinalConsonant,
  freeToneLetter
);
const scCVCC = sgPipe(
  initialConsonant,
  vowel,
  nasalFinalConsonant,
  neutralFinalConsonant
);
const scVCCT = sgPipe(
  vowel,
  nasalFinalConsonant,
  neutralFinalConsonant,
  checkedToneLetter
);

// consonant syllables
const scCC = sgPipe(initialConsonant, nasalFinalConsonant);
const scCCT = sgPipe(initialConsonant, nasalFinalConsonant, freeToneLetter);
const scCCC = sgPipe(
  initialConsonant,
  nasalFinalConsonant,
  neutralFinalConsonant
);
const scCCCT = sgPipe(
  initialConsonant,
  nasalFinalConsonant,
  neutralFinalConsonant,
  checkedToneLetter
);

// nasalization syllables
const scVN = sgPipe(vowel, nasalization);
const scVNT = sgPipe(vowel, nasalization, freeToneLetter);
const scVNC = sgPipe(vowel, nasalization, neutralFinalConsonant);
const scCVN = sgPipe(initialConsonant, vowel, nasalization);
const scCVNT = sgPipe(initialConsonant, vowel, nasalization, freeToneLetter);
const scCVNC = sgPipe(
  initialConsonant,
  vowel,
  nasalization,
  neutralFinalConsonant
);
const scCVNCT = sgPipe(
  initialConsonant,
  vowel,
  nasalization,
  neutralFinalConsonant,
  checkedToneLetter
);

// sandhi syllables
const scVC3 = sgPipe(vowel, sandhiFinalConsonant);
const scVCT3 = sgPipe(vowel, sandhiFinalConsonant, checkedToneLetter);
const scCVC3 = sgPipe(initialConsonant, vowel, sandhiFinalConsonant);
const scCVCT3 = sgPipe(
  initialConsonant,
  vowel,
  sandhiFinalConsonant,
  checkedToneLetter
);
const scCVCCT = sgPipe(
  initialConsonant,
  vowel,
  nasalFinalConsonant,
  neutralFinalConsonant,
  checkedToneLetter
);

// prettier-ignore
export const syllableCompositions = [
  // syllable compositions or patterns

  scV,  scM, scVT, scMT, scMC, scCV, scVC1, scVC2, scVCT1, scVCT2, scCVT, scCVC1,
  scCVC2, scCVCT1, scCVCT2, scCVCC, scVCCT,

  scCC, scCCT, scCCC, scCCCT,

  scVN, scVNT, scVNC, scCVN, scCVNT, scCVNC, scCVNCT,

  scVC3, scVCT3, scCVC3, scCVCT3, scCVCCT,
];

export class TonalPositionalLetterGenerator {
  private isStopFinal(str: string) {
    if (stopFinalConsonantsTonal.includes(str)) return true;

    return false;
  }

  private genChecked(ltrs: string[]) {
    /** if the 3rd and 5th checked tones would be changed to -ppx, -ttx, -kkx,
     *  -hhx, -ppw, -ttw, -kkw, and -hhw, edit the rules in combiningRules
     */
    const tos = combiningRules.get(ltrs[ltrs.length - 1]);
    let strs: Array<string[]> = new Array();

    strs.push(ltrs);

    // console.debug(tos);
    if (tos) {
      for (let i in tos) {
        let syl: string[] = new Array();
        Object.assign(syl, ltrs);
        syl.push(lowerLettersTonal.get(tos[i]).literal);
        strs.push(syl);
      }
    }

    return strs;
  }

  generate(letters: string[]): PositionalLetter[][] {
    let strs: Array<string[]> = new Array();
    const sequences: Array<PositionalLetter[]> = new Array(); // to be returned

    if (this.isStopFinal(letters[letters.length - 1])) {
      strs = this.genChecked(letters);
    } else {
      strs.push(letters);
    }

    for (let i in strs) {
      // generates all needed positional letters to be processed

      for (let j = 0; j < syllableCompositions.length; j++) {
        let sg = new PositionalLetterGeneration();
        sg.letters = strs[i];
        //console.log(`j: ${j}`)
        sg = syllableCompositions[j](sg);
        if (
          sg.letters.length == sg.matchedLetters.length &&
          sg.matching == true
        ) {
          sequences.push(sg.matchedLetters);
          break;
        }
      }
    }
    // console.log(letters, sequences);
    return sequences;
  }
}
