const PriorityQueue = require("../Priority Queue");

class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push({ node: vertex2, weight });
      this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
  }

  dijkstras(start, finish) {
    var nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let shotestPath = [];
    let smallest;
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    while (nodes.values.length > 1) {
      smallest = nodes.dequeue().val;

      if (smallest === finish) {
        while (previous[smallest]) {
          shotestPath.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }

      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbor];
          let candidate = distances[smallest] + nextNode.weight;
          if (candidate < distances[nextNode.node]) {
            distances[nextNode.node] = candidate;
            previous[nextNode.node] = smallest;
            nodes.enqueue(nextNode.node, candidate);
          }
        }
      }
    }
    return shotestPath.concat(smallest).reverse();
  }
}

var graph = new Graph();

graph.addVertex("Tokyo");
graph.addVertex("Okinawa");
graph.addVertex("Osaka");
graph.addVertex("Nara");
graph.addVertex("Kyoto");
graph.addEdge("Tokyo", "Okinawa", 1);
graph.addEdge("Osaka", "Okinawa", 1);
graph.addEdge("Nara", "Okinawa", 2);
graph.addEdge("Nara", "Kyoto", 3);
graph.addEdge("Osaka", "Kyoto", 7);
console.log(graph.adjacencyList);
console.log(graph.dijkstras("Kyoto", "Osaka"));

//   Tokyo
//     |
//     | 1       1
//  Okinawa   ----    Osaka
//     |                |
//     | 2      3       |7
//   Nara    -----    Kyoto

module.exports = Graph;
