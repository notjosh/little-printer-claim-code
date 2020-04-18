const bigintToBuf = (bigint: BigInt): Buffer => {
  let hex = BigInt(bigint).toString(16);
  if (hex.length % 2) {
    hex = '0' + hex;
  }

  const len = hex.length / 2;
  const u8 = new Uint8Array(len);

  let i = 0;
  let j = 0;
  while (i < len) {
    u8[i] = parseInt(hex.slice(j, j + 2), 16);
    i += 1;
    j += 2;
  }

  // XXX: should round up to multiple of 8, but we're only expecting <= 8 so not a problem for us?
  const array = [...Array(8 - u8.length).fill(0), ...Array.from(u8)];
  const reversed = array.reverse(); // endianness hackin'
  return Buffer.from(reversed);
};

export default bigintToBuf;
