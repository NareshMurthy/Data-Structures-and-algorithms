// place the elements in buckets of their values

const getDigit = (num, i) => {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
};

const digitCount = num => {
  return num === 0 ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1;
};

const mostDigits = arr => {
  let maxDigits = 0;
  for (let i = 0; i < arr.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(arr[i]));
  }
  return maxDigits;
};

const radixSort = arr => {
  let maxDigitCount = mostDigits(arr);

  for (let i = 0; i < maxDigitCount; i++) {
    let buckets = Array.from({ length: 10 }, () => []);
    for (let j = 0; j < arr.length; j++) {
      buckets[getDigit(arr[j], i)].push(arr[j]);
    }
    arr = [].concat(...buckets);
  }
  return arr;
};

console.log(radixSort([3, 5, 1, 2, 7]));

module.exports = radixSort;
