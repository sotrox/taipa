import { GraphemeMaker } from '../grapheme'
import { KanaInputingMorphemeMaker } from './morpheme'
import { lowerLettersOfKana } from './kana'
import { Analyzer } from '../analyzer'
import { AlphabeticGrapheme } from '../grapheme'
import { NoSuccess, Success } from '../result';

//------------------------------------------------------------------------------
//  Kana Turner
//------------------------------------------------------------------------------

export class KanaAnalyzer extends Analyzer {
    getGraphemicAnalysisResults(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfKana);
        return gm.makeGraphemes();
    }

    getMorphologicalAnalysisResults(str: string)
    getMorphologicalAnalysisResults(gs: Array<AlphabeticGrapheme>)
    getMorphologicalAnalysisResults(x) {
        let graphemes: Array<AlphabeticGrapheme> = []
        if(typeof x == "object") {
            graphemes = x
        } else if(typeof x == 'string') {
            graphemes = this.getGraphemicAnalysisResults(x)
        }

        // Morpheme Maker
        let kimm = new KanaInputingMorphemeMaker(graphemes);
        return kimm.makeInputingMorphemes();
    }

    getLexicalAnalysisResults(str: string) {}
}
