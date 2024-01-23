import { useState } from 'react';

/**
 * プリミティブ値の既定State
 * プリミティブ値以外に使わないこと
 * @param initialValue 初期値
 */
export const useValue = <ValueType>(initialValue: ValueType) => {
  const [value, set] = useState<typeof initialValue>(initialValue);

  return {
    /** 値 */
    value,
    /** 値設定 */
    set,
  };
};

/**
 * プリミティブ値と、その値に対するエラーメッセージ
 * プリミティブ値以外に使わないこと
 * @param initialValue 初期値
 * @param initialError 初期エラー、なければ空文字
 */
export const useValueWithError = <ValueType>(
  initialValue: ValueType,
  initialError = ''
) => {
  const input = useValue(initialValue);
  const error = useValue(initialError);

  const clearError = () => {
    error.set('');
  };

  return {
    /** 値 */
    value: input.value,
    /** 値設定 */
    set: input.set,
    /** エラーメッセージ */
    error: error.value,
    /** エラーメッセージ設定 */
    setError: error.set,
    /** エラーメッセージクリア */
    clearError,
  };
};
