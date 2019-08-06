const PriorityQueue = require("../Priority Queue");
class Graph {
  constructor() {
    this.nodes = [];
    this.adjacencyList = {};
  }
  addNode(node) {
    this.nodes.push(node);
    this.adjacencyList[node] = [];
  }
  addEdge(node1, node2, weight) {
    this.adjacencyList[node1].push({ node: node2, weight: weight });
    this.adjacencyList[node2].push({ node: node1, weight: weight });
  }
  findPathWithDijkstra(startNode, endNode) {
    let times = {};
    let testCaseCounter = 1;
    let backtrace = {};
    let pq = new PriorityQueue();
    times[startNode] = 0;
    if (checkImpossible(1) || checkImpossible(4)) {
      console.log(`Case ${testCaseCounter}: impossible`);
      return 0;
    }
    this.nodes.forEach(node => {
      if (node !== startNode) {
        times[node] = Infinity;
      }
    });
    pq.enqueue([startNode, 0]);
    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue();
      let currentNode = shortestStep[0];
      this.adjacencyList[currentNode].forEach(neighbor => {
        let time = times[currentNode] + neighbor.weight;
        if (time < times[neighbor.node]) {
          times[neighbor.node] = time;
          backtrace[neighbor.node] = currentNode;
          pq.enqueue([neighbor.node, time]);
        }
      });
    }
    let path = [endNode];
    let lastStep = endNode;
    while (lastStep !== startNode) {
      path.unshift(backtrace[lastStep]);
      lastStep = backtrace[lastStep];
    }
    console.log(`Case ${testCaseCounter}: ${times[endNode]}`);
    return `Path is ${path} and time is ${times[endNode]}`;
  }
}

function matrixEven(n) {
  const results = [];
  for (let i = 0; i < n; i++) {
    results.push([]);
  }
  let counter = n * n;
  let startColumn = 0;
  let endColumn = n - 1;
  let startRow = 0;
  let endRow = n - 1;

  while (startColumn <= endColumn && startRow <= endRow) {
    for (let i = startColumn; i <= endColumn; i++) {
      results[startRow][i] = counter;
      counter--;
    }
    startRow++;

    for (let i = startRow; i <= endRow; i++) {
      results[i][endColumn] = counter;
      counter--;
    }
    endColumn--;

    for (let i = endColumn; i >= startColumn; i--) {
      results[endRow][i] = counter;
      counter--;
    }
    endRow--;

    for (let i = endRow; i >= startRow; i--) {
      results[i][startColumn] = counter;
      counter--;
    }
    startColumn++;
  }
  return results;
}

function findCoOrdinates(number) {
  var coOrdinates = [];
  var indexOfSubArray = ulam.findIndex(function(sub) {
    return sub.indexOf(number) !== -1;
  });

  coOrdinates.push(indexOfSubArray);
  var exactIndex = ulam[indexOfSubArray].indexOf(number);
  coOrdinates.push(exactIndex);
  return coOrdinates;
}

function isPrime(num) {
  if (num === 1) {
    return false;
  }
  for (var i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

var ulam = matrixEven(100);
var endFill = 100 * 100;
var tempArr = [];
let map = new Graph();
for (let i = 1; i <= endFill; i++) {
  map.addNode(i);
  tempArr.push(i);
}

for (let i = 0; i < tempArr.length; i++) {
  var startPosition = findCoOrdinates(tempArr[i]);
  var rightElement = 0;
  var topElement = 0;
  var leftElement = 0;
  var bottomElement = 0;

  if (startPosition[1] < 99) {
    rightElement = ulam[startPosition[0]][startPosition[1] + 1];
  }

  if (startPosition[0] < 99) {
    topElement = ulam[startPosition[0] + 1][startPosition[1]];
  }

  if (startPosition[1] > 0) {
    leftElement = ulam[startPosition[0]][startPosition[1] - 1];
  }

  if (startPosition[0] > 0) {
    bottomElement = ulam[startPosition[0] - 1][startPosition[1]];
  }

  var weightPrimeRight = 1;
  var weightPrimeTop = 1;
  var weightPrimeLeft = 1;
  var weightPrimeBottom = 1;
  if (isPrime(tempArr[i])) {
    weightPrimeRight = 2;
    weightPrimeTop = 2;
    weightPrimeLeft = 2;
    weightPrimeBottom = 2;
  } else {
    if (isPrime(rightElement)) {
      weightPrimeRight = 2;
    } else if (isPrime(topElement)) {
      weightPrimeTop = 2;
    } else if (isPrime(leftElement)) {
      weightPrimeLeft = 2;
    } else if (isPrime(bottomElement)) {
      weightPrimeBottom = 2;
    }
  }

  if (rightElement > 0) {
    map.addEdge(tempArr[i], rightElement, weightPrimeRight);
  }
  if (topElement > 0) {
    map.addEdge(tempArr[i], topElement, weightPrimeTop);
  }
  if (leftElement > 0) {
    map.addEdge(tempArr[i], leftElement, weightPrimeLeft);
  }
  if (bottomElement > 0) {
    map.addEdge(tempArr[i], bottomElement, weightPrimeBottom);
  }

  if (rightElement > 0) {
    tempArr.splice(tempArr.indexOf(rightElement), 1);
  }
  if (topElement > 0) {
    tempArr.splice(tempArr.indexOf(topElement), 1);
  }
  if (leftElement > 0) {
    tempArr.splice(tempArr.indexOf(leftElement), 1);
  }
  if (bottomElement > 0) {
    tempArr.splice(tempArr.indexOf(bottomElement), 1);
  }
}

function checkImpossible(num) {
  var points = findCoOrdinates(num);
  let numTop = 1;
  let numLeft = 1;
  if (points[0] > 0) {
    numTop = ulam[points[0] - 1][points[1]];
  }
  let numRight = ulam[points[0]][points[1] + 1];
  if (points[1] > 0) {
    numLeft = ulam[points[0]][points[1] - 1];
  }
  let numBottom = ulam[points[0] + 1][points[1]];
  if (
    isPrime(numTop) &&
    isPrime(numRight) &&
    isPrime(numLeft) &&
    isPrime(numBottom)
  ) {
    return true;
  }
  return false;
}
var t0 = performance.now();
let shortestPath = map.findPathWithDijkstra(2501, 4);
var t1 = performance.now();
console.log(
  "Call to findPathWithDijkstra took " + (t1 - t0) / 1000 + " milliseconds."
);
