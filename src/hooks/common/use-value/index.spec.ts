import { act, renderHook } from '@testing-library/react';
import { useValue, useValueWithError } from '.';

describe('useValue', () => {
  it('初期値が設定されている場合、その値が設定されていること', () => {
    const { result } = renderHook(() => useValue('aaa'));
    expect(result.current.value).toBe('aaa');
  });
});

describe('useValue::set', () => {
  it('値を設定した時に、その値で更新されること', () => {
    const { result } = renderHook(() => useValue('aaa'));
    expect(result.current.value).toBe('aaa');
    act(() => result.current.set('bbb'));
    expect(result.current.value).toBe('bbb');
  });
});

describe('useValueWithError', () => {
  it('初期値が設定されている場合、その値が設定されていること、エラーは空文字であること', () => {
    const { result } = renderHook(() => useValueWithError<string>('aaa'));
    expect(result.current.value).toBe('aaa');
    expect(result.current.error).toBe('');
  });
  it('初期値とエラーが設定されている場合、その値が設定されていること', () => {
    const { result } = renderHook(() =>
      useValueWithError<string>('aaa', 'err')
    );
    expect(result.current.value).toBe('aaa');
    expect(result.current.error).toBe('err');
  });
});

describe('useValueWithError::set', () => {
  it('設定値で値が更新されること', () => {
    const { result } = renderHook(() => useValueWithError<string>('aaa'));
    expect(result.current.value).toBe('aaa');
    expect(result.current.error).toBe('');
    act(() => result.current.set('bbb'));
    expect(result.current.value).toBe('bbb');
    expect(result.current.error).toBe('');
  });
});

describe('useValueWithError::setError', () => {
  it('エラー未設定の時に設定値でエラーメッセージが更新されること', () => {
    const { result } = renderHook(() => useValueWithError<string>('aaa'));
    expect(result.current.value).toBe('aaa');
    expect(result.current.error).toBe('');
    act(() => result.current.setError('err'));
    expect(result.current.value).toBe('aaa');
    expect(result.current.error).toBe('err');
  });
  it('エラー設定済みの時に設定値でエラーメッセージが更新されること', () => {
    const { result } = renderHook(() =>
      useValueWithError<string>('aaa', 'bbb')
    );
    expect(result.current.value).toBe('aaa');
    expect(result.current.error).toBe('bbb');
    act(() => result.current.setError('err'));
    expect(result.current.value).toBe('aaa');
    expect(result.current.error).toBe('err');
  });
});

describe('useValueWithError::clearError', () => {
  it('エラー未設定の時にエラーメッセージが空文字のままであること', () => {
    const { result } = renderHook(() => useValueWithError<string>('aaa'));
    expect(result.current.value).toBe('aaa');
    expect(result.current.error).toBe('');
    act(() => result.current.clearError());
    expect(result.current.value).toBe('aaa');
    expect(result.current.error).toBe('');
  });
  it('エラー設定済みの時に空文字になること', () => {
    const { result } = renderHook(() =>
      useValueWithError<string>('aaa', 'bbb')
    );
    expect(result.current.value).toBe('aaa');
    expect(result.current.error).toBe('bbb');
    act(() => result.current.clearError());
    expect(result.current.value).toBe('aaa');
    expect(result.current.error).toBe('');
  });
});
