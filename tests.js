const expect = chai.expect;

/* INTEGER TO ROMAN */

describe('toRoman - Valid Cases', function () {

  const cases = [
    [1, 'I'],
    [4, 'IV'],
    [9, 'IX'],
    [40, 'XL'],
    [50, 'L'],
    [60, 'LX'],
    [90, 'XC'],
    [99, 'XCIX'],
    [100, 'C'],
    [104, 'CIV'],
    [300, 'CCC'],
    [399, 'CCCXCIX'],
    [400, 'CD'],
    [438, 'CDXXXVIII'],
    [499, 'CDXCIX'],
    [500, 'D'],
    [503, 'DIII'],
    [763, 'DCCLXIII'],
    [899, 'DCCCXCIX'],
    [900, 'CM'],
    [999, 'CMXCIX'],
    [1000, 'M'],
    [1364, 'MCCCLXIV'],
    [2897, 'MMDCCCXCVII'],
    [3999, 'MMMCMXCIX'],
  ];

  cases.forEach(([input, expected]) => {
    it(`should convert ${input} → ${expected}`, () => {
      expect(toRoman(input)).to.equal(expected);
    });
  });

});

describe('toRoman - Invalid Cases', function () {

  const invalid = [0, -1, 4000];

  invalid.forEach(val => {
    it(`should throw for ${val}`, () => {
      expect(() => toRoman(val)).to.throw();
    });
  });

  const invalidTypes = [' ', '?', 'V', 'V7', '3.5', '2 2'];

  invalidTypes.forEach(val => {
    it(`should throw for invalid input "${val}"`, () => {
      expect(() => toRoman(val)).to.throw();
    });
  });

});


/* ROMAN TO INTEGER */

describe('toInt - Valid Cases', function () {

  const cases = [
    ['I', 1],
    ['i', 1],
    ['IV', 4],
    ['Iv', 4],
    ['V', 5],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000],
    ['XL', 40],
    ['XC', 90],
    ['CD', 400],
    ['CM', 900],
    ['MCCCLXIV', 1364],
    ['DCCLXIII', 763],
    ['MMDCCCXCVII', 2897],
    ['  II', 2]
  ];

  cases.forEach(([input, expected]) => {
    it(`should convert "${input}" → ${expected}`, () => {
      expect(toInt(input)).to.equal(expected);
    });
  });

});

describe('toInt - Invalid Cases', function () {

  const invalid = [
    '0',
    '-I',
    '7',
    'I.II',
    'T',
    'XM',
    'IM',
    'I1',
    'Ï',
    'IIII',
    'DDDD'
  ];

  invalid.forEach(val => {
    it(`should throw for "${val}"`, () => {
      expect(() => toInt(val)).to.throw();
    });
  });

});


/* ROUND-TRIP TESTS */

describe('Round-trip consistency', function () {

  const nums = [1, 4, 9, 58, 444, 1364, 2897, 3999];

  nums.forEach(n => {
    it(`should convert ${n} → Roman → Integer`, () => {
      const roman = toRoman(n);
      const back = toInt(roman);
      expect(back).to.equal(n);
    });
  });

});