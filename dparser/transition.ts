import { ConstructionElement } from './keywords';
import { DependencyLabels, POSTags, COPULA_CONJUGATION } from './symbols'
import { DummyLexeme } from './lexeme';
import { Document } from '../document'

export class Relation {
    dependency: DependencyLabels
    head: ConstructionElement
    dependent: ConstructionElement

    constructor(dep: DependencyLabels, head: ConstructionElement, dependent: ConstructionElement) {
        this.dependency = dep;
        this.head = head;
        this.dependent = dependent
    }
}

export abstract class Transition {
    abstract do(c: Configuration): Configuration
}

export class Shift extends Transition {
    do(c: Configuration) {
        let s = c.queue.shift()
        if(s != undefined) {
            c.stack.push(s);
        }
        return c;
    }
}

export class RightArc extends Transition {
    do(c: Configuration) {
        c.stack.pop();
        return c;
    }
}

export class LeftArc extends Transition {
    do(c: Configuration) {
        const top = c.stack.pop()
        c.stack.pop()
        if(top) c.stack.push(top)
        return c;
    }
}

export class Configuration {
    queue: Array<ConstructionElement> = new Array()
    stack: Array<ConstructionElement> = new Array()
    relations: Array<Relation> = new Array();

    getGraph() {
        return this.relations;
    }
    
    isTerminalConfiguration() {
        if(this.queue.length > 0) {
            return false;
        }
        if(this.stack.length == 1 && this.queue.length == 0) {
            return true;
        }
        return false;
    }
}

export class Guide {
    transitions: Array<Transition>  = new Array()

    getNextTransition(c: Configuration) {
        if(c.stack[c.stack.length-1] != undefined) {
            if(c.stack[c.stack.length-1].partOfSpeech === POSTags.verb) {
                if(c.stack[c.stack.length-1].func === COPULA_CONJUGATION.sandhiForm.copulative) {
                    if(c.queue.length>0 && c.queue[0].partOfSpeech === POSTags.noun) {
                        this.transitions.push(new Shift())
                    }
                } else if(c.queue.length>0 && c.queue[0].partOfSpeech === POSTags.pronoun) {
                    this.transitions.push(new Shift())
                } else {
                    this.transitions.push(new RightArc())
                    c.relations.push(new Relation(DependencyLabels.ccomp, c.stack[c.stack.length-2], c.stack[c.stack.length-1]))
                }
            } if(c.stack[c.stack.length-1].partOfSpeech === POSTags.pronoun) {
                this.transitions.push(new Shift())
                if(c.queue.length>0 && c.queue[0].func != COPULA_CONJUGATION.sandhiForm.copulative) {
                    this.transitions.push(new RightArc())
                    c.relations.push(new Relation(DependencyLabels.csubj, c.stack[c.stack.length-2], c.stack[c.stack.length-1]))
                }
            } if(c.stack[c.stack.length-1].partOfSpeech === POSTags.noun) {
                this.transitions.push(new LeftArc())
                c.relations.push(new Relation(DependencyLabels.cop, c.stack[c.stack.length-1], c.stack[c.stack.length-2]))
            }
        }

        if(this.transitions.length == 0) return null
        return this.transitions.shift();
    }
}

export class DependencyParser {
    getInitialConfiguration() {
        return new Configuration();
    }

    apply(t: Transition, c: Configuration) {
        return t.do(c);
    }

    parse(elems: ConstructionElement[]) {
        let c: Configuration = this.getInitialConfiguration();
        for(let key of elems) {
            c.queue.push(key)
        }

        let guide = new Guide()
        let root = new DummyLexeme()
        root.word.literal = 'ROOT'
        let ce = new ConstructionElement()
        ce.lexeme = root
        c.stack.push(ce)

        if(c.stack.length == 1 && c.queue.length > 0) {
            // initial configuration
            // shift the first lexeme from queue to stack
            guide.transitions.push(new Shift())
        }

        while(!c.isTerminalConfiguration()) {
            let t = guide.getNextTransition(c);
            if(t == null || t == undefined) break
            c = this.apply(t, c);
        }

        let doc: Document = new Document();
        doc.graph = c.getGraph();
        return doc;

    }
}

