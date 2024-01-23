import { YmdUtil } from 'src/components/forms/specifiedes/YmdSelector/Util/YmdUtil';

describe('createYearOptions', () => {
  it('引数が全てない場合の最大・最小年', () => {
    const actual = YmdUtil.createYearOptions();

    const maxYear = new Date().getFullYear().toString();

    expect(actual[0].text).toBe(maxYear);

    const maxIdx = actual.length - 1;
    expect(actual[maxIdx].text).toBe('1914');
  });

  it('最大年引数がない場合の最大・最小年', () => {
    const actual = YmdUtil.createYearOptions('2000');

    const maxYear = new Date().getFullYear().toString();

    expect(actual[0].text).toBe(maxYear);

    const maxIdx = actual.length - 1;
    expect(actual[maxIdx].text).toBe('2000');
  });

  it('引数が全てある場合の最大・最小年', () => {
    const actual = YmdUtil.createYearOptions('2000', '2010');

    expect(actual[0].text).toBe('2010');

    const maxIdx = actual.length - 1;
    expect(actual[maxIdx].text).toBe('2000');
  });
});

describe('createMonthOptions', () => {
  it('1-12月が生成される', () => {
    const expected = [
      { text: '01', value: '1' },
      { text: '02', value: '2' },
      { text: '03', value: '3' },
      { text: '04', value: '4' },
      { text: '05', value: '5' },
      { text: '06', value: '6' },
      { text: '07', value: '7' },
      { text: '08', value: '8' },
      { text: '09', value: '9' },
      { text: '10', value: '10' },
      { text: '11', value: '11' },
      { text: '12', value: '12' },
    ];
    const actual = YmdUtil.createMonthOptions();

    expect(actual).toStrictEqual(expected);
  });
});

describe('createDayOptions', () => {
  it('平常年におけるその月の日が全て出ること', () => {
    const expected = [
      {
        text: '01',
        value: '1',
      },
      {
        text: '02',
        value: '2',
      },
      {
        text: '03',
        value: '3',
      },
      {
        text: '04',
        value: '4',
      },
      {
        text: '05',
        value: '5',
      },
      {
        text: '06',
        value: '6',
      },
      {
        text: '07',
        value: '7',
      },
      {
        text: '08',
        value: '8',
      },
      {
        text: '09',
        value: '9',
      },
      {
        text: '10',
        value: '10',
      },
      {
        text: '11',
        value: '11',
      },
      {
        text: '12',
        value: '12',
      },
      {
        text: '13',
        value: '13',
      },
      {
        text: '14',
        value: '14',
      },
      {
        text: '15',
        value: '15',
      },
      {
        text: '16',
        value: '16',
      },
      {
        text: '17',
        value: '17',
      },
      {
        text: '18',
        value: '18',
      },
      {
        text: '19',
        value: '19',
      },
      {
        text: '20',
        value: '20',
      },
      {
        text: '21',
        value: '21',
      },
      {
        text: '22',
        value: '22',
      },
      {
        text: '23',
        value: '23',
      },
      {
        text: '24',
        value: '24',
      },
      {
        text: '25',
        value: '25',
      },
      {
        text: '26',
        value: '26',
      },
      {
        text: '27',
        value: '27',
      },
      {
        text: '28',
        value: '28',
      },
      {
        text: '29',
        value: '29',
      },
      {
        text: '30',
        value: '30',
      },
      {
        text: '31',
        value: '31',
      },
    ];
    const actual = YmdUtil.createDayOptions(2023, 1);

    expect(actual).toStrictEqual(expected);
  });

  it('平常年における各月の最終日', () => {
    const testItems = [
      {
        month: 1,
        expected: {
          text: '31',
          value: '31',
        },
      },
      {
        month: 2,
        expected: {
          text: '28',
          value: '28',
        },
      },
      {
        month: 3,
        expected: {
          text: '31',
          value: '31',
        },
      },
      {
        month: 4,
        expected: {
          text: '30',
          value: '30',
        },
      },
      {
        month: 5,
        expected: {
          text: '31',
          value: '31',
        },
      },
      {
        month: 6,
        expected: {
          text: '30',
          value: '30',
        },
      },
      {
        month: 7,
        expected: {
          text: '31',
          value: '31',
        },
      },
      {
        month: 8,
        expected: {
          text: '31',
          value: '31',
        },
      },
      {
        month: 9,
        expected: {
          text: '30',
          value: '30',
        },
      },
      {
        month: 10,
        expected: {
          text: '31',
          value: '31',
        },
      },
      {
        month: 11,
        expected: {
          text: '30',
          value: '30',
        },
      },
      {
        month: 12,
        expected: {
          text: '31',
          value: '31',
        },
      },
    ];

    testItems.forEach((item) => {
      const actual = YmdUtil.createDayOptions(2023, item.month);
      expect(actual.at(-1)).toStrictEqual(item.expected);
    });
  });

  it('閏年における2月の最終日', () => {
    const actual = YmdUtil.createDayOptions(2024, 2);

    expect(actual.at(-1)).toStrictEqual({
      text: '29',
      value: '29',
    });
  });
});
