const BubbleSort = require("./BubbleSort");
const SelectionSort = require("./SelectionSort");
describe("Tests for BubbleSort", () => {
  test("BubbleSort function exists", () => {
    expect(BubbleSort).toBeDefined();
  });

  test("BubbleSort sorts a List", () => {
    expect(BubbleSort([1, 3, 2, 1, 6, 4, 3, 5, 3])).toEqual([
      1,
      1,
      2,
      3,
      3,
      3,
      4,
      5,
      6
    ]);
  });
});

describe("Tests for SelectionSort", () => {
  test("SelectionSort function exists", () => {
    expect(SelectionSort).toBeDefined();
  });

  test("SelectionSort sorts a List", () => {
    expect(SelectionSort([1, 3, 2, 1, 6, 4, 3, 5, 3])).toEqual([
      1,
      1,
      2,
      3,
      3,
      3,
      4,
      5,
      6
    ]);
  });
});
