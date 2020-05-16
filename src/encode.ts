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

const encode = (deviceArgument: bigint, secretArgument: bigint): ClaimCode => {
  const device = deviceArgument & BigInt(0xffffff);
  const secret = secretArgument & BigInt(0xffffffffff);

  const value = device | (secret << BigInt(24));
  const crc = crc16(bigintToBuf(value), 0xffff);

  let cc = BigInt(value) | (BigInt(crc) << BigInt(64));
  let text = '';
  let i = 16;

  while (i > 0) {
    const index = Number(cc & BigInt(0x1f));
    const char = CC_ENCODE_LIST[index];
    text = char + text;
    cc = cc >> BigInt(5);

    // insert `-` every 4 characters
    if (i % 4 == 1 && i != 1) {
      text = '-' + text;
    }

    i -= 1;
  }

  return text;
};

export default encode;
