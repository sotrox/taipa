
import { Sound, Medial, Initial, FreeTonal, CheckedTonal, StopFinal, NasalFinal, Nasal, Final, Tonal,
    SetOfSounds,
    PartialPositionalSound
    } from './system'
import { characters } from './character'
import { list_of_lexical_roots } from './lexicalroots1'
import { GraphemeMaker } from './graphememaker'


//------------------------------------------------------------------------------
//  Sound
//------------------------------------------------------------------------------

class MedialA extends Medial {characters = [characters.get('a')]}
class MedialE extends Medial {characters = [characters.get('e')]}
class MedialI extends Medial {characters = [characters.get('i')]}
class MedialO extends Medial {characters = [characters.get('o')]}
class MedialU extends Medial {characters = [characters.get('u')]}
class MedialUR extends Medial {characters = [characters.get('u'), characters.get('r')]}

class MaterLectionisM  extends Medial {characters = [characters.get('m')]}
class MaterLectionisN  extends Medial {characters = [characters.get('n')]}
class MaterLectionisNG  extends Medial {characters = [characters.get('n'), characters.get('g')]}

class InitialC extends Initial {characters = [characters.get('c')]}
class InitialJ extends Initial {characters = [characters.get('j')]}
class InitialL extends Initial {characters = [characters.get('l')]}
class InitialQ extends Initial {characters = [characters.get('q')]}
class InitialS extends Initial {characters = [characters.get('s')]}
class InitialV extends Initial {characters = [characters.get('v')]}
class InitialZ extends Initial {characters = [characters.get('z')]}

class InitialH extends Initial {characters = [characters.get('h')]}

class InitialP extends Initial {characters = [characters.get('p')]}
class InitialT extends Initial {characters = [characters.get('t')]}
class InitialK extends Initial {characters = [characters.get('k')]}
class InitialB extends Initial {characters = [characters.get('b')]}
class InitialD extends Initial {characters = [characters.get('d')]}
class InitialG extends Initial {characters = [characters.get('g')]}

class InitialM extends Initial {characters = [characters.get('m')]}
class InitialN extends Initial {characters = [characters.get('n')]}
class InitialNG extends Initial {characters = [characters.get('n'), characters.get('g')]}

export class ZeroTonal extends FreeTonal {characters = null;}

export class TonalZS extends FreeTonal {characters = [characters.get('z'), characters.get('s')]}
export class TonalW extends FreeTonal {characters = [characters.get('w')]}
export class TonalSS extends FreeTonal {characters = [characters.get('s'), characters.get('s')]}
export class TonalXX extends FreeTonal {characters = [characters.get('x'), characters.get('x')]}
export class TonalXXX extends FreeTonal {characters = [characters.get('x'), characters.get('x'), characters.get('x')]}
export class TonalZZS extends FreeTonal {characters = [characters.get('z'), characters.get('z'), characters.get('s')]}

export class FreeTonalX extends FreeTonal {characters = [characters.get('x')]}
export class FreeTonalY extends FreeTonal {characters = [characters.get('y')]}

export class TonalP extends CheckedTonal {characters = [characters.get('p')]}
export class TonalT extends CheckedTonal {characters = [characters.get('t')]}
export class TonalK extends CheckedTonal {characters = [characters.get('k')]}
export class TonalH extends CheckedTonal {characters = [characters.get('h')]}
export class TonalB extends CheckedTonal {characters = [characters.get('b')]}
export class TonalD extends CheckedTonal {characters = [characters.get('d')]}
export class TonalG extends CheckedTonal {characters = [characters.get('g')]}
export class TonalF extends CheckedTonal {characters = [characters.get('f')]}

export class CheckedTonalX extends CheckedTonal {characters = [characters.get('x')]}
export class CheckedTonalY extends CheckedTonal {characters = [characters.get('y')]}

export class FinalP extends StopFinal {characters = [characters.get('p')]}
export class FinalT extends StopFinal {characters = [characters.get('t')]}
export class FinalK extends StopFinal {characters = [characters.get('k')]}
export class FinalH extends StopFinal {characters = [characters.get('h')]}
export class FinalB extends StopFinal {characters = [characters.get('b')]}
export class FinalD extends StopFinal {characters = [characters.get('d')]}
export class FinalG extends StopFinal {characters = [characters.get('g')]}
export class FinalF extends StopFinal {characters = [characters.get('f')]}

