#!/bin/bash

if [ $# -eq 0 ]; then
  echo "No claim code supplied"
  exit 1
fi

[ ! -d node_modules ] && yarn
[ ! -d dist ] && yarn dist
node -e " \
const unpack = require('./dist/unpack').default; \
const unpacked = unpack('$1'); \
const info = { deviceXor: unpacked.deviceXor.toString(16), secret: unpacked.secret.toString(16), crc: unpacked.crc.toString(16) }; \
Object.keys(info).forEach((key) => { console.log(\`\${key.padStart(12, ' ')}: \${info[key]}\`); }); \
"
