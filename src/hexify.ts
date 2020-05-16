const hexify = (input: string): string => {
  if (typeof input !== 'string') {
    throw new Error(`input must be a string to hexify (got ${typeof input})`);
  }

  if (!input.match(/^(0x)?[0-9a-f]+$/i)) {
    throw new Error(`can't hexify a non-hex value`);
  }

  if (input.startsWith('0x')) {
    return input;
  }

  return `0x${input}`;
};

export default hexify;