class FinalM extends NasalFinal {characters = [characters.get('m')]}
class FinalN extends NasalFinal {characters = [characters.get('n')]}
class FinalNG extends NasalFinal {characters = [characters.get('n'), characters.get('g')]}

class NasalNN extends Nasal {characters = [characters.get('n'), characters.get('n')]}

export class SetOfNasals extends SetOfSounds {
    nasals: Array<Nasal> = new Array()
    constructor() {
        super()
        this.nasals.push(new NasalNN())
    }

    toString() {
        return super.toString(this.nasals)
    }
}

export class SetOfNasalFinals extends SetOfSounds {
    nasalFinals: Array<Final> = new Array()
    constructor() {
        super()
        this.nasalFinals.push(new FinalM())
        this.nasalFinals.push(new FinalN())
        this.nasalFinals.push(new FinalNG())
    }

    toString() {
        return super.toString(this.nasalFinals)
    }
}


export class SetOfNeutralFinals extends SetOfSounds {
    neutralFinals: Array<Final> = new Array()
    constructor() {
        super()
        this.neutralFinals.push(new FinalH())
    }

    toString() {
        return super.toString(this.neutralFinals)
    }
}

export class SetOfMedials extends SetOfSounds {
    medials: Array<Medial> = new Array()
    constructor() {
        super()
        this.medials.push(new MedialA())
        this.medials.push(new MedialE())
        this.medials.push(new MedialI())
        this.medials.push(new MedialO())
        this.medials.push(new MedialU())
        this.medials.push(new MedialUR())
    }

    toString() {
        return super.toString(this.medials)
    }
}

export class SetOfMaterLectionis extends SetOfSounds {
    materLectionis: Array<Medial> = new Array()
    constructor() {
        super()
        this.materLectionis.push(new MaterLectionisM())
        this.materLectionis.push(new MaterLectionisN())
        this.materLectionis.push(new MaterLectionisNG())
    }

    toString() {
        return super.toString(this.materLectionis)
    }
}

export class SetOfInitials extends SetOfSounds {
    initials: Array<Initial> = new Array()
    constructor() {
        super()
        this.initials.push(new InitialP())
        this.initials.push(new InitialT())
        this.initials.push(new InitialK())
        this.initials.push(new InitialB())
        this.initials.push(new InitialD())
        this.initials.push(new InitialG())

        this.initials.push(new InitialH())

        this.initials.push(new InitialC())
        this.initials.push(new InitialJ())
        this.initials.push(new InitialL())
        this.initials.push(new InitialQ())
        this.initials.push(new InitialS())
        this.initials.push(new InitialV())
        this.initials.push(new InitialZ())

        this.initials.push(new InitialM())
        this.initials.push(new InitialN())
        this.initials.push(new InitialNG())
    }

    toString() {
        return super.toString(this.initials)
    }
}

export class SetOfFreeTonals extends SetOfSounds {
    freeTonals: Array<FreeTonal> = new Array()
    constructor() {
        super()
        this.freeTonals.push(new TonalZS())
        this.freeTonals.push(new TonalW())
        this.freeTonals.push(new TonalXX())
        this.freeTonals.push(new TonalXXX())
        this.freeTonals.push(new TonalSS())
        this.freeTonals.push(new TonalZZS())

        this.freeTonals.push(new FreeTonalX())
        this.freeTonals.push(new FreeTonalY())
    }

    toString() {
        return super.toString(this.freeTonals)
    }
}

export class SetOfFinals extends SetOfSounds {
    finals: Array<Final> = new Array()
    constructor() {
        super()
        this.finals.push(new FinalP())
        this.finals.push(new FinalT())
        this.finals.push(new FinalK())
        this.finals.push(new FinalH())
        this.finals.push(new FinalB())
        this.finals.push(new FinalD())
        this.finals.push(new FinalG())
        this.finals.push(new FinalF())

        this.finals.push(new FinalM())
        this.finals.push(new FinalN())
        this.finals.push(new FinalNG())
    }

    toString() {
        return super.toString(this.finals)
    }
}

