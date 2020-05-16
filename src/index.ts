import { BigInteger } from 'big-integer';

import decode from './decode';
import encode from './encode';
import unpack from './unpack';

export type ClaimCode = string;

export type DecodeResult = {
  deviceXor: BigInteger;
  key: Buffer;
};

export type UnpackResult = {
  deviceXor: BigInteger;
  secret: BigInteger;
  crc: number;
  value: BigInteger;
};

export { decode, encode, unpack };
