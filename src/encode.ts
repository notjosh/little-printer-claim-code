import bigInt, { BigInteger } from 'big-integer';

import crc16 from './crc16';

import { ClaimCode } from '.';
import bigintToBuf from './bigintToBuf';

const CC_ENCODE_LIST = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'j',
  'k',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const encode = (
  deviceArgument: BigInteger,
  secretArgument: BigInteger
): ClaimCode => {
  const device = deviceArgument.and(bigInt(0xffffff));
  const secret = secretArgument.and(bigInt(0xffffffffff));

  const value = device.or(secret.shiftLeft(bigInt(24)));
  const crc = crc16(bigintToBuf(value), 0xffff);

  let cc = bigInt(value).or(bigInt(crc).shiftLeft(bigInt(64)));
  let text = '';
  let i = 16;

  while (i > 0) {
    const index = Number(cc.and(bigInt(0x1f)));
    const char = CC_ENCODE_LIST[index];
    text = char + text;
    cc = cc.shiftRight(bigInt(5));

    // insert `-` every 4 characters
    if (i % 4 == 1 && i != 1) {
      text = '-' + text;
    }

    i -= 1;
  }

  return text;
};

export default encode;
