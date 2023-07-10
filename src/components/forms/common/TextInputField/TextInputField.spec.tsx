import { fireEvent, render } from '@testing-library/react';
import {
  TextInputField,
  TextInputProps,
} from 'src/components/forms/common/TextInputField/TextInputField';

const setup = (testProps: TextInputProps) => {
  const { container } = render(<TextInputField {...testProps} />);
  const el = container.querySelector('input');
  // テストを強制的にこかすためのThrow
  if (el === null) throw Error('DOM 取得失敗');
  return el;
};

describe('render', () => {
  it('最低限のpropsのみが設定される', () => {
    const actual = setup({
      type: 'text',
      name: 'hoge',
      value: 'piyo',
      onChange: jest.fn,
    });

    expect(actual).toHaveAttribute('type', 'text');
    expect(actual).toHaveAttribute('name', 'hoge');
    expect(actual).toHaveAttribute('value', 'piyo');
    expect(actual).not.toHaveAttribute('tabIndex');
    expect(actual).not.toHaveAttribute('placeholder');
    expect(actual).not.toHaveAttribute('autoComplete');
    expect(actual).not.toHaveAttribute('disabled');
  });

  it('全てのpropsが設定される', () => {
    const actual = setup({
      type: 'email',
      tabIndex: 1,
      name: 'foo',
      placeholder: 'bar',
      value: 'baz',
      autoComplete: 'on',
      disabled: true,
      onChange: jest.fn,
    });

    expect(actual).toHaveAttribute('type', 'email');
    expect(actual).toHaveAttribute('tabIndex', '1');
    expect(actual).toHaveAttribute('name', 'foo');
    expect(actual).toHaveAttribute('placeholder', 'bar');
    expect(actual).toHaveAttribute('value', 'baz');
    expect(actual).toHaveAttribute('autoComplete', 'on');
    expect(actual).toHaveAttribute('disabled');
  });

  it('fire onChange', () => {
    const spiedOnChange = jest.fn();
    const actual = setup({
      type: 'text',
      name: 'hoge',
      value: 'piyo',
      onChange: spiedOnChange,
    });

    fireEvent.change(actual, { target: { value: 'fuga' } });

    expect(spiedOnChange).toBeCalledWith('fuga');
  });

  it('fire onFocus', () => {
    const spiedOnFocus = jest.fn();
    const actual = setup({
      type: 'text',
      name: 'hoge',
      value: 'piyo',
      onChange: () => {},
      onFocus: spiedOnFocus,
    });

    fireEvent.focus(actual);

    expect(spiedOnFocus).toBeCalled();
  });

  it('fire onBlur', () => {
    const spiedOnBlur = jest.fn();
    const actual = setup({
      type: 'text',
      name: 'hoge',
      value: 'piyo',
      onChange: () => {},
      onBlur: spiedOnBlur,
    });

    fireEvent.blur(actual);

    expect(spiedOnBlur).toBeCalled();
  });
});