export class SetOfStopFinals extends SetOfSounds {
    stopFinals: Array<Final> = new Array()
    constructor() {
        super()
        this.stopFinals.push(new FinalP())
        this.stopFinals.push(new FinalT())
        this.stopFinals.push(new FinalK())
        this.stopFinals.push(new FinalH())
        this.stopFinals.push(new FinalB())
        this.stopFinals.push(new FinalD())
        this.stopFinals.push(new FinalG())
        this.stopFinals.push(new FinalF())
    }

    toString() {
        return super.toString(this.stopFinals)
    }
}

//------------------------------------------------------------------------------
//  Positional Sound for Lexical Root
//------------------------------------------------------------------------------

class PSA implements PartialPositionalSound {
    static medial: Medial = new MedialA()
}

class PSB implements PartialPositionalSound {
    static initial: Initial = new InitialB()
    static final: Final = new FinalB()
    static checkedTonal: Tonal = new TonalB()
}

class PSC implements PartialPositionalSound {
    static initial: Initial = new InitialC()
}

class PSD implements PartialPositionalSound {
    static initial: Initial = new InitialD()
    static final: Final = new FinalD()
    static checkedTonal: Tonal = new TonalD()
}

class PSE implements PartialPositionalSound {
    static medial: Medial = new MedialE()
}

class PSF implements PartialPositionalSound {
    static final: Final = new FinalF()
    static checkedTonal: CheckedTonal = new TonalF()
}

class PSG implements PartialPositionalSound {
    static initial: Initial = new InitialG()
    static final: Final = new FinalG()
    static checkedTonal: Tonal = new TonalG()
}

class PSH implements PartialPositionalSound {
    static initial: Initial = new InitialH()
    static final: Final = new FinalH()
    static checkedTonal: CheckedTonal = new TonalH()
}

class PSI implements PartialPositionalSound {
    static medial: Medial = new MedialI()
}

class PSJ implements PartialPositionalSound {
    static initial: Initial = new InitialJ()
}

class PSK implements PartialPositionalSound {
    static initial: Initial = new InitialK()
    static final: Final = new FinalK()
    static checkedTonal: Tonal = new TonalK()
}

class PSL implements PartialPositionalSound {
    static initial: Initial = new InitialL()
}

class PSM implements PartialPositionalSound {
    static initial: Initial = new InitialM()
    static medial: Medial = new MaterLectionisM()
    static final: Final = new FinalM()
}

class PSN implements PartialPositionalSound {
    static initial: Initial = new InitialN()
    static medial: Medial = new MaterLectionisN()
    static final: Final = new FinalN()
}

class PSNN implements PartialPositionalSound {
    static nasal: Nasal = new NasalNN()
}

class PSNG implements PartialPositionalSound {
    static initial: Initial = new InitialNG()
    static medial: Medial = new MaterLectionisNG()
    static final: Final = new FinalNG()
}

class PSO implements PartialPositionalSound {
    static medial: Medial = new MedialO()
}

class PSP implements PartialPositionalSound {
    static initial: Initial = new InitialP()
    static final: Final = new FinalP()
    static checkedTonal: Tonal = new TonalP()
}

class PSQ implements PartialPositionalSound {
    static initial: Initial = new InitialQ()
}

class PSS implements PartialPositionalSound {
    static initial: Initial = new InitialS()
}

class PSSS implements PartialPositionalSound {
    static freeTonal: TonalSS = new TonalSS()
}

class PST implements PartialPositionalSound {
    static initial: Initial = new InitialT()
    static final: Final = new FinalT()
    static checkedTonal: Tonal = new TonalT()
}

class PSU implements PartialPositionalSound {
    static medial: Medial = new MedialU()
}

class PSUR implements PartialPositionalSound {
    static medial: Medial = new MedialUR()
}

class PSV implements PartialPositionalSound {
    static initial: Initial = new InitialV()
}

class PSW implements PartialPositionalSound {
    static freeTonal: TonalW = new TonalW()
}

class PSX implements PartialPositionalSound {
    static freeTonal: FreeTonalX = new FreeTonalX()
    static checkedTonal: CheckedTonalX = new CheckedTonalX()
}

class PSXX implements PartialPositionalSound {
    static freeTonal: TonalXX = new TonalXX()
}

class PSXXX implements PartialPositionalSound {
    static freeTonal: TonalXX = new TonalXXX()
}

class PSY implements PartialPositionalSound {
    static freeTonal: FreeTonalY = new FreeTonalY()
    static checkedTonal: CheckedTonalY = new CheckedTonalY()
}

