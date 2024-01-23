import { act, renderHook } from '@testing-library/react';
import { useArray } from '.';

describe('useArray', () => {
  it('引数がないとき空配列になっていること', () => {
    const { result } = renderHook(() => useArray<string>());
    expect(result.current.items).toStrictEqual([]);
  });
  it('引数があるとき引数の内容が設定されていること', () => {
    const { result } = renderHook(() => useArray(['aaa', 'bbb']));
    expect(result.current.items).toStrictEqual(['aaa', 'bbb']);
  });
});

describe('push', () => {
  it('空配列である時に要素が追加されること', () => {
    const { result } = renderHook(() => useArray<string>());
    act(() => result.current.push('aaaa'));
    expect(result.current.items).toStrictEqual(['aaaa']);
  });
  it('既にある要素に対し要素が追加されること', () => {
    const { result } = renderHook(() => useArray(['aaa', 'bbb']));
    act(() => result.current.push('ccc'));
    expect(result.current.items).toStrictEqual(['aaa', 'bbb', 'ccc']);
  });
  it('既にある要素に対し同じ値の要素が追加されること', () => {
    const { result } = renderHook(() => useArray(['aaa', 'bbb']));
    act(() => result.current.push('bbb'));
    expect(result.current.items).toStrictEqual(['aaa', 'bbb', 'bbb']);
  });
  it('既にある要素に対し配列要素が追加されること', () => {
    const { result } = renderHook(() => useArray(['aaa', 'bbb']));
    act(() => result.current.push(...['ccc', 'ddd']));
    expect(result.current.items).toStrictEqual(['aaa', 'bbb', 'ccc', 'ddd']);
  });
  it('既にある要素に対し同じ値の配列要素が追加されること', () => {
    const { result } = renderHook(() => useArray(['aaa', 'bbb']));
    act(() => result.current.push(...['aaa', 'bbb']));
    expect(result.current.items).toStrictEqual(['aaa', 'bbb', 'aaa', 'bbb']);
  });
  it('追加した内容と別インスタンスになっていること', () => {
    const test = ['aaa', 'bbb'];
    const { result } = renderHook(() => useArray<string>([]));
    act(() => result.current.push(...test));
    expect(result.current.items === test).toBe(false);
  });
});

describe('replace', () => {
  it('空配列である時に要素で置換されること', () => {
    const { result } = renderHook(() => useArray<string>());
    expect(result.current.items).toStrictEqual([]);
    act(() => result.current.replace(['aaaa']));
    expect(result.current.items).toStrictEqual(['aaaa']);
  });
  it('既にある要素に対し要素で置換されること', () => {
    const { result } = renderHook(() => useArray(['aaa', 'bbb']));
    act(() => result.current.replace(['ccc', 'ddd']));
    expect(result.current.items).toStrictEqual(['ccc', 'ddd']);
  });
  it('置換した内容と別インスタンスになっていること', () => {
    const test = ['aaa', 'bbb'];
    const { result } = renderHook(() => useArray<string>([]));
    act(() => result.current.replace(test));
    expect(result.current.items === test).toBe(false);
  });
});

describe('clear', () => {
  it('空配列である時に空配列のままであること', () => {
    const { result } = renderHook(() => useArray<string>());
    expect(result.current.items).toStrictEqual([]);
    act(() => result.current.clear());
    expect(result.current.items).toStrictEqual([]);
  });
  it('要素が既にある時に空配列になること', () => {
    const { result } = renderHook(() => useArray(['aaa', 'bbb']));
    expect(result.current.items).toStrictEqual(['aaa', 'bbb']);
    act(() => result.current.clear());
    expect(result.current.items).toStrictEqual([]);
  });
});
