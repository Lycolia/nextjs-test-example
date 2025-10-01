import {
  useValueWithError,
  useValue,
} from '../../../hooks/common/use-value';

export const useRootState = () => {
  const name = useValueWithError<string>('');
  const email = useValueWithError<string>('');
  const address = useValueWithError<string>('');
  const birthday = useValueWithError<string>('');
  const formError = useValue<string>('');

  return {
    name,
    email,
    address,
    birthday,
    formError,
  };
};
