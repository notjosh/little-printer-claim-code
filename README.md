# little-printer-claim-code

Claim code encoding for Little Printer devices.

Ported from [this Python implementation](https://github.com/nordprojects/sirius).

Mostly I expect this to be used to encode devices into generating a claim code (via `encode`), but it also supports unpacking a claim code into parameters (`unpack`), and decoding a device key from a claim code (`decode`);

## Library Usage

### `encode`

Turn device parameters into a claim code:

```ts
// generate a device address - from MAC address, or randomly, whatever
const deviceAddress = '000d6f000273c164';

// only the last 24 bits of the device address are used
const deviceAddressInt = parseInt(deviceAddress, 16) & 0xffffff;

// secret only known to printer and claim code, randomly generate
const secret = 0xeb1ba696a0;

console.log(encode(deviceAddressInt, 0xeb1ba696a0));
// → 'n5ry-p6x6-kth7-7hc4'
```

### `unpack`

Extract values within a claim code:

```ts
const claimCode = 'c1zp-g2ec-sqqh-28t5';

console.log(unpack(claimCode));
// → {
//   device: 74565,
//   secret: 444691369455,
//   crc: 22655,
//   value: 417918447673048574272325n
// }
```

### `decode`

Decode a claim code to extract the key:

```ts
const claimCode = 'c1zp-g2ec-sqqh-28t5';

console.log(decode(claimCode));

// → {
//   device: 74565,
//   key: <Buffer d5 0b 90 4f 43 7c 1d 2e 87 c3 10 57 49 40 9e 3d>
// }
```

## Generate a Claim Code

If all you really want to do is create a claim code with this library, then there's a script to help with that:

```
./bin/generate-claim-code.sh

// → {
//  device: '121745933cb16b91',
//  secret: 876353015208,
//  claimCode: '5rpd-r2oo-spnc-2v00'
// }
```
