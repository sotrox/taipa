import { Client } from '../src/client';
import { TonalSpellingTags, TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';
import {
  inflectDesinence,
  inflectTransfix,
  inflectEighthToFirst,
  inflectEighthToSecond,
  inflectEncliticE,
  inflectPhrasalVerbParticle,
  inflectEncliticLe,
  inflectPossesiveEx,
  inflectTo,
} from '../src/dparser/inflector';
import { createTonalInflectionLexeme } from '../src/dparser/creator';
import { FourthToFirstCombining } from '../src/dparser/metaplasm';

describe('Inflectional ending testing', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('gengzchiapf');

  test('check the inflectional stem', () => {
    let l = doc.word.literal;
    let en = doc.inflectionalEnding;
    expect(l.substr(0, l.length - en.length)).toEqual('gengzchiap');
  });

  test('check the inflectional ending', () => {
    expect(doc.inflectionalEnding).toEqual(TonalLetterTags.f);
  });

  test('check the letter of inflectional ending', () => {
    expect(doc.letterSequences[1][4].toString()).toEqual(TonalLetterTags.f);
  });

  test('check the name of checked tonal', () => {
    expect(doc.letterSequences[1][4].name).toEqual(
      TonalSpellingTags.checkedTonal
    );
  });
});

describe('Inflectional ending testing', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('piauzpietf');

  test('check the inflectional stem', () => {
    let l = doc.word.literal;
    let en = doc.inflectionalEnding;
    expect(l.substr(0, l.length - en.length)).toEqual('piauzpiet');
  });

  test('check the inflectional ending', () => {
    expect(doc.inflectionalEnding).toEqual(TonalLetterTags.f);
  });

  test('check the letter of inflectional ending', () => {
    expect(doc.letterSequences[1][4].toString()).toEqual(TonalLetterTags.f);
  });

  test('check the name of checked tonal', () => {
    expect(doc.letterSequences[1][4].name).toEqual(
      TonalSpellingTags.checkedTonal
    );
  });
});

describe('Inflectional ending testing', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('tengzsekf');

  test('check the inflectional stem', () => {
    let l = doc.word.literal;
    let en = doc.inflectionalEnding;
    expect(l.substr(0, l.length - en.length)).toEqual('tengzsek');
  });

  test('check the inflectional ending', () => {
    expect(doc.inflectionalEnding).toEqual(TonalLetterTags.f);
  });

  test('check the letter of inflectional ending', () => {
    expect(doc.letterSequences[1][3].toString()).toEqual(TonalLetterTags.f);
  });

  test('check the name of checked tonal', () => {
    expect(doc.letterSequences[1][3].name).toEqual(
      TonalSpellingTags.checkedTonal
    );
  });
});

describe('Inflectional ending testing', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('sekfhapw');

  test('check the inflectional stem', () => {
    let l = doc.word.literal;
    let en = doc.inflectionalEnding;
    expect(l.substr(0, l.length - en.length)).toEqual('sekfhap');
  });

  test('check the inflectional ending', () => {
    expect(doc.inflectionalEnding).toEqual(TonalLetterTags.w);
  });

  test('check the letter of inflectional ending', () => {
    expect(doc.letterSequences[1][3].toString()).toEqual(TonalLetterTags.w);
  });

  test('check the name of checked tonal', () => {
    expect(doc.letterSequences[0][3].name).toEqual(
      TonalSpellingTags.checkedTonal
    );
  });

  test('check the name of checked tonal', () => {
    expect(doc.letterSequences[1][3].name).toEqual(
      TonalSpellingTags.checkedTonal
    );
  });
});

describe('Inflectional ending testing', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('kakfsitw');

  test('check the inflectional stem', () => {
    let l = doc.word.literal;
    let en = doc.inflectionalEnding;
    expect(l.substr(0, l.length - en.length)).toEqual('kakfsit');
  });

  test('check the inflectional ending', () => {
    expect(doc.inflectionalEnding).toEqual('w');
  });

  test('check the letter of inflectional ending', () => {
    expect(doc.letterSequences[1][3].toString()).toEqual(TonalLetterTags.w);
  });

  test('check the name of checked tonal', () => {
    expect(doc.letterSequences[0][3].name).toEqual(
      TonalSpellingTags.checkedTonal
    );
  });

  test('check the name of checked tonal', () => {
    expect(doc.letterSequences[1][3].name).toEqual(
      TonalSpellingTags.checkedTonal
    );
  });
});

