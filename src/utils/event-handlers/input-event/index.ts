import { ChangeEvent } from 'react';

export const getTargetValue = (event: ChangeEvent<HTMLInputElement>) => {
  return event.currentTarget.value;
};
