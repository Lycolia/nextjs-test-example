import { fireEvent, render, createEvent } from '@testing-library/react';
import { RootView } from '../view';

describe('render', () => {
  it('メールアドレスが設定されているときにメールアドレスだけが入力されている事', () => {
    const propMock = {
      email: {
        value: 'hoge@example.com',
        onChange: jest.fn()
      },
      name: {
        value: '',
        onChange: jest.fn()
      },
      address: {
        value: '',
        onChange: jest.fn()
      },
      birthday: {
        value: '',
        onChange: jest.fn()
      },
      form: {
        errorMessage: '',
        onChange: jest.fn()
      }
    };

    const { container } = render(<RootView {...propMock} />);
    const actual = container.querySelector('form');

    expect(actual).toHaveFormValues({
      email: propMock.email.value,
      name: '',
      address: '',
      birthday: ''
    });
  });

  it('氏名が設定されているときに氏名だけが入力されている事', () => {
    const propMock = {
      email: {
        value: '',
        onChange: jest.fn()
      },
      name: {
        value: '山田太郎',
        onChange: jest.fn()
      },
      address: {
        value: '',
        onChange: jest.fn()
      },
      birthday: {
        value: '',
        onChange: jest.fn()
      },
      form: {
        errorMessage: '',
        onChange: jest.fn()
      }
    };

    const { container } = render(<RootView {...propMock} />);
    const actual = container.querySelector('form');

    expect(actual).toHaveFormValues({
      email: '',
      name: propMock.name.value,
      address: '',
      birthday: ''
    });
  });

  it('住所が設定されているときに住所が入力されている事', () => {
    const propMock = {
      email: {
        value: '',
        onChange: jest.fn()
      },
      name: {
        value: '',
        onChange: jest.fn()
      },
      address: {
        value: '東京都千代田区永田町１丁目７−１',
        onChange: jest.fn()
      },
      birthday: {
        value: '',
        onChange: jest.fn()
      },
      form: {
        errorMessage: '',
        onChange: jest.fn()
      }
    };

    const { container } = render(<RootView {...propMock} />);
    const actual = container.querySelector('form');

    expect(actual).toHaveFormValues({
      email: '',
      name: '',
      address: propMock.address.value,
      birthday: ''
    });
  });

  it('生年月日が設定されているときに生年月日が入力されている事', () => {
    const propMock = {
      email: {
        value: '',
        onChange: jest.fn()
      },
      name: {
        value: '',
        onChange: jest.fn()
      },
      address: {
        value: '',
        onChange: jest.fn()
      },
      birthday: {
        value: '2000-02-03',
        onChange: jest.fn()
      },
      form: {
        errorMessage: '',
        onChange: jest.fn()
      }
    };

    const { container } = render(<RootView {...propMock} />);
    const actual = container.querySelector('form');

    expect(actual).toHaveFormValues({
      email: '',
      name: '',
      address: '',
      birthday: propMock.birthday.value
    });
  });

  it('フォームの値設定が全て空文字の時に、全て空文字になっている事', () => {
    const propMock = {
      email: {
        value: '',
        onChange: jest.fn()
      },
      name: {
        value: '',
        onChange: jest.fn()
      },
      address: {
        value: '',
        onChange: jest.fn()
      },
      birthday: {
        value: '',
        onChange: jest.fn()
      },
      form: {
        errorMessage: '',
        onChange: jest.fn()
      }
    };

    const { container } = render(<RootView {...propMock} />);
    const actual = container.querySelector('form');

    expect(actual).toHaveFormValues({
      email: '',
      name: '',
      address: '',
      birthday: ''
    });
  });

  it('フォームの値設定が全て入力済みの時に、すべて入力されている事', () => {
    const propMock = {
      email: {
        value: 'piyo@example.com',
        onChange: jest.fn()
      },
      name: {
        value: '山田＝太郎',
        onChange: jest.fn()
      },
      address: {
        value: '神奈川県千代田区永田町１丁目７−１',
        onChange: jest.fn()
      },
      birthday: {
        value: '2020-03-01',
        onChange: jest.fn()
      },
      form: {
        errorMessage: '',
        onChange: jest.fn()
      }
    };

    const { container } = render(<RootView {...propMock} />);
    const actual = container.querySelector('form');

    expect(actual).toHaveFormValues({
      email: propMock.email.value,
      name: propMock.name.value,
      address: propMock.address.value,
      birthday: propMock.birthday.value
    });
  });

  it('emailのonChange発火時にイベントコールバックが呼ばれること', () => {
    const handle = jest.fn();
    const propMock = {
      email: {
        value: 'aaa',
        onChange: handle
      },
      name: {
        value: '',
        onChange: jest.fn()
      },
      address: {
        value: '',
        onChange: jest.fn()
      },
      birthday: {
        value: '',
        onChange: jest.fn()
      },
      form: {
        errorMessage: '',
        onChange: jest.fn()
      }
    };

    const { container } = render(<RootView {...propMock} />);

    const element = container.querySelector(
      'label > input[name=email]'
    ) as HTMLInputElement;
    if (element === null) throw new Error('テスト失敗');
    fireEvent(
      element,
      createEvent.change(element, {
        // 値は何でもいいが構造が間違っていると動かない
        target: {
          value: 'bbb'
        }
      })
    );

    // DOMEventを全て渡している前提なので呼ばれることだけを見る
    // イベントが呼ばれた結果何が変わるかはusecaseやcontrollerを見る
    // usecaseは最悪なくても良いと思う（大きなコンポーネントでは作っても良いと思うが、変則的になるので注意が必要
    expect(propMock.email.onChange).toHaveBeenCalled();
  });
});
