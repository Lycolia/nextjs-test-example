export namespace TestUtils {
  /**
   * HTMLElement から elementName に一致する最初のエレメントを取得する
   * 見つからなければ例外をスローしテストを失敗させる
   * @param container render()の戻り値に含まれるcontainer
   * @param elementName
   * @throws elementNameに一致する最初のエレメントが見つからなかった
   */
  export const getFirstElement = <K extends keyof HTMLElementTagNameMap>(
    container: Element,
    elementName: K
  ) => {
    // 取得したtagNameと突合させるため大文字小文字を無視
    const regEx = new RegExp(elementName, 'i');
    const elBuff = container.getElementsByTagName(elementName);
    const firstEl = elBuff.item(0);

    if (firstEl === null || !regEx.test(firstEl.tagName)) {
      throw new Error(`${elementName} is not found`);
    }

    return firstEl;
  };
}