class PSZ implements PartialPositionalSound {
    static initial: Initial = new InitialZ()
}

class PSZS implements PartialPositionalSound {
    static freeTonal: TonalZS = new TonalZS()
}

class PSZZS implements PartialPositionalSound {
    static freeTonal: TonalZZS = new TonalZZS()
}

class PSZero implements PartialPositionalSound {
    static freeTonal: ZeroTonal = new ZeroTonal()
}


//------------------------------------------------------------------------------
//  Combining Rule
//------------------------------------------------------------------------------

export const combiningRules: Map<string, any> = new Map()
    .set('zero', { zs: PSZS.freeTonal })
    .set('y', { zero: PSZero.freeTonal, ss: PSSS.freeTonal })
    .set('w', { y: PSY.freeTonal })
    .set('x', { zs: PSZS.freeTonal, w: PSW.freeTonal })
    .set('zs', { w: PSW.freeTonal })
    .set('p', { p: PSP.checkedTonal })
    .set('t', { t: PST.checkedTonal })
    .set('k', { k: PSK.checkedTonal })
    .set('h', { h: PSH.checkedTonal, y: PSY.checkedTonal })
    .set('b', { b: PSB.checkedTonal, x: PSX.checkedTonal })
    .set('d', { d: PSD.checkedTonal, x: PSX.checkedTonal })
    .set('g', { g: PSG.checkedTonal, x: PSX.checkedTonal })
    .set('f', { f: PSF.checkedTonal, x: PSX.checkedTonal })

const letterClass: Map<string, PartialPositionalSound> = new Map()
    .set('a', PSA)
    .set('b', PSB)
    .set('c', PSC)
    .set('d', PSD)
    .set('e', PSE)
    .set('f', PSF)
    .set('g', PSG)
    .set('h', PSH)
    .set('i', PSI)
    .set('j', PSJ)
    .set('k', PSK)
    .set('l', PSL)
    .set('m', PSM)
    .set('n', PSN)
    .set('nn', PSNN)
    .set('ng', PSNG)
    .set('o', PSO)
    .set('p', PSP)
    .set('q', PSQ)
    .set('s', PSS)
    .set('ss', PSSS)
    .set('t', PST)
    .set('u', PSU)
    .set('ur', PSUR)
    .set('v', PSV)
    .set('w', PSW)
    .set('x', PSX)
    .set('xx', PSXX)
    .set('xxx', PSXXX)
    .set('y', PSY)
    .set('z', PSZ)
    .set('zs', PSZS)
    .set('zzs', PSZZS)

//------------------------------------------------------------------------------
//  Lexical Root
//------------------------------------------------------------------------------

export class ListOfLexicalRoots {
    list: Array<Sound[]> =  new Array()

    setFirstLetter(beginning: string) {
        let cog = new ClientOfGenerator
        let entries: Array<Sound[]> = cog.generate(beginning)
        for(let i in entries) {
            this.list.push(entries[i])
        }
    }

    toString() {
        let str: string = ''
        for(let k in this.list) {
            for(let i in this.list[k]) {
                str += this.list[k][i].getLiteral()
            }
        }
        return str
    }
}

export class LexicalRootGenerator {
    generate(beginning: string) {
        let strs: string[] = new Array
        for(let i in list_of_lexical_roots) {
            if(list_of_lexical_roots[i].search(beginning) == 0) {
                strs.push(list_of_lexical_roots[i])
            }
        }
        //for(let i in strs) console.info(strs[i])
        return strs
    }
}

