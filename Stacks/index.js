class Node {
  constructor(val) {
    this.next = null;
    this.val = val;
  }
}

class Stack {
  constructor() {
    this.size = 0;
    this.first = null;
    this.last = null;
  }
  push(val) {
    var newNode = new Node(val);
    var temp;
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      temp = this.first;
      this.first = newNode;
      this.first.next = temp;
    }
    return ++this.size;
  }

  pop() {
    if (!this.first) return null;
    var temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.val;
  }
}

var stack = new Stack();
stack.push(20);
stack.push(30);
stack.pop();
console.log(stack);
