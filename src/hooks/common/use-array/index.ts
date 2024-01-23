import { useState } from 'react';

/**
 * 配列の既定State
 * @param initialArray 初期値, 未指定の場合空配列
 */
export const useArray = <T>(initialArray: T[] = []) => {
  const [array, setArray] = useState(initialArray);

  const push = (...value: T[]) => {
    setArray((prevState) => {
      return prevState.concat(value);
    });
  };

  const replace = (value: T[]) => {
    setArray(() => [...value]);
  };

  const clear = () => {
    setArray([]);
  };

  return {
    /** 配列の状態 */
    items: array,
    /** 配列要素に要素を追加 */
    push,
    /** 配列要素を全置換 */
    replace,
    /** 配列要素のクリア */
    clear,
  };
};
