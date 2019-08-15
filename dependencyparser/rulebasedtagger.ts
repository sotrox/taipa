import { TonalLemmatizationLexeme } from '../tonal/lexeme'
import { ConstructionOfPhrase, VerbPhrase, Rules } from './rules'
import { Word } from '../lexeme'
import { ConstructionElement } from './keywords'

export class RuleBasedTagger {

    elements: Array<ConstructionElement> = new Array()

    constructor(strs: string[]) {
        this.match(strs)
    }

    private match(strs: string[]) {
        let str: string = strs[0]

        let cop: ConstructionOfPhrase
        let vp = new VerbPhrase()
        // if w is an instance of TonalWord or ~
        for(let key in vp.constructions) {
            if(vp.constructions[key].elements[0].match(str)) {
                cop = vp.constructions[key]
            }
        }

        for(let k in strs) {
            this.elements.push(vp.constructions[0].elements[k])
        }

        const rules = new Rules()
        const cops = rules.match(strs)
/*
        if(cops)
            for(let e of cops) {
                console.log(e.elements[0].lexeme.word.literal)
            }
            */
    }

}