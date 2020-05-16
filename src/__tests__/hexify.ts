import hexify from '../hexify';

describe('hexify', () => {
  it('adds 0x', () => {
    expect(hexify('deadbeef')).toEqual('0xdeadbeef');
  });

  it('does not double 0x', () => {
    expect(hexify('0xdeadbeef')).toEqual('0xdeadbeef');
  });

  it('throws on bad input', () => {
    expect(() => {
      hexify('');
    }).toThrowError();

    expect(() => {
      // @ts-expect-error
      hexify(null);
    }).toThrowError();

    expect(() => {
      // @ts-expect-error
      hexify(1);
    }).toThrowError();

    expect(() => {
      hexify('xyz');
    }).toThrowError();

    expect(() => {
      hexify('deadbeef\ndeadbeef');
    }).toThrowError();

    expect(() => {
      hexify('0xdeadbeef\n0xdeadbeef');
    }).toThrowError();
  });
});
