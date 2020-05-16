import bigInt from 'big-integer';

import { ClaimCode, UnpackResult } from '.';

// This dictionary maps base32 digits to five-bit values.
//
// Letter 'A' is omitted and not valid in a claim code.
// Letter 'I' is mapped to number '1' (i.e. claim code is '1', user enters 'I' by mistake).
// Letter 'L' is mapped to number '1' (i.e. claim code is '1', user enters 'L' by mistake).

// Letter 'U' is mapped to letter 'v' (i.e. claim code is 'V', user enters 'U' by mistake).
const CLAIMCODE_BASE32_DICT: { [id: string]: number } = {
  '0': 0x00,
  '1': 0x01,
  '2': 0x02,
  '3': 0x03,
  '4': 0x04,
  '5': 0x05,
  '6': 0x06,
  '7': 0x07,
  '8': 0x08,
  '9': 0x09,
  // 'A': omitted
  B: 0x0a,
  C: 0x0b,
  D: 0x0c,
  E: 0x0d,
  F: 0x0e,
  G: 0x0f,
  H: 0x10,
  I: 0x01, // mapped to '1'
  J: 0x11,
  K: 0x12,
  L: 0x01, // mapped to '1'
  M: 0x13,
  N: 0x14,
  O: 0x15,
  P: 0x16,
  Q: 0x17,
  R: 0x18,
  S: 0x19,
  T: 0x1a,
  U: 0x1b, // mapped to 'V'
  V: 0x1b,
  W: 0x1c,
  X: 0x1d,
  Y: 0x1e,
  Z: 0x1f,
};

const unpack = (claimCode: ClaimCode): UnpackResult => {
  const clean = claimCode.replace(/-/g, '');

  if (clean.length !== 16) {
    throw new Error('claim codes should be 16 characters');
  }

  let value = bigInt(0);

  for (let i = 0; i < clean.length; i++) {
    const char = clean[i].toUpperCase();

    if (Object.keys(CLAIMCODE_BASE32_DICT).includes(char)) {
      // we need:
      // value += CLAIMCODE_BASE32_DICT[c] * (32 ** (15 - i))
      const code = bigInt(CLAIMCODE_BASE32_DICT[char]);
      const mult = bigInt(32 ** (15 - i));
      value = value.add(code.multiply(mult));
    } else {
      throw new Error(`${char} is not a valid character`);
    }
  }

  // 24 bit hardware address xor
  const deviceXor = value.and(bigInt(0xffffff));
  // 40 bit secret
  const secret = value.shiftRight(bigInt(24)).and(bigInt(0xffffffffff));
  // 16 bit crc
  const crc = value.shiftRight(bigInt(64));

  return {
    deviceXor,
    secret,
    crc: Number(crc),
    value: value,
  };
};

export default unpack;
