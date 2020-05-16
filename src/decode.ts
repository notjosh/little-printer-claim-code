import crypto from 'crypto';

import { ClaimCode, DecodeResult } from '.';

import bigintToBuf from './bigintToBuf';
import crc16 from './crc16';
import unpack from './unpack';

const ZBEE_SEC_CONST_BLOCKSIZE = 16;

const CLAIM_CODE_SALT = [
  0x38,
  0x96,
  0x10,
  0xd9,
  0xb6,
  0xb1,
  0x0d,
  0x16,
  0x9e,
  0xe9,
  0xbf,
  0x87,
  0x95,
  0x32,
  0x62,
  0x5b,
];

const generateLinkKey = (input: Buffer): Buffer => {
  const inputLength = input.length + CLAIM_CODE_SALT.length;

  const padding = Buffer.alloc(
    Math.max(0, ZBEE_SEC_CONST_BLOCKSIZE - input.length)
  );

  if (input.length <= 5) {
    // Padding begins with 1000000
    // Then pad with zeroes
    const pad = '\x80' + '\x00'.repeat(ZBEE_SEC_CONST_BLOCKSIZE - 1);
    padding.write(pad, 0, 'ascii');

    // Pad with the original length encoded as a 16bit int
    padding.writeInt16BE((inputLength * 8) & 0xffff, padding.length - 2);
  } else if (inputLength != ZBEE_SEC_CONST_BLOCKSIZE) {
    throw new Error(`cannot handle input size ${inputLength}`);
  }

  const inputPadded = Buffer.concat([input, padding]);

  const blocks = [Buffer.from(CLAIM_CODE_SALT), inputPadded];

  const output = Buffer.alloc(16);

  for (const block of blocks) {
    const encoder = crypto.createCipheriv('aes-128-ecb', output, null);
    const h = encoder.update(block);
    for (let i = 0; i < h.length; i++) {
      const value = h.readInt8(i) ^ block.readInt8(i);
      output.writeInt8(value, i);
    }
  }

  return output;
};

const decode = (claimCode: ClaimCode): DecodeResult => {
  const unpacked = unpack(claimCode);

  // Generate our own CRC from the raw_value, and confirm it matches the extracted crc
  const packable = BigInt(unpacked.value) & BigInt('0xffffffffffffffff');
  const dataForCrc = bigintToBuf(packable);
  const serverCrc = crc16(dataForCrc);

  if (serverCrc !== unpacked.crc) {
    throw new Error('CRC problem');
  }

  // Pack the 40-bit number as a LE long long, and then truncate back to 5 bytes
  const packedSecret = bigintToBuf(BigInt(unpacked.secret)).slice(0, 5);
  const key = generateLinkKey(packedSecret);

  return {
    deviceXor: unpacked.deviceXor,
    key,
  };
};

export default decode;
