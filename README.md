# little-printer-claim-code

Claim code encoding for Little Printer devices.

Ported from [this Python implementation](https://github.com/nordprojects/sirius).

Mostly I expect this to be used to encode devices into generating a claim code (via `encode`), but it also supports unpacking a claim code into parameters (`unpack`), and decoding a device key from a claim code (`decode`);

## Library Usage

### `encode`

Turn device parameters into a claim code:

```ts
// generate a device address - from MAC address, or randomly, whatever
const deviceAddress = bigInt('46dbd1efebe85023', 16);
const xor = hardwareXorFromDeviceAddress(deviceAddress);

// secret only known to printer and claim code, randomly generated
const secret = bigInt('bd38b46918', 16);

console.log(encode(xor, secret));
// → '3ddc-tf5n-e4d4-2r7k'
```

### `unpack`

Extract values within a claim code:

```ts
const claimCode = 'c1zp-g2ec-sqqh-28t5';

console.log(unpack(claimCode));
// → {
//   deviceXor: 74565n,
//   secret: 444691369455n,
//   crc: 22655n,
//   value: 417918447673048574272325n
// }
```

### `decode`

Decode a claim code to extract the key:

```ts
const claimCode = 'c1zp-g2ec-sqqh-28t5';

console.log(decode(claimCode));

// → {
//   deviceXor: 74565n,
//   key: <Buffer d5 0b 90 4f 43 7c 1d 2e 87 c3 10 57 49 40 9e 3d>
// }
```

## Generate a Claim Code

If all you really want to do is create a claim code with this library, then there's a script to help with that:

```sh
./bin/generate-printer.sh

// →
//     address: 5f297a46f118187
//      secret: da156dc11d
//         xor: 11541520
//  claim code: 7p6x-n5ce-r4fv-070h
```

## Maintenance: Releasing a Version

Publishing works via GitHub actions, so. Create a new version (+tag, etc), which should get pushed to GitHub automatically.

```sh
yarn version
```

Then open GitHub, and create (+ publish) a new release. This will trigger everything else that needs doing.
