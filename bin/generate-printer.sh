#!/bin/bash

[ ! -d node_modules ] && yarn
[ ! -d dist ] && yarn build
node -e " \
const encode = require('./dist/encode').default; \
const address = '$(openssl rand -hex 8)'; \
const secret = Math.floor(Math.random() * 0xffffffffff); \
const info = { address, secret, 'claim code': encode(parseInt(address, 16) & 0xffffff, secret) }; \
Object.keys(info).forEach((key) => { console.log(\`\${key.padStart(12, ' ')}: \${info[key]}\`); }); \
"