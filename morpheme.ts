import { Lexicon, lexicon } from './lexicon';

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class Regex {
    public static readonly stemRegex = /ji|si|su|tia/g;
    public static readonly boundMorphemeRegex = 
        /ss|y|w|pp?|tt?|kk?|hh?|x|fx|bx|dx|qx|zzs|zs|bb?|dd?|qq?|ff?|xx/g;
}

//------------------------------------------------------------------------------
//  IMorpheme
//------------------------------------------------------------------------------

interface IMorpheme {
    literal: string;
}

//------------------------------------------------------------------------------
//  Sub-Expressions
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Morpheme
//------------------------------------------------------------------------------

interface IMorpheme {
    literal: string;
}

class Morpheme implements IMorpheme {
    next: Morpheme;
    literal: string;
}

export class ToneSandhiAffix extends Morpheme {
    private object: any;
    funktion: Function;

    getObject() {return this.object;}
}

class ToneSandhiPrefix extends ToneSandhiAffix {
    stem: string;
    interfix: string;
}

class ToneSandhiInterfix extends ToneSandhiAffix {
    stem: string;
    interfix: string;
}

class ToneSandhiSuffix extends ToneSandhiAffix {
    stem: string;
    suffix: string;
}

//------------------------------------------------------------------------------
//  ToneSandhiMorphemeAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiMorphemeAnalyzer {
    stems: Array<string>;
    boundMorphemes: Array<string>;
    affixes: Array<ToneSandhiAffix>;

    constructor(l: string) {
        // inject the lexicon
        this.stems = l.match(Regex.stemRegex);
        console.log("stems:" + this.stems);
        this.boundMorphemes = l.match(Regex.boundMorphemeRegex);
        // initialize the affix array
        this.affixes = new Array();
    }

    analyze() {
        if(this.stems && this.boundMorphemes) {
            console.log("analyzing stems and boundMorphemes");
            if(this.stems.length == this.boundMorphemes.length) {
                let len = this.stems.length;
                console.log("analyzing affixes, length of stems: %d", this.stems.length);
                for(let i = 0; i < len; i++) {
                    if(i == 0) {
                        // prefix
                        let p = new ToneSandhiPrefix();
                        p.stem = this.stems.shift();
                        p.interfix = this.boundMorphemes.shift();
                        if(this.found(p.stem + p.interfix)) {
                            this.affixes.push(p);
                        }
                    } else if(i + 1 < len) {
                        //interfix
                        let i = new ToneSandhiInterfix();
                        i.stem = this.stems.shift();
                        i.interfix = this.boundMorphemes.shift();
                        if(this.found(i.stem + i.interfix)) {
                            this.affixes.push(i);
                        }
                    } else {
                        // suffix
                        let s = new ToneSandhiSuffix();
                        s.stem = this.stems.shift();
                        s.suffix = this.boundMorphemes.shift();
                        if(this.found(s.stem + s.suffix)) {
                            this.affixes.push(s);
                        }
                    }
                }
            }
        }

        return this.affixes;
    }

    found(l: string) {
        if(lexicon.found(l)) {
            return true;
        }
        return false;
    }
}
  