import bigInt from 'big-integer';
import bigintToBuf from '../bigintToBuf';

const fixtures = [
  { value: bigInt(0), expected: [0, 0, 0, 0, 0, 0, 0, 0] },
  { value: bigInt(1), expected: [1, 0, 0, 0, 0, 0, 0, 0] },
  { value: bigInt(0xffffffff), expected: [255, 255, 255, 255, 0, 0, 0, 0] },
  {
    value: bigInt('ffffffffffffffff', 16),
    expected: [255, 255, 255, 255, 255, 255, 255, 255],
  },
  {
    value: bigInt('fffffffffffffff0', 16),
    expected: [240, 255, 255, 255, 255, 255, 255, 255],
  },
];

describe('bigintToBuf', () => {
  describe('fixtures', () => {
    for (const fixture of fixtures) {
      it(`fixture: 0x${fixture.value.toString(16)}`, () => {
        expect(bigintToBuf(fixture.value)).toEqual(
          Buffer.from(fixture.expected)
        );
      });
    }
  });
});
