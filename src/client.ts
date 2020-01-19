import { TonalLemmatizationLexeme } from './tonal/lexeme';
import { Lurzmafjiz } from './tonal/init';
import { TonalLemmatizationAnalyzer } from './tonal/analyzer';
import { TonalUncombiningMorpheme } from './tonal/morpheme';

import { Kana } from './kana/init';
import { KanaUncombiningMorpheme } from './kana/morpheme';
import { KanaAnalyzer } from './kana/analyzer';

import { DependencyParser } from './dparser/parser';
import { RuleBasedTagger } from './dparser/tagger';

import { Document } from './document';
import { Token, TokenAnalysis } from './token';
import { Lemmatizer } from './lemmatizer';

export class Client {
    private readonly lurzmafjiz_aw = Lurzmafjiz.getInstance();
    private readonly kana_aw = Kana.getInstance();

    processKana(str: string): TokenAnalysis {
        // kana
        let ta: TokenAnalysis = new TokenAnalysis();
        if(str) {
            const ka = <KanaAnalyzer>this.kana_aw.analyzer;
            const morphemes: KanaUncombiningMorpheme[] = ka.morphAnalyze(str);
            ta.blockSequences = this.kana_aw.getBlocks(morphemes);

            for (let m of morphemes) {
                ta.soundSequences.push(m.sounds);
            }
        }

        return ta;
    }

    processTonal(str: string): TokenAnalysis {
        // tonal lurzmafjiz
        let ta: TokenAnalysis = new TokenAnalysis();
        if(str) {
            const tla = <TonalLemmatizationAnalyzer>this.lurzmafjiz_aw.analyzer;
            const morphemes: TonalUncombiningMorpheme[] = tla.morphAnalyze(str);
            const lexemes: TonalLemmatizationLexeme = tla.lexAnalyze(morphemes);
            ta.word = lexemes.word;
            ta.lemmata = lexemes.getLemmata();
            ta.inflectionalEnding = lexemes.getInflectionalEnding();

            for (let m of morphemes) {
                ta.soundSequences.push(m.sounds);
            }
        }

        return ta;
    }

    process(str: string): Document {
        let doc: Document = new Document();

        // tokenization
        if(str) {
            const tokens = str.match(/\w+/g);
            if (tokens)
                for (let i = 0; i < tokens.length; i++) {
                    if (tokens[i].length) doc.tokens.push(new Token(tokens[i]));
                }

            // tagging
            const tggr = new RuleBasedTagger();
            doc = tggr.tag(doc);

            // lemmatization
            const lmtzr = new Lemmatizer();
            doc = lmtzr.getTonalLemmas(doc);

            // dependency parsing
            const dpsr = new DependencyParser();
            doc = dpsr.parse(doc);
        }
        
        return doc;
    }
}
