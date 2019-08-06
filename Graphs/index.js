class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
    }
  }

  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        v => v !== vertex2
      );
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        v => v !== vertex1
      );
    }
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length > 0) {
      let adjacentVertex = this.adjacencyList[vertex].pop();
      this.adjacencyList[adjacentVertex] = this.adjacencyList[
        adjacentVertex
      ].filter(v => v !== vertex);
    }
    delete this.adjacencyList[vertex];
  }

  depthFirstRecursive(start) {
    let result = [];
    let visited = {};
    let adjacencyList = this.adjacencyList;
    dfs(start);
    function dfs(vertex) {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) return dfs(neighbor);
      });
    }

    return result;
  }
  breadthFirst(start) {
    const queue = [start];
    let result = [];
    let visited = {};
    visited[start] = true;
    let currentVertex;
    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex);
      this.adjacencyList[currentVertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
  }
}

var graph = new Graph();

graph.addVertex("Tokyo");
graph.addVertex("Okinawa");
graph.addVertex("Osaka");
graph.addVertex("Nara");
graph.addVertex("Kyoto");
// console.log(graph.adjacencyList);
graph.addEdge("Tokyo", "Okinawa");
// graph.addEdge("Osaka", "Okinawa");
graph.addEdge("Nara", "Okinawa");
graph.addEdge("Nara", "Kyoto");
console.log(graph.adjacencyList);
// console.log(graph.depthFirstRecursive("Tokyo"));
console.log(graph.breadthFirst("Tokyo"));
//    tokyo
//     |
//     |
//  okinawa   ----    osaka
//     |
//     |
//   Nara    -----    kyoto
