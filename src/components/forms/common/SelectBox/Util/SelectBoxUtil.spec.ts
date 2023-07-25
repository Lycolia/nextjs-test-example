import { SelectBoxUtil } from 'src/components/forms/common/SelectBox/Util/SelectBoxUtil';

describe('insertFirstOption', () => {
  it('先頭に追加アイテムが追加される', () => {
    const optionItems = [
      { text: 'aaa', value: '1' },
      { text: 'bbb', value: '2' },
      { text: 'ccc', value: '3' },
    ];

    const actual = SelectBoxUtil.insertFirstOption(
      optionItems,
      SelectBoxUtil.emptyString
    );

    expect(actual[0]).toStrictEqual(SelectBoxUtil.emptyString);
  });
});
