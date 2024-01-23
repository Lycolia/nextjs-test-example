import { useValue } from '../use-value';

/** 待機状態の管理用 */
export const useAwait = (initialValue: boolean) => {
  const awaited = useValue(initialValue);

  const awaiting = () => {
    awaited.set(true);
  };

  const resume = () => {
    awaited.set(false);
  };

  return {
    /** 待機状態 */
    awaited: awaited.value,
    /** 待機状態にする */
    await: awaiting,
    /** 待機状態を解除する */
    resume,
  };
};
