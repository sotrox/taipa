import { Rules, ConstructionOfPhrase, PhrasalVerb, PhrasalVerbWithEncliticSurface } from './rules';
import { POSTags, Tagset } from './symbols';
import { tonal_inflextion_analyzer } from './analyzer';
import { TonalCombiningForms } from './morpheme';
import { TonalInflexion } from './lexeme';
import { ConstructionElementInflectional, Demonstrative, PersonalPronoun2To137, Auxiliary, PartsOfSpeech, ConstructionElement, EncliticSurface, ParticleSurface, VerbSurface } from './keywords';
import { tonal_lemmatization_analyzer } from '../tonal/analyzer';

class MatchedPatternOfWords {
    elems: Array<ConstructionElement> = new Array();
}

export class RuleBasedTagger {
    private ces: Array<ConstructionElement> = new Array();

    constructor(strs: string[]) {
        this.match(strs);
    }

    private generate(sequence: string[], patterns: ConstructionOfPhrase[]) {
        let cps: Array<ConstructionOfPhrase> = new Array();

        if(patterns.length > 0) {
            for (let pat of patterns) {
                if (
                    pat.partOfSpeech === POSTags.verb &&
                    pat.elements[pat.elements.length - 1].pos === POSTags.particle
                ) {
                    pat.elements[pat.elements.length - 1].tag = Tagset.PPV;

                    if (
                        pat.elements[pat.elements.length - 1].wordForm !=
                        (<ConstructionElementInflectional>pat.elements[pat.elements.length - 1]).lexeme.word.literal
                    ) {
                        const ls = tonal_lemmatization_analyzer.doLexicalAnalysis(sequence[0]);
                        (<ConstructionElementInflectional>pat.elements[0]).lexeme = tonal_inflextion_analyzer.doAnalysis(
                            ls[0].lemmata[0].literal,
                            new TonalCombiningForms(),
                            new TonalInflexion(),
                        )[0];
                    } else {
                    }

                    pat.elements[0].tag = Tagset.VB;
                    (<ConstructionElementInflectional>pat.elements[0]).matchFormFor(sequence[0])
                }

                cps.push(pat)

                if(pat instanceof PhrasalVerb) {
                    let pvwes = new PhrasalVerbWithEncliticSurface(new VerbSurface(pat.elements[0].wordForm),
                                                                    new ParticleSurface(pat.elements[1].wordForm),
                                                                    new EncliticSurface('aw'));
                    cps.push(pvwes);
                }

            }
        } else {
        }

        //console.log(cps)
        return cps;
    }

    private phrase(strs: string[], beginOfPhrase: number) {
        const rs = new Rules();
        let sequence: string[] = []
        let pats;
        for(let i = beginOfPhrase; i < strs.length; i++) {
            sequence.push(strs[i])
            pats = rs.matches(sequence)
            if(pats) {
                break;
            } else {
                //console.log(sequence)
                let kw = rs.matchKeyWords(sequence[0]);
                    
                if (kw) {
                    if (kw.pos === POSTags.pronoun && kw instanceof PersonalPronoun2To137) kw.tag = Tagset.PRP;
                    else if (kw.pos === POSTags.pronoun && kw instanceof Demonstrative) kw.tag = Tagset.DT;
                    else if (kw.pos === POSTags.auxiliary) kw.tag = Tagset.AUX;

                    pats = [new ConstructionOfPhrase()]; // TODO: can keyword be wrapped in something else
                    pats[0].elements.push(kw);
                    break;
                }
            }
        }

        //console.log(pats)

        let listCP: Array<ConstructionOfPhrase> = new Array();
        if(pats) listCP = this.generate(sequence, pats);

        //console.log(listCP);

        let matchedLen = 0;
        let mp = new MatchedPatternOfWords();

        for (let m in listCP) {
            const min = Math.min(strs.length - beginOfPhrase, listCP[m].elements.length);
            if (listCP[m].elements.length == min) {
                for (let n = 0; n < min; n++) {
                    if (listCP[m].elements[n] != undefined) {
                        if (strs[beginOfPhrase + n] === listCP[m].elements[n].wordForm) {
                            if (n + 1 == min && min > matchedLen) {
                                matchedLen = min;
                                for (let q = 0; q < matchedLen; q++) {
                                    mp.elems[q] = listCP[m].elements[q];
                                    if(listCP[m].elements[q].wordForm === '') {
                                        mp.elems[q].wordForm = strs[beginOfPhrase + q];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return mp;
    }

    private match(strs: string[]) {
        const rs = new Rules();
        let buf: string[] = [];
        let previous: ConstructionElement | undefined = undefined

        let beginOfPhrase: number = 0;
        let mpw: MatchedPatternOfWords = new MatchedPatternOfWords();
        for (let i = 0; i < strs.length; i++) {
            if (i - beginOfPhrase == 0) {
                mpw = this.phrase(strs, beginOfPhrase);
                if(mpw.elems.length) {
                    beginOfPhrase += mpw.elems.length;
                    for(let w in mpw.elems) {
                        this.ces.push(mpw.elems[w])
                    }
                    //console.log(mpw);
                    mpw.elems = []            
                }
            }
        }
    }

    getCes() {
        return this.ces;
    }
}
