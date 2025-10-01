import { RootView } from './view';
import { useRootState } from './state';
import {
  handleEmailSetValue,
  handleFormChange,
  handleNameSetValue,
  handleSetValue
} from './controller';
import { ChangeEvent } from 'react';

export const createHandlers = (state: ReturnType<typeof useRootState>) => {
  return {
    name: {
      value: state.name.value,
      onChange(ev: ChangeEvent<HTMLInputElement>) {
        handleNameSetValue(ev, state.name.set);
      }
    },
    email: {
      value: state.email.value,
      onChange(ev: ChangeEvent<HTMLInputElement>) {
        handleEmailSetValue(ev, state.email.set);
      }
    },
    address: {
      value: state.address.value,
      onChange(ev: ChangeEvent<HTMLInputElement>) {
        handleSetValue(ev, state.address.set);
      }
    },
    birthday: {
      value: state.birthday.value,
      onChange(ev: ChangeEvent<HTMLInputElement>) {
        handleSetValue(ev, state.birthday.set);
      }
    },
    form: {
      errorMessage: state.formError.value,
      onChange(ev: ChangeEvent<HTMLFormElement>) {
        handleFormChange(ev, state.formError.set);
      }
    }
  };
};

export const RootPageUsecase = () => {
  const ps = useRootState();
  const handlers = createHandlers(ps);

  return (
    <>
      <RootView
        form={handlers.form}
        email={handlers.email}
        name={handlers.name}
        address={handlers.address}
        birthday={handlers.birthday}
      />
    </>
  );
};
