import bigintToBuf from './bigintToBuf';
import bigInt, { BigInteger } from 'big-integer';

// the "hardware xor" is a 3-byte representation of the device_address.
const hardwareXorFromDeviceAddress = (
  deviceAddress: BigInteger
): BigInteger => {
  const buffer = bigintToBuf(deviceAddress);

  const bits = Array(3).fill(0);
  bits[0] = buffer.readUInt8(0) ^ buffer.readUInt8(5);
  bits[1] = buffer.readUInt8(1) ^ buffer.readUInt8(3) ^ buffer.readUInt8(6);
  bits[2] = buffer.readUInt8(2) ^ buffer.readUInt8(4) ^ buffer.readUInt8(7);

  const result = (bits[2] << 16) | (bits[1] << 8) | bits[0];

  return bigInt(result);
};

export { hardwareXorFromDeviceAddress };
