// client
export { Client } from './client';

// API
export {
  tonalLemmatizationAnalyzer,
  graphAnalyzeTonal,
} from './tonal/analyzer';
export { tonalInflectionAnalyzer } from './dparser/analyzer';
export { kanaLemmatizationAnalyzer, graphAnalyzeKana } from './kana/analyzer';
export { graphAnalyzeHangul } from './hangul/analyzer';
export { GraphemeMaker } from './unit';
export {
  lowerLettersTonal,
  TonalLetterTags,
  TonalSpellingTags,
} from './tonal/version2';
export { KanaLetterTags } from './kana/kana';
export { lemmatize } from './tonal/lemmatizer';
export {
  createTonalPhrase,
  createTonalInflectionLexeme,
  createCompoundPhraseme,
} from './dparser/creator';
export {
  inflectDesinence,
  inflectTransfix,
  inflectEncliticE,
  inflectPhrasalVerbParticle,
  inflectEncliticLe,
  inflectPossesiveEx,
  inflectTo,
  inflectEighthToFirst,
  inflectEighthToSecond,
  inflectToProceeding,
  inflectVppToProceeding,
  inflectVppToTransitive,
  inflectEToAdnominal,
  inflectLeToConjunctive,
  inflectPossesive,
  inflectToParticiple,
  inflectVppToParticiple,
  inflectSerial,
} from './dparser/inflector';
export { insertToFollowingSyllable } from './dparser/inserter';
export { mutateFinalConsonantOfPrecedingSyllable } from './dparser/mutator';

export { TokenAnalysis } from './token';
export { AlphabeticGrapheme } from './unit';
export { TonalCombiningMorpheme } from './dparser/morpheme';
export { TonalUncombiningMorpheme } from './tonal/morpheme';
export { TonalInflectionLexeme, TonalInsertionLexeme } from './dparser/lexeme';
export { TonalLemmatizationLexeme } from './tonal/lexeme';
export {
  PhrasalVerbPhraseme,
  PhrasalVerbVppPhraseme,
  TonalMainParticlePhraseme,
  TonalCompoundPhraseme,
  SerialPhraseme,
} from './dparser/phraseme';
export { KanaUncombiningMorpheme } from './kana/morpheme';
export { TonalWord } from './tonal/lexeme';
export { TonalPhrase } from './tonal/phraseme';

export { PositionalLetter, PositionalLetterGeneration } from './unit';
export {
  initialConsonantsTonal,
  nasalizationsTonal,
  vowelsTonal,
} from './tonal/version2';

export {
  TonalDesinenceInflection,
  TonalCombiningForms,
} from './dparser/metaplasm';

export { predict } from './tonal/prediction';

export { syllableCompositions } from './tonal/lettergen';

export { tokenizeLatinSyllable } from './tonal/tokenizer';
