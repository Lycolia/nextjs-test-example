import { fireEvent, render } from '@testing-library/react';
import { SelectBox } from './SelectBox';

type TestSelectBoxProps = React.ComponentProps<typeof SelectBox>;

const spiedOnChange = jest.fn();
const spiedOnBlur = jest.fn();
const spiedOnFocus = jest.fn();

const testItem: TestSelectBoxProps = {
  name: 'testing-select-box',
  autoComplete: 'bar',
  selectedValue: '2',
  tabIndex: 5,
  optionItems: [
    { text: 'first', value: '1' },
    { text: 'second', value: '2' },
    { text: 'third', value: '3' },
  ],
  onChange: spiedOnChange,
  onBlur: spiedOnBlur,
  onFocus: spiedOnFocus,
};

const setup = (testProps: TestSelectBoxProps) => {
  const { container } = render(<SelectBox {...testProps} />);
  const el = container.querySelector('select');
  if (el === null) throw Error('DOM 取得失敗');
  return el;
};

describe('render', () => {
  it('初期化時DOMに属性が正しく設定される', () => {
    const el = setup(testItem);
    expect(el).toHaveAttribute('name', testItem.name);
    expect(el).toHaveAttribute('tabIndex', `${testItem.tabIndex}`);
    expect(el).toHaveAttribute('autocomplete', testItem.autoComplete);
    expect(el).toHaveValue(testItem.selectedValue);
    expect(el).toHaveTextContent('second');
  });

  // 異常値を設定するためにas unknownし、
  // 型整合性のため as TestSelectBoxPropsしている
  const invalidOptTestItems = [
    {
      name: 'OptionItemsが無効な値の時に空のオプションが一つだけ生成される: undefined',
      props: {
        ...testItem,
        optionItems: undefined,
      } as unknown as TestSelectBoxProps,
    },
    {
      name: 'OptionItemsが無効な値の時に空のオプションが一つだけ生成される: null',
      props: {
        ...testItem,
        optionItems: null,
      } as unknown as TestSelectBoxProps,
    },
    {
      name: 'OptionItemsが無効な値の時に空のオプションが一つだけ生成される: string',
      props: {
        ...testItem,
        optionItems: 'test',
      } as unknown as TestSelectBoxProps,
    },
    {
      name: 'OptionItemsが無効な値の時に空のオプションが一つだけ生成される: number',
      props: {
        ...testItem,
        optionItems: 123,
      } as unknown as TestSelectBoxProps,
    },
    {
      name: 'OptionItemsが無効な値の時に空のオプションが一つだけ生成される: []',
      props: {
        ...testItem,
        optionItems: [],
      } as unknown as TestSelectBoxProps,
    },
    {
      name:
        // eslint-disable-next-line quotes
        "OptionItemsが無効な値の時に空のオプションが一つだけ生成される: [ { text: 'test' } ]",
      props: {
        ...testItem,
        optionItems: [{ text: 'test' }],
      } as unknown as TestSelectBoxProps,
    },
    {
      name:
        // eslint-disable-next-line quotes
        "OptionItemsが無効な値の時に空のオプションが一つだけ生成される: [ { value: 'test' } ]",
      props: {
        ...testItem,
        optionItems: [{ text: 'value' }],
      } as unknown as TestSelectBoxProps,
    },
    {
      name: 'OptionItemsが無効な値の時に空のオプションが一つだけ生成される: {}',
      props: {
        ...testItem,
        optionItems: {},
      } as unknown as TestSelectBoxProps,
    },
  ];

  invalidOptTestItems.forEach((item) => {
    // eslint-disable-next-line jest/valid-title
    it(item.name, () => {
      const el = setup(item.props);

      expect(el.options.length).toBe(1);
      expect(el).toHaveTextContent('');
      expect(el).toHaveValue('');
    });
  });
});

describe('onChange', () => {
  it('イベントがコールされている、引数が渡されている', () => {
    const el = setup(testItem);

    fireEvent.change(el, { target: { text: 'first', value: '1' } });
    expect(testItem.onChange).toBeCalledWith({ text: 'first', value: '1' });
  });

  // stateは親コンポーネントで持つ前提なので、このコンポーネントでは書き変わらない
  // このテストのpropsはstateではなく、単なる直値であるため
  it('props.selectedValueがコンポーネント側で書き換えられていない', () => {
    const el = setup(testItem);

    fireEvent.change(el, { target: { text: 'first', value: '1' } });
    expect(spiedOnChange).toBeCalled();
    expect(el).toHaveValue(testItem.selectedValue);
  });
});

describe('onBlur', () => {
  it('イベントがコールされている', () => {
    const el = setup(testItem);

    fireEvent.blur(el);
    expect(spiedOnBlur).toBeCalled();
  });
});

describe('onFocus', () => {
  it('イベントがコールされている', () => {
    const el = setup(testItem);

    fireEvent.focus(el);
    expect(spiedOnFocus).toBeCalled();
  });
});
