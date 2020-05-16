import { hardwareXorFromDeviceAddress } from '../bitshuffle';

const fixtures = [
  { device: '0x46dbd1efebe85023', xor: 0x4160f2 },
  { device: '0xba10543ebd7b9d43', xor: 0xff3017 },
  { device: '0x4b1795e18765dca7', xor: 0xcf4c32 },
];

describe('hardwareXorFromDeviceAddress', () => {
  describe('fixtures', () => {
    fixtures.forEach((fixture) => {
      it(`encodes 0x${fixture.device}}`, () => {
        const result = hardwareXorFromDeviceAddress(BigInt(fixture.device));

        expect(result).toEqual(BigInt(fixture.xor));
      });
    });
  });
});
