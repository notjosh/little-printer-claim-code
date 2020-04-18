import decode from '../decode';

describe('decode', () => {
  it('works with example', () => {
    const claimCode = '6xwh-441j-8115-zyrh';
    const expectedKey = 'F7D9bmztHV32+WJScGZR0g==';

    const result = decode(claimCode);
    const base64 = result.key.toString('base64');
    expect(base64).toEqual(expectedKey);
  });
});
