import TestRenderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { TestUtil } from 'src/utils/TestUtils/TestUtil';

const ExampleCompoent = () => {
  return (
    <>
      <section>
        <h2>ほげほげ</h2>
        <p>ぴよぴよ</p>
      </section>
      <section>
        <h2>ぴよぴよ</h2>
        <p>ふがふが</p>
      </section>
    </>
  );
};

describe('getFirstElement', () => {
  it('指定したエレメントが取得できる', () => {
    const { container } = render(<ExampleCompoent />);
    const el = TestUtil.getFirstElement(container, 'section');

    // section要素の中に文言が入っていることを見ることでDOMツリーが取れている扱いにしている
    expect(el.nodeName).toBe('SECTION');
    expect(el).toHaveTextContent('ほげほげ');
    expect(el).toHaveTextContent('ぴよぴよ');
  });

  it('指定したエレメントが取得できない', () => {
    const { container } = render(<ExampleCompoent />);
    expect(() => TestUtil.getFirstElement(container, 'span')).toThrow();
  });
});
