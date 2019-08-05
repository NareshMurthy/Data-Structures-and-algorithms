class Node {
  constructor(val) {
    this.next = null;
    this.val = val;
  }
}

class Queue {
  constructor() {
    this.size = 0;
    this.first = null;
    this.last = null;
  }

  enqueue(val) {
    var newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
  }
  dequeue() {
    if (this.size === 0) return undefined;
    var temp = this.first;

    if (this.first === this.last) {
      this.last = null;
    }

    this.first = temp.next;
    temp.next = null;
    this.size--;
    return temp.val;
  }
}

var queue = new Queue();
queue.enqueue(20);
queue.enqueue(30);

console.log(queue);

queue.dequeue();
console.log(queue);
