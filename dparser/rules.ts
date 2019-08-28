import { ConstructionElement, Demonstrative, Auxiliary, Verb, PersonalPronoun, Copula, PersonalPronouns
    , FromTone2ToTone137, PersonalPronoun2To137, Particle, KeyWords, Noun, Adjective, PartsOfSpeech, TonalZeroCombining } from './keywords'
import { tonalInflextionAnalyzer } from './analyzer'
import { TonalCombiningForms } from './morpheme';
import { TonalInflexion } from './lexeme';
import { Phraseme, ToneGroup } from '../phraseme';
import { POSTags } from './symbols';

export class ConstructionOfPhrase {
    phraseme: Phraseme = new Phraseme()
    partOfSpeech: string = ''
    elements: Array<PartsOfSpeech> = new Array()

    constructor(arr: Array<PartsOfSpeech>) {
        for(let key in arr) {
            this.elements.push(arr[key])
        }
    }
}

class NounPhrase extends ConstructionOfPhrase {}
class ParticlePhrase {}
class VerbPhrase extends ConstructionOfPhrase {}

class PhrasalVerb extends VerbPhrase {
    constructor(arr: Array<ConstructionElement>) {
        super(arr)
        this.partOfSpeech = POSTags.verb
    }
}

class SetOfPhrasalVerbs {
    phrasalVerbs: Array<PhrasalVerb> = []

    constructor() {
        this.populatePhrasalVerbs()
    }

    private makeParticle(str: string) {
        let ret = new Particle()
        ret.lexeme = tonalInflextionAnalyzer.doAnalysis(str, new TonalZeroCombining(), new TonalInflexion())[0]
        return ret
    }

    private populatePhrasalVerbs() {
        this.phrasalVerbs.push(new PhrasalVerb([new Verb(), this.makeParticle('diurh')]))
    }
}

export class Chunk {

    constructions: Array<ConstructionOfPhrase> = []

    constructor() {

        let ms = tonalInflextionAnalyzer.doMorphologicalAnalysis('oannz', new TonalCombiningForms())
        let ls = tonalInflextionAnalyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let transitive = new Verb()
        transitive.lexeme = ls[0]

        ms = tonalInflextionAnalyzer.doMorphologicalAnalysis(PersonalPronouns.FirstSingular, new FromTone2ToTone137())
        ls = tonalInflextionAnalyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let proceeding = new PersonalPronoun2To137()
        proceeding.lexeme = ls[0]

        ms = tonalInflextionAnalyzer.doMorphologicalAnalysis('churw', new TonalCombiningForms())
        ls = tonalInflextionAnalyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let intransitive = new Verb()
        intransitive.lexeme = ls[0]

        this.constructions.push(new ConstructionOfPhrase([transitive, proceeding, intransitive]))
    }
}

export class Rules {
    private patterns: Array<ConstructionOfPhrase[]> = new Array()
    protected keyWords: KeyWords = new KeyWords()

    constructor() {
        this.populatePatterns()
        this.populatePhrasalVerbs()
    }

    protected get(str: string) {
        const kw = this.keyWords.get(str)
        let clone: PartsOfSpeech
        if(kw)
            return kw.clone()
        else
            return undefined
    }

    matchKeyWords(str: string) {
        return this.keyWords.get(str)
    }

    matchPatterns(strs: string[]) {
        for(let p of this.patterns) {
            for(let i=0; i<p.length; i++) {
                for(let e in p[i].elements) {
                    if(p[i].elements[e].lexeme.word.literal === strs[e]) {
                        //console.log('>' + p[i].elements[e].lexeme.word.literal + '-' + strs[e])
                        return p
                    }
                }
            }
        }
    }

    private populatePhrasalVerbs() {
        const s = new SetOfPhrasalVerbs()
        for(let pv of s.phrasalVerbs) {
            //console.log(pv.elements[1].lexeme.word.literal)
            this.patterns.push([pv])
        }
    }

    private populatePatterns() {
        // copula
        this.patterns.push([new ConstructionOfPhrase([new PersonalPronoun()])
                            , new ConstructionOfPhrase([<Copula>this.get('siz')])
                            , new ConstructionOfPhrase([new Noun()])])

        this.patterns.push([new ConstructionOfPhrase([<Copula>this.get('siz')])
                            , new ConstructionOfPhrase([new Adjective])])
        
        this.patterns.push([new ConstructionOfPhrase([<PersonalPronoun>this.get('goay')])
                            , new ConstructionOfPhrase([<Copula>this.get('siz')])
                            , new ConstructionOfPhrase([<Noun>this.get('langx')])])

        // phrasal verb
        this.patterns.push([new ConstructionOfPhrase([new Verb(), new Particle()])])

        // phrasal copula
        this.patterns.push([new ConstructionOfPhrase([new Verb(), new Particle()])
                            ,new ConstructionOfPhrase([new Adjective])])

        // serial verbs

        // others
        this.patterns.push([new Chunk().constructions[0]])
    }
}