import bigInt from 'big-integer';

import encode from '../encode';
import { hardwareXorFromDeviceAddress } from '../bitshuffle';
import fixtures from './__data__/devices';

describe('encode', () => {
  describe('fixtures', () => {
    fixtures.forEach((fixture) => {
      it(`encodes 0x${fixture.deviceXor.toString(
        16
      )}/0x${fixture.secret.toString(16)}`, () => {
        const result = encode(
          bigInt(fixture.deviceXor),
          bigInt(fixture.secret)
        );

        expect(result).toEqual(fixture.claimCode);
      });
    });
  });

  describe('real world', () => {
    // sample from sirius. note, this uses the xor, not the address
    it('000d6f000273c164 / 0xeb1ba696a0 -> n5ry-p6x6-kth7-7hc4', () => {
      const xor = bigInt('000d6f000273c164', 16);
      const secret = bigInt('eb1ba696a0', 16);

      expect(encode(xor, secret)).toEqual('n5ry-p6x6-kth7-7hc4');
    });

    // existing printer
    it('11cc0f6aaeb07dad / 0x0375898b6e -> jwm0-6xd9-jeqd-p7x2', () => {
      const deviceAddress = bigInt('11cc0f6aaeb07dad', 16);
      const xor = hardwareXorFromDeviceAddress(deviceAddress);
      const secret = bigInt('0375898b6e', 16);

      expect(encode(xor, secret)).toEqual('jwm0-6xd9-jeqd-p7x2');
    });

    // newly generated from sirius, just for this test
    it('sirius: 7fb391d95451aa97 / 0x2e9133ec35 -> 9462-x49m-xhtz-fm86', () => {
      const deviceAddress = bigInt('7fb391d95451aa97', 16);
      const xor = hardwareXorFromDeviceAddress(deviceAddress);
      const secret = bigInt('2e9133ec35', 16);

      expect(encode(xor, secret)).toEqual('9462-x49m-xhtz-fm86');
    });

    // also newly generated from sirius, just for this test
    it('sirius: 46dbd1efebe85023 (known xor: 0x4160f2) / 0xbd38b46918 -> 3ddc-tf5n-e4d4-2r7k', () => {
      const deviceAddress = bigInt('46dbd1efebe85023', 16);
      const xor = hardwareXorFromDeviceAddress(deviceAddress);
      const secret = bigInt('bd38b46918', 16);

      expect(xor).toEqual(bigInt('4160f2', 16));
      expect(encode(xor, secret)).toEqual('3ddc-tf5n-e4d4-2r7k');
    });

    // generated by us, in /bin/generate-printer.sh
    it('sirius: bcd4fef9a78fc29f / 0x155f1e57ec -> 34t1-bqry-bzpd-odc1', () => {
      const deviceAddress = bigInt('bcd4fef9a78fc29f', 16);
      const xor = hardwareXorFromDeviceAddress(deviceAddress);
      const secret = bigInt('155f1e57ec', 16);

      expect(encode(xor, secret)).toEqual('34t1-bqry-bzpd-odc1');
    });
  });
});
