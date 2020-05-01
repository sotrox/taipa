import { TonalSoundChangingMorphemeMaker } from './morpheme';
import { TonalZeroAssimilation } from '../metaplasm';
import { TonalAssimilationLexeme } from './lexeme';
import { TonalAssimilationPhrasemeMaker } from './phraseme';
import {
  AgressiveInternal,
  RegressiveInternal,
  RegressiveExternal,
  AgressiveExternal,
} from './metaplasm';
import { graphAnalyzeTonal } from '../tonal/analyzer';

/**
 * Analyzes a string into morphemes. Morphological analysis.
 * @param str A string
 */
function morphAnalyze(str: string) {
  const gs = graphAnalyzeTonal(str);
  const tschmm = new TonalSoundChangingMorphemeMaker();
  const mrphs = tschmm.makeMorphemes(gs);
  return mrphs;
}

/** No internal sandhi. */
export function getNoAssimilation(word: string) {
  const mrphs = morphAnalyze(word);
  const lx = new TonalAssimilationLexeme(mrphs, new TonalZeroAssimilation());

  return lx;
}

/** Assimilates agressively inside a word. */
export function assimilateAgressiveLexical(word: string) {
  const mrphs = morphAnalyze(word);
  const lx = new TonalAssimilationLexeme(mrphs, new AgressiveInternal());

  return lx;
}

/** Assimilates regressively inside a word. */
export function assimilateRegressiveLexical(word: string) {
  const mrphs = morphAnalyze(word);
  const lx = new TonalAssimilationLexeme(mrphs, new RegressiveInternal());

  return lx;
}

/** Assimilates agressively between 2 words. */
export function assimilateAgressivePhrasal(
  preceding: string,
  following: string
) {
  const lxPreceding = getNoAssimilation(preceding);
  const lxFollowing = getNoAssimilation(following);
  const phmk = new TonalAssimilationPhrasemeMaker();

  return phmk.makePhraseme(lxPreceding, lxFollowing, new AgressiveExternal());
}

/** Assimilates regressively between 2 words. */
export function assimilateRegressivePhrasal(
  preceding: string,
  following: string
) {
  const lxPreceding = getNoAssimilation(preceding);
  const lxFollowing = getNoAssimilation(following);
  const phmk = new TonalAssimilationPhrasemeMaker();

  return phmk.makePhraseme(lxPreceding, lxFollowing, new RegressiveExternal());
}