export class ClientOfGenerator {
    private turnIntoGraphemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str);
        let graphemes = gm.makeGraphemes();
        return graphemes
    }

    private analyzeAfterNasalFinalsOrNasalSound(ls: string[], sounds: string[], index: number): string[] {
        // base form of checked tone do not have a tonal
        if(this.isFreeTonal(ls[index])) {
            sounds.push(ls[ls.length-1] + '.freeTonal')
        } else if(this.isNeutralFinal(ls[index])) {
            // when a nasal final m, n, or ng is followed by a neutral final h
            sounds.push(ls[ls.length-1] + '.final')
        }

        return sounds
    }

    private analyzeAfterVowels(ls: string[], sounds: string[], index: number): string[] {
        if(this.isFreeTonal(ls[index])) {
            sounds.push(ls[ls.length-1] + '.freeTonal')
        } else if(this.isNasal(ls[index])) {
            sounds.push(ls[index] + '.nasal')
            if(ls.length > sounds.length) {
                sounds = this.analyzeAfterNasalFinalsOrNasalSound(ls, sounds, sounds.length)
            }
        } else if(this.isFinalConsonant(ls[index])) {
            let k = index
            while(k < ls.length) {
                if(this.isFinalConsonant(ls[k])) {
                    sounds.push(ls[k] + '.final')
                }
                k++
            }

            if(ls.length > sounds.length) {
                sounds = this.analyzeAfterNasalFinalsOrNasalSound(ls, sounds, sounds.length)
            }
            
        } 

        return sounds
    }

    private analyzeAfterInitialConsonants(ls: string[], sounds: string[], index: number): string[] {
        if(this.isVowel(ls[index])) {
            let k = index
            while(k < ls.length) {
                if(this.isVowel(ls[k])) {
                    sounds.push(ls[k] + '.medial')
                }
                k++
            }
            
            if(ls.length == sounds.length) {
                // vowels with no tonals
                return sounds
            }

            if(ls.length > sounds.length) {
                sounds = this.analyzeAfterVowels(ls, sounds, sounds.length)
            }
        }

        return sounds
    }

    private isMaterLectionis(str: string) {
        if(str.search(new RegExp(new SetOfMaterLectionis().toString())) == 0) return true

        return false
    }

    private isVowel(str: string) {
        if(str.search(new RegExp(new SetOfMedials().toString())) == 0) return true

        return false
    }

    private isInitialConsonant(str: string) {
        if(str.search(new RegExp(new SetOfInitials().toString())) == 0) return true

        return false
    }

    private isFreeTonal(str: string) {
        if(str.search(new RegExp(new SetOfFreeTonals().toString())) == 0) return true

        return false
    }
    
    private isFinalConsonant(str: string) {
        if(str.search(new RegExp(new SetOfFinals().toString())) == 0) return true

        return false
    }

    private isNasal(str: string) {
        if(str.search(new RegExp(new SetOfNasals().toString())) == 0) return true
        
        return false
    }

    private isStopFinal(str: string) {
        if(str.search(new RegExp(new SetOfStopFinals().toString())) == 0) return true
        
        return false
    }

    private isNeutralFinal(str: string) {
        if(str.search(new RegExp(new SetOfNeutralFinals().toString())) == 0) return true
        
        return false
    }
    
    private makeCombiningForms(entry: string[]) {
        let lastElement = entry[entry.length-1]
        //let tm: string = ''
        let n = lastElement.lastIndexOf('.')
        let key = lastElement.slice(0, n)
        let tos = combiningRules.get(key)
        let ret: Array<string[]> = new Array

        if(lastElement.lastIndexOf('freeTonal') > 0) {
            let e: string[] = []
            for(let k in tos) {
                
                e = []
                e = Object.assign([], entry)
                e.pop()
                if(tos[k].getLiteral() != 0) {
                    // zero-tone-mark for first tone will not be pushed
                    e.push(tos[k].getLiteral() + '.freeTonal')
                }
                //console.log(e + '-')
                // first tone is still pushed to return
                ret.push(e)
            }
        } else {
            let e: string[] = []
            e = Object.assign([], entry)
            e.push(combiningRules.get('zero').zs.getLiteral() + '.freeTonal')
            //console.log(e + '+')
            ret.push(e)
        }
    
        return ret
    }

    private findNew(buffer: Array<string[]>) {
        // find new tones based on the same stem
        let cfs
        for(let i in buffer) {
            cfs = this.makeCombiningForms(buffer[i])
        
            for(let m in cfs) {
                for(let n = 0 ; n < buffer.length; n++) {
                    let entry = buffer[n]
                    if(entry[entry.length-1] === cfs[m][cfs[m].length-1]) {
                        break
                    }
                    if(n == buffer.length-1) {
                        // pushed to fill the slot, block following duplicates
                        // duplicates come from combining rules
                        buffer.push(cfs[m])
                        //console.log(cfs[m] + '*')
                    }
                }
            }
        }
    }

    private convert(entry: string[]) {
        // convert strings in an entry to sounds
        // ex: a.medial -> PSA.medial
        let ret: Array<Sound> = new Array()
        for(let i in entry) {
            let n = entry[i].lastIndexOf('.')
            let clasName = entry[i].slice(0, n)
            let position = entry[i].slice(n+1)
            ret.push(letterClass.get(clasName)[position])
        }
        return ret
    }

    generate(beginning: string) {
        let lrg = new LexicalRootGenerator()
        let strs: Array<string> = lrg.generate(beginning) // retrieve all needed roots beginning with init
        let arrayOfSounds: Array<string[]> = new Array() // collecting all sounds to be processed
        let entries: Array<Sound[]> = new Array() // to be returned

        for(let i in strs) {
            // generates all needed sounds to be processed
            let gs = this.turnIntoGraphemes(strs[i])
            let ls: string[] = []
            for(let j in gs) {
                ls.push(gs[j].letter.literal)
            }
            
            let sounds: string[] = []
            
            if((this.isMaterLectionis(ls[0]) && ls.length == 1) 
                || (ls.length == 2 && this.isMaterLectionis(ls[0]) && this.isFreeTonal(ls[1]))) {
                
                sounds.push(ls[0] + '.medial')
                if(ls.length > sounds.length) {
                    if(this.isFreeTonal(ls[1])) {
                        sounds = this.analyzeAfterNasalFinalsOrNasalSound(ls, sounds, sounds.length)
                    }
                    /* 
                    else if(this.isVowel(ls[1])) {
                        console.log('hit')
                        sounds = this.analyzeAfterInitialConsonants(ls, sounds, sounds.length)
                    }
                    */
                }

                arrayOfSounds.push(sounds)
                continue
            }

            // analyze vowels, which have null initial consonants
            // pass 0 as index to indicate it has null initial consonants
            sounds = this.analyzeAfterInitialConsonants(ls, sounds, 0)

            //let initials: string = ''
            if(this.isInitialConsonant(ls[0])) {
                // analyze initial consonants
                sounds.push(ls[0] + '.initial')
                if(this.isVowel(ls[1])) {
                    // consonants followed by vowels
                    sounds = this.analyzeAfterInitialConsonants(ls, sounds, sounds.length)
                } else if(this.isFinalConsonant(ls[1])) {
                    // consonants followed by consonants. CC
                    // there should be a vowel -ir-
                    sounds = this.analyzeAfterVowels(ls, sounds, sounds.length)
                }
            }

            arrayOfSounds.push(sounds)
        }

        let buffer: Array<string[]> = new Array()
        let currentStem: string[] = []
        let nextStem: string[] = []
        for(let k = 0; k < arrayOfSounds.length; k++) {

            //console.log(arrayOfSounds[k])
            entries.push(this.convert(arrayOfSounds[k]))

            let entry = arrayOfSounds[k]
            let lastElement = entry[entry.length-1]

            if(this.isStopFinal(lastElement)) {
                let lastElement = entry[entry.length-1]
                let n = lastElement.lastIndexOf('.')
                let key = lastElement.slice(0, n)
                let tos = combiningRules.get(key)
        
                let e: string[] = []
                for(let k in tos) {
                    e = []
                    e = Object.assign([], entry)
                    e.push(tos[k].getLiteral() + '.checkedTonal')

                    //console.log(e + '$')
                    entries.push(this.convert(e))
                }
    
                if(k == arrayOfSounds.length-1) {
                    // terminal condition of iterator of arrayofSounds
                    this.findNew(buffer)
                    for(let i in buffer) {
                        entries.push(this.convert(buffer[i]))
                    }
                }
            } else {
                if(lastElement.lastIndexOf('freeTonal') > 0) {
                    nextStem = entry.slice(0, entry.length-1)
                } else {
                    nextStem = entry
                }

                if(nextStem.length != currentStem.length) {
                    // when the stems are not in the same length
                    currentStem = nextStem
                    this.findNew(buffer)
                    for(let i in buffer) {
                        entries.push(this.convert(buffer[i]))
                    }
                    buffer = []
                } else {
                    for(let e in currentStem) {
                        if(currentStem[e] !== nextStem[e]) {
                            // when the stems are not the same
                            currentStem = nextStem
                            this.findNew(buffer)
                            for(let i in buffer) {
                                entries.push(this.convert(buffer[i]))
                            }
                            buffer = []
                            break
                        }
                    }
                }
                buffer.push(entry)
            }
        }

        return entries
    }
}