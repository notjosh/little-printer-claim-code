import bigintToBuf from '../bigintToBuf';

describe('bigintToBuf', () => {
  it('works', () => {
    const fixtures = [
      { value: BigInt(0), expected: [0, 0, 0, 0, 0, 0, 0, 0] },
      { value: BigInt(1), expected: [1, 0, 0, 0, 0, 0, 0, 0] },
      { value: BigInt(0xffffffff), expected: [255, 255, 255, 255, 0, 0, 0, 0] },
      {
        value: BigInt('0xffffffffffffffff'),
        expected: [255, 255, 255, 255, 255, 255, 255, 255],
      },
      {
        value: BigInt('0xfffffffffffffff0'),
        expected: [240, 255, 255, 255, 255, 255, 255, 255],
      },
    ];

    for (const fixture of fixtures) {
      expect(bigintToBuf(fixture.value)).toEqual(Buffer.from(fixture.expected));
    }
  });
});
