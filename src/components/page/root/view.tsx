import { ChangeEvent } from 'react';

type RootPageProps = {
  email: {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  name: {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  address: {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  birthday: {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  form: {
    errorMessage: string;
    onChange: (event: ChangeEvent<HTMLFormElement>) => void;
  };
};

export const RootView = (props: RootPageProps) => {
  return (
    <div>
      <p>{props.form.errorMessage}</p>
      <form onChange={props.form.onChange}>
        <div>
          <label>
            メールアドレス
            <input
              type={'text'}
              name="email"
              onChange={props.email.onChange}
              value={props.email.value}
            />
          </label>
        </div>
        <div>
          <label>
            氏名
            <input
              type={'text'}
              name="name"
              onChange={props.name.onChange}
              value={props.name.value}
            />
          </label>
        </div>
        <div>
          <label>
            住所
            <input
              type={'text'}
              name="address"
              onChange={props.address.onChange}
              value={props.address.value}
            />
          </label>
        </div>
        <div>
          <label>
            生年月日
            <input
              type={'date'}
              name="birthday"
              onChange={props.birthday.onChange}
              value={props.birthday.value}
            />
          </label>
        </div>
      </form>
    </div>
  );
};
