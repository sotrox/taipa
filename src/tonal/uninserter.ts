import { GraphemeMaker } from '../unit';
import { lowerLettersTonal } from './version2';
import { TonalUninsertionLexeme } from '../dparser/lexeme';
import { TonalSoundUnchangingMorphemeMaker } from '../dparser/morpheme';
import { Uninsertion, UninsertFromEnclitic } from '../dparser/metaplasm';
import { TonalUninsertionPhrasemeMaker } from '../dparser/phraseme';
import { morphAnalyzeUnchanging } from '../tonal/unassimilator';
import { TonalZeroUninsertionMetaplasm } from '../metaplasm';

export function getNoUninsertion(word: string) {
  const mrphs = morphAnalyzeUnchanging(word);
  const lx = new TonalUninsertionLexeme(
    mrphs,
    new TonalZeroUninsertionMetaplasm()
  );

  return lx;
}

/**
 * Uninserts an initial m, n, or ng from syllable ~ay if the preceding syllable has a final m, n, or ng.
 * @param word A word whose second syllable is may, nay, ngay, ma, na, nga, maf, naf, or ngaf. The word has at least 2 syllables for the second one to be uninserted an initial.
 */
export function uninsertFromSyllable(word: string) {
  const mm = new TonalSoundUnchangingMorphemeMaker();
  const gm = new GraphemeMaker(lowerLettersTonal);
  const gs = gm.makeGraphemes(word);
  const ms = mm.makeMorphemes(gs);

  // TODO: add initial g. b? l?
  const lx = new TonalUninsertionLexeme(ms, new Uninsertion());

  return lx;
}

/**
 * Uninsert from the enclitic.
 * @param preceding The preceding word
 * @param following The following word. The enclitic.
 */
export function uninsertFromParticle(preceding: string, following: string) {
  const lxPreceding = getNoUninsertion(preceding);
  const lxFollowing = getNoUninsertion(following);
  const phmk = new TonalUninsertionPhrasemeMaker();

  return phmk.makePhraseme(
    lxPreceding,
    lxFollowing,
    new UninsertFromEnclitic()
  );
}
