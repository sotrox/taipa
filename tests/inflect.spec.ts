import { Client } from '../src/client';
import { TonalSoundTags, TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';
import { TonalInflectionAnalyzer } from '../src/dparser/analyzer';
import { TonalDesinenceInflection, TransfixInflection } from '../src/dparser/lexeme';
import { TonalCombiningForms, ThirdCombiningForm } from '../src/dparser/morpheme';

describe("Inflectional ending testing", () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('gengzchiapf');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('gengzchiap');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual(TonalLetterTags.f);
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][4].toString()).toEqual(TonalLetterTags.f);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[1][4].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflectional ending testing", () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('piauzpietf');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('piauzpiet');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual(TonalLetterTags.f);
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][4].toString()).toEqual(TonalLetterTags.f);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[1][4].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflectional ending testing", () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('tengzsekf');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('tengzsek');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual(TonalLetterTags.f);
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][3].toString()).toEqual(TonalLetterTags.f);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[1][3].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflectional ending testing", () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('sekfhappw');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('sekfhapp');
    });

    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual(TonalLetterTags.w);
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][3].toString()).toEqual(TonalLetterTags.w);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[0][3].name).toEqual(TonalSoundTags.checkedTonal);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[1][3].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflectional ending testing", () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('kakfsittw');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('kakfsitt');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual('w');
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][3].toString()).toEqual(TonalLetterTags.w);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[0][3].name).toEqual(TonalSoundTags.checkedTonal);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[1][3].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflectional ending testing", () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('qeysiokkw');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('qeysiokk');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual('w');
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][4].toString()).toEqual(TonalLetterTags.w);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[1][4].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflection testing", () => {
    const tia = new TonalInflectionAnalyzer();

    const tw = tia.analyze('guzleng', new TonalCombiningForms(), new TonalDesinenceInflection());

    test("check the inflected form", () => {
        expect(tw.otherForms[0].literal).toEqual('guzlengz');
    });
});

describe("Inflection testing", () => {
    const tia = new TonalInflectionAnalyzer();

    const tw = tia.analyze('damwvurhhxoay', new ThirdCombiningForm(), new TransfixInflection());

    test("check the inflected form", () => {
        expect(tw.otherForms[0].literal).toEqual('damwvurhhwoaw');
    });
});

describe("Inflection testing, an empty word", () => {
    const tia = new TonalInflectionAnalyzer();

    const tw1 = tia.analyze('', new TonalCombiningForms(), new TonalDesinenceInflection());

    test("check the word", () => {
        expect(tw1.word.literal).toEqual('');
    });

    test("check the number of inflected forms", () => {
        expect(tw1.otherForms.length).toEqual(0);
    });

    const tw2 = tia.analyze('', new ThirdCombiningForm(), new TransfixInflection());

    test("check the word", () => {
        expect(tw2.word.literal).toEqual('');
    });

    test("check the number of inflected forms", () => {
        expect(tw2.otherForms.length).toEqual(0);
    });
});

describe("Inflection testing, absent lexical roots", () => {
    const tia = new TonalInflectionAnalyzer();

    const tw1 = tia.analyze('s', new TonalCombiningForms(), new TonalDesinenceInflection());

    test("check the word", () => {
        expect(tw1.word.literal).toEqual('');
    });

    test("check the number of inflected forms", () => {
        expect(tw1.otherForms.length).toEqual(0);
    });

    const tw2 = tia.analyze('on', new TonalCombiningForms(), new TonalDesinenceInflection());

    test("check the word", () => {
        expect(tw2.word.literal).toEqual('');
    });

    test("check the number of inflected forms", () => {
        expect(tw2.otherForms.length).toEqual(0);
    });

    const tw3 = tia.analyze('ax', new TonalCombiningForms(), new TonalDesinenceInflection());

    test("check the word", () => {
        expect(tw3.word.literal).toEqual('');
    });

    test("check the number of inflected forms", () => {
        expect(tw3.otherForms.length).toEqual(0);
    });

    const str = 'chimhhw';
    const tw4 = tia.analyze(str, new TonalCombiningForms(), new TonalDesinenceInflection());

    test("check the word", () => {
        expect(tw4.word.literal).toEqual(str);
    });

    test("check the number of inflected forms", () => {
        expect(tw4.otherForms.length).toEqual(0);
    });
});


describe("Inflection testing, absent lexical roots", () => {
    const tia = new TonalInflectionAnalyzer();

    const inputUnd: any = undefined;
    const inputEmpty: any = '';

    const lexeme1 = tia.analyze(inputUnd, new TonalCombiningForms(), new TonalDesinenceInflection());
    
    test("check the word literal", () => {
        expect(lexeme1.word.literal).toEqual('');
    });

    test("check the number of forms", () => {
        expect(lexeme1.otherForms.length).toEqual(0);
    });
    
    const lexeme2 = tia.analyze(inputEmpty, new TonalCombiningForms(), new TonalDesinenceInflection());

    test("check the word literal", () => {
        expect(lexeme2.word.literal).toEqual('');
    });

    test("check the number of forms", () => {
        expect(lexeme2.otherForms.length).toEqual(0);
    });

    const lexeme3 = tia.analyze(inputUnd, new ThirdCombiningForm(), new TransfixInflection());

    test("check the word literal", () => {
        expect(lexeme3.word.literal).toEqual('');
    });

    test("check the number of forms", () => {
        expect(lexeme3.otherForms.length).toEqual(0);
    });


    const lexeme4 = tia.analyze(inputUnd, new ThirdCombiningForm(), new TransfixInflection());

    test("check the word literal", () => {
        expect(lexeme4.word.literal).toEqual('');
    });

    test("check the number of forms", () => {
        expect(lexeme4.otherForms.length).toEqual(0);
    });
});

