import bigInt from 'big-integer';
import { hardwareXorFromDeviceAddress } from '../bitshuffle';

const fixtures = [
  { device: '46dbd1efebe85023', xor: 0x4160f2 },
  { device: 'ba10543ebd7b9d43', xor: 0xff3017 },
  { device: '4b1795e18765dca7', xor: 0xcf4c32 },
];

describe('hardwareXorFromDeviceAddress', () => {
  describe('fixtures', () => {
    fixtures.forEach((fixture) => {
      it(`encodes 0x${fixture.device}}`, () => {
        const result = hardwareXorFromDeviceAddress(bigInt(fixture.device, 16));

        expect(result).toEqual(bigInt(fixture.xor));
      });
    });
  });
});