describe('Inflectional ending testing', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('qeysiokw');

  test('check the inflectional stem', () => {
    let l = doc.word.literal;
    let en = doc.inflectionalEnding;
    expect(l.substr(0, l.length - en.length)).toEqual('qeysiok');
  });

  test('check the inflectional ending', () => {
    expect(doc.inflectionalEnding).toEqual('w');
  });

  test('check the letter of inflectional ending', () => {
    expect(doc.letterSequences[1][4].toString()).toEqual(TonalLetterTags.w);
  });

  test('check the name of checked tonal', () => {
    expect(doc.letterSequences[1][4].name).toEqual(
      TonalSpellingTags.checkedTonal
    );
  });
});

describe('Inflection testing', () => {
  const tw = inflectDesinence('guzleng');

  test('check the inflected form', () => {
    expect(tw.getForms()[0].literal).toEqual('guzlengz');
  });
});

describe('Inflection testing', () => {
  const tw = inflectTransfix('damwvurhxoay');

  test('check the inflected form', () => {
    expect(tw.getForms()[0].literal).toEqual('damwvurhwoaw');
  });
});

describe('Inflection testing, absent lexical roots', () => {
  const tw1 = inflectDesinence('s');

  test('check the word', () => {
    expect(tw1.word.literal).toEqual('');
  });

  test('check the number of inflected forms', () => {
    expect(tw1.getForms().length).toEqual(0);
  });

  const tw2 = inflectDesinence('on');

  test('check the word', () => {
    expect(tw2.word.literal).toEqual('');
  });

  test('check the number of inflected forms', () => {
    expect(tw2.getForms().length).toEqual(0);
  });

  const tw3 = inflectDesinence('ax');

  test('check the word', () => {
    // it used to be an empty string
    // ax is now asserted after tone sandhi of ay is incorporated
    expect(tw3.word.literal).toEqual('ax');
  });

  test('check the number of inflected forms', () => {
    // it used to be 0
    // 2 is now asserted after tone sandhi of ay is incorporated
    expect(tw3.getForms().length).toEqual(2);
  });

  const str = 'chimhw';
  const tw4 = inflectDesinence(str);

  test('check the word', () => {
    expect(tw4.word.literal).toEqual(str);
  });

  test('check the number of inflected forms', () => {
    expect(tw4.getForms().length).toEqual(0);
  });
});

describe('Inflection testing, with x in the middle of a stem', () => {
  const lx = inflectDesinence('curxurz');

  test('check the base form', () => {
    expect(lx.word.literal).toEqual('');
  });

  test('check the inflected form', () => {
    expect(lx.getForms().length).toEqual(0);
  });
});

describe('Inflection testing', () => {
  const lx1 = inflectDesinence('siax');

  test('check the inflected form', () => {
    expect(lx1.getForms()[0].literal).toEqual('siaz');
  });

  test('check the inflected form', () => {
    expect(lx1.getForms()[1].literal).toEqual('siaw');
  });
});

describe('Inflection testing', () => {
  const lx1 = inflectDesinence('giapp');

  test('check the inflected form', () => {
    expect(lx1.getForms()[0].literal).toEqual('giapw');
  });

  test('check the inflected form', () => {
    expect(lx1.getForms()[1].literal).toEqual('giapx');
  });
});

describe('Inflection testing', () => {
  const lx1 = inflectDesinence('catx');

  test('check the length of inflected forms', () => {
    expect(lx1.getForms().length).toEqual(0);
  });

  test('check the inflectional ending', () => {
    expect(lx1.getInflectionalEnding()).toEqual('x');
  });
});

describe('Inflection testing', () => {
  const lx1 = inflectDesinence('ekw');

  test('check the length of inflected forms', () => {
    expect(lx1.getForms().length).toEqual(0);
  });

  test('check the inflectional ending', () => {
    expect(lx1.getInflectionalEnding()).toEqual('w');
  });
});

describe('Inflection testing', () => {
  const lx1 = inflectDesinence('dok');

  test('check the inflected form', () => {
    expect(lx1.getForms()[0].literal).toEqual('dokf');
  });
});

describe('Inflection testing', () => {
  const lx1 = inflectDesinence('qurh');

  test('check the inflected form', () => {
    expect(lx1.getForms()[0].literal).toEqual('qurhy');
  });

  test('check the inflected form', () => {
    expect(lx1.getForms()[1].literal).toEqual('qurhf');
  });
});

describe('Inflection testing', () => {
  const lx1 = inflectTransfix('chitwvoexiay');

  test('check the inflected form', () => {
    expect(lx1.getForms()[0].literal).toEqual('chitwvoewiaw');
  });
});

