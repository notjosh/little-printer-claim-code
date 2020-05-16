import unpack from '../unpack';
import fixtures from './__data__/devices';

describe('unpack', () => {
  describe('fixtures', () => {
    fixtures.forEach((fixture) => {
      it(`unpacks claim code: '${fixture.claimCode}'`, () => {
        const result = unpack(fixture.claimCode);

        expect(result.deviceXor).toEqual(BigInt(fixture.deviceXor));
        expect(result.secret).toEqual(BigInt(fixture.secret));
      });
    });
  });

  it('ignores case', () => {
    const key1 = 'xxxx-bbbb-cccc-dddd';
    const key2 = 'XXXX-BBBB-CCCC-DDDD';

    expect(unpack(key1)).toEqual(unpack(key2));
  });

  it('should fail on invalid code length', () => {
    const keys = ['', '123456789012345', '12345678901234567'];

    keys.forEach((key) => {
      expect(() => {
        unpack(key);
      }).toThrow();
    });
  });

  it('should fail on invalid code characters', () => {
    const keys = ['123456789012345A', '123456789012345%'];

    keys.forEach((key) => {
      expect(() => {
        unpack(key);
      }).toThrow();
    });
  });
});
