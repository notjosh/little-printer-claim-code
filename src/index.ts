import decode from './decode';
import encode from './encode';
import unpack from './unpack';

export type ClaimCode = string;

export type DecodeResult = {
  device: number;
  key: Buffer;
};

export type UnpackResult = {
  device: number;
  secret: number;
  crc: number;
  value: BigInt;
};

export { decode, encode, unpack };