describe('Inflection testing', () => {
  const lx1 = inflectTransfix('damwvurhxoay');

  test('check the inflected form', () => {
    expect(lx1.getForms()[0].literal).toEqual('damwvurhwoaw');
  });
});

describe('Inflection testing', () => {
  const lx1 = createTonalInflectionLexeme('qurh', new FourthToFirstCombining());

  test('check the inflected form', () => {
    expect(lx1.getForms()[0].literal).toEqual('qurhf');
  });
});

describe('Tonal testing, inflection', () => {
  const wrd1 = 'siauzbiett';

  const lx1 = inflectEighthToFirst(wrd1);

  test('check the base form', () => {
    expect(lx1.word.literal).toEqual(wrd1);
  });

  test('check the inflected form', () => {
    expect(lx1.getForms()[0].literal).toEqual('siauzbietf');
  });

  const wrd2 = 'urhh';

  const lx2 = inflectEighthToSecond(wrd2);

  test('check the base form', () => {
    expect(lx2.word.literal).toEqual(wrd2);
  });

  test('check the inflected form', () => {
    expect(lx2.getForms()[0].literal).toEqual('urhy');
  });
});

describe('Inflection testing, empty inputs', () => {
  const inputEmpty: any = '';

  const lx1 = inflectEighthToFirst(inputEmpty);

  test('check the word literal', () => {
    expect(lx1.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx1.getForms().length).toEqual(0);
  });

  const lx2 = inflectEighthToSecond(inputEmpty);

  test('check the word literal', () => {
    expect(lx2.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx2.getForms().length).toEqual(0);
  });
});

describe('Inflection testing, undefined inputs', () => {
  const inputUnd: any = undefined;

  const lx1 = inflectEighthToFirst(inputUnd);

  test('check the word literal', () => {
    expect(lx1.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx1.getForms().length).toEqual(0);
  });

  const lx2 = inflectEighthToSecond(inputUnd);

  test('check the word literal', () => {
    expect(lx2.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx2.getForms().length).toEqual(0);
  });
});

describe('Inflection testing, empty inputs', () => {
  const inputEmpty: any = '';

  const lx1 = inflectDesinence(inputEmpty);

  test('check the word literal', () => {
    expect(lx1.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx1.getForms().length).toEqual(0);
  });

  const lx2 = inflectTransfix(inputEmpty);

  test('check the word literal', () => {
    expect(lx2.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx2.getForms().length).toEqual(0);
  });

  const lx3 = inflectEncliticE(inputEmpty);

  test('check the word literal', () => {
    expect(lx3.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx3.getForms().length).toEqual(0);
  });

  const lx4 = inflectPhrasalVerbParticle(inputEmpty, TonalLetterTags.zero);

  test('check the word literal', () => {
    expect(lx4.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx4.getForms().length).toEqual(0);
  });

  const lx5 = inflectEncliticLe(inputEmpty);

  test('check the word literal', () => {
    expect(lx5.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx5.getForms().length).toEqual(0);
  });

  const lx6 = inflectPossesiveEx(inputEmpty);

  test('check the word literal', () => {
    expect(lx6.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx6.getForms().length).toEqual(0);
  });

  const lx7 = inflectTo(inputEmpty, inputEmpty);

  test('check the word literal', () => {
    expect(lx7.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx7.getForms().length).toEqual(0);
  });
});

describe('Inflection testing, undefined inputs', () => {
  const inputUnd: any = undefined;

  const lx1 = inflectDesinence(inputUnd);

  test('check the word literal', () => {
    expect(lx1.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx1.getForms().length).toEqual(0);
  });

  const lx2 = inflectTransfix(inputUnd);

  test('check the word literal', () => {
    expect(lx2.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx2.getForms().length).toEqual(0);
  });

  const lx3 = inflectEncliticE(inputUnd);

  test('check the word literal', () => {
    expect(lx3.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx3.getForms().length).toEqual(0);
  });

  const lx4 = inflectPhrasalVerbParticle(inputUnd, TonalLetterTags.zero);

  test('check the word literal', () => {
    expect(lx4.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx4.getForms().length).toEqual(0);
  });

  const lx5 = inflectEncliticLe(inputUnd);

  test('check the word literal', () => {
    expect(lx5.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx5.getForms().length).toEqual(0);
  });

  const lx6 = inflectPossesiveEx(inputUnd);

  test('check the word literal', () => {
    expect(lx6.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx6.getForms().length).toEqual(0);
  });

  const lx7 = inflectTo(inputUnd, inputUnd);

  test('check the word literal', () => {
    expect(lx7.word.literal).toEqual('');
  });

  test('check the number of forms', () => {
    expect(lx7.getForms().length).toEqual(0);
  });
});
