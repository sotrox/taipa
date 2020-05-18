import { Client } from '../src/client';

describe('Taiwanese kana testing, a', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('a');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('アア');
  });

  const ta2 = cli.processTonal('ai');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('アイ');
  });

  const ta3 = cli.processTonal('au');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('アウ');
  });

  const ta4 = cli.processTonal('ak');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('アㇰ');
  });

  const ta5 = cli.processTonal('at');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('アッ');
  });

  const ta6 = cli.processTonal('an');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('アヌ');
  });

  const ta7 = cli.processTonal('ap');

  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('アㇷ゚');
  });

  const ta8 = cli.processTonal('am');

  test('kanas', () => {
    expect(ta8.blockSequences[0]).toEqual('アム');
  });

  const ta9 = cli.processTonal('ang');

  test('kanas', () => {
    expect(ta9.blockSequences[0]).toEqual('アン');
  });
});

describe('Taiwanese kana testing, nasalization', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('enn');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('㋓');
  });

  const ta2 = cli.processTonal('ianny');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('㋑ア⎛');
  });

  const ta3 = cli.processTonal('annw');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('㋐⎝');
  });

  const ta4 = cli.processTonal('iunnx');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('㋑ウ⟨');
  });

  const ta5 = cli.processTonal('ainnz');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('㋐イ⎸');
  });
  /*
  const ta6 = cli.processTonal('hiannh');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('㋪ァ');
  });
  */
});

describe('Taiwanese kana testing, i', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('ia');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('イア');
  });

  const ta2 = cli.processTonal('iau');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('イァウ');
  });

  const ta3 = cli.processTonal('iak');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('イァㇰ');
  });

  const ta4 = cli.processTonal('iap');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('イァㇷ゚');
  });

  const ta5 = cli.processTonal('iam');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('イァム');
  });

  const ta6 = cli.processTonal('i');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('イイ');
  });

  const ta7 = cli.processTonal('iu');

  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('イウ');
  });

  const ta8 = cli.processTonal('ek');

  test('kanas', () => {
    expect(ta8.blockSequences[0]).toEqual('イェㇰ');
  });

  const ta9 = cli.processTonal('iet');

  test('kanas', () => {
    expect(ta9.blockSequences[0]).toEqual('イェッ');
  });

  const ta10 = cli.processTonal('ien');

  test('kanas', () => {
    expect(ta10.blockSequences[0]).toEqual('イェヌ');
  });

  const ta11 = cli.processTonal('eng');

  test('kanas', () => {
    expect(ta11.blockSequences[0]).toEqual('イェン');
  });

  const ta12 = cli.processTonal('ionn');

  test('kanas', () => {
    expect(ta12.blockSequences[0]).toEqual('㋑オ');
  });

  const ta13 = cli.processTonal('iok');

  test('kanas', () => {
    expect(ta13.blockSequences[0]).toEqual('イォㇰ');
  });

  const ta14 = cli.processTonal('iong');

  test('kanas', () => {
    expect(ta14.blockSequences[0]).toEqual('イォン');
  });

  const ta15 = cli.processTonal('iur');

  test('kanas', () => {
    expect(ta15.blockSequences[0]).toEqual('イヲ');
  });

  const ta16 = cli.processTonal('it');

  test('kanas', () => {
    expect(ta16.blockSequences[0]).toEqual('イッ');
  });

  const ta17 = cli.processTonal('in');

  test('kanas', () => {
    expect(ta17.blockSequences[0]).toEqual('イヌ');
  });

  const ta18 = cli.processTonal('ip');

  test('kanas', () => {
    expect(ta18.blockSequences[0]).toEqual('イㇷ゚');
  });

  const ta19 = cli.processTonal('im');

  test('kanas', () => {
    expect(ta19.blockSequences[0]).toEqual('イム');
  });
});
