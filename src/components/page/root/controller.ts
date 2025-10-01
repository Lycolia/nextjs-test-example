import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { getTargetValue } from '../../../utils/event-handlers/input-event';

// type FormProps = {
//   email: string;
//   name: string;
//   address: string;
//   birthday: string;
//   setErrorMessage: (value: string) => void;
// };

export const handleSetValue = (
  event: ChangeEvent<HTMLInputElement>,
  setValue: (value: string) => void
) => {
  const value = getTargetValue(event);
  setValue(value);
};

export const handleFormChange = (
  event: ChangeEvent<HTMLFormElement>,
  setErrorMessage: (value: string) => void
) => {
  const target = event.currentTarget as typeof event.target & {
    name: { value: string };
    email: { value: string };
    address: { value: string };
    birthday: { value: string };
  };

  if (
    target.email.value === '' &&
    target.name.value === '' &&
    target.address.value === '' &&
    target.birthday.value === ''
  ) {
    setErrorMessage('全て未入力です。');
  } else {
    setErrorMessage('');
  }
};

export const handleNameSetValue = (
  event: ChangeEvent<HTMLInputElement>,
  setValue: Dispatch<SetStateAction<string>>
) => {
  const value = getTargetValue(event);
  setValue(value);
};

export const handleEmailSetValue = (
  event: ChangeEvent<HTMLInputElement>,
  setValue: Dispatch<SetStateAction<string>>
) => {
  const value = getTargetValue(event);
  setValue(value);
};
