#!/bin/bash

[ ! -d node_modules ] && yarn
[ ! -d dist ] && yarn dist
node -e " \
const encode = require('./dist/encode').default; \
const hardwareXorFromDeviceAddress = require('./dist/bitshuffle').hardwareXorFromDeviceAddress; \
const address = BigInt(\`0x$(openssl rand -hex 8)\`); \
const secret = BigInt(\`0x$(openssl rand -hex 5)\`); \
const xor = hardwareXorFromDeviceAddress(address); \
const info = { address: address.toString(16), secret: secret.toString(16), xor: xor.toString(10), 'claim code': encode(xor, secret) }; \
Object.keys(info).forEach((key) => { console.log(\`\${key.padStart(12, ' ')}: \${info[key]}\`); }); \
"
