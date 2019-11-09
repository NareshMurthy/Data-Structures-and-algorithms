// get the min value and place in the start of the array
// reverse of bubble sort

const SelectionSort = arr => {
  let min;
  let temp;
  for (let i = 0; i < arr.length; i++) {
    min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (i !== min) {
      temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;
    }
  }
  return arr;
};
module.exports = SelectionSort;
