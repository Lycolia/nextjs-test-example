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

    expect(el.nodeName).toBe('SECTION');
  });

  it('取得したエレメントのDOMが一致している', () => {
    const result = TestRenderer.create(<ExampleCompoent />).toJSON();
    const expectJson = TestRenderer.create(
      <section>
        <h2>ほげほげ</h2>
        <p>ぴよぴよ</p>
      </section>
    ).toJSON();

    if (Array.isArray(result) && result.length > 0) {
      expect(result[0]).toStrictEqual(expectJson);
    }
  });

  it('指定したエレメントが取得できない', () => {
    const { container } = render(<ExampleCompoent />);
    expect(() => TestUtil.getFirstElement(container, 'span')).toThrow();
  });
});
