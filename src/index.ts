import decode from './decode';
import encode from './encode';
import unpack from './unpack';

export type ClaimCode = string;

export type DecodeResult = {
  deviceXor: bigint;
  key: Buffer;
};

export type UnpackResult = {
  deviceXor: bigint;
  secret: bigint;
  crc: number;
  value: bigint;
};

export { decode, encode, unpack };
