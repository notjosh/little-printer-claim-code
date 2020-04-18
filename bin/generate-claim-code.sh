#!/bin/bash

[ ! -d node_modules ] && yarn
[ ! -d dist ] && yarn build
node -e " \
const encode = require('./dist/encode').default; \
const device='$(openssl rand -hex 8)'; \
const secret=Math.floor(Math.random() * 0xffffffffff); \
console.log({ device, secret, claimCode: encode(parseInt(device, 16) & 0xffffff, secret) });"