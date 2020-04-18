import encode from '../encode';
import fixtures from './__data__/devices';

describe('encode', () => {
  describe('fixtures', () => {
    fixtures.forEach((fixture) => {
      it(`encodes 0x${fixture.device.toString(16)}/0x${fixture.secret.toString(
        16
      )}`, () => {
        const result = encode(fixture.device, fixture.secret);

        expect(result).toEqual(fixture.claimCode);
      });
    });
  });

  it('succeeds on values from the real world', () => {
    const deviceAddress = '000d6f000273c164';

    // only the last 24 bits of the device address are used
    const deviceAddressInt = parseInt(deviceAddress, 16) & 0xffffff;

    // secret only known to printer and claim code
    const secret = 0xeb1ba696a0;

    expect(encode(deviceAddressInt, secret)).toEqual('n5ry-p6x6-kth7-7hc4');
  });
});
