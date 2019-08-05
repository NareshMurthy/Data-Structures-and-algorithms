class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}
class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
  push(val) {
    var newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.prev = null;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    if (!this.head) return undefined;
    var tail = this.tail;
    this.tail = tail.prev;
    this.tail.next = null;
    tail.prev = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return tail;
  }
  shift() {
    if (!this.head) return undefined;
    var currentHead = this.head;
    if (this.length === 1) {
      this.tail = null;
      this.head = null;
    } else {
      this.head = currentHead.next;
      this.head.prev = null;
      currentHead.next = null;
    }
    this.length--;
    return currentHead;
  }
  unshift(val) {
    var newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.head.prev = null;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  get(index) {
    if (index < 0 || index >= this.length) return null;
    var counter = 0;
    var current;
    if (index <= (this.length - 1) / 2) {
      current = this.head;
      counter = 0;
      while (counter != index) {
        current = current.next;
        counter++;
      }
    } else {
      current = this.tail;
      counter = this.length - 1;
      while (counter != index) {
        current = current.prev;
        counter--;
      }
    }

    return current;
  }
  set(index, val) {
    var foundNode = this.get(index);
    if (foundNode) {
      foundNode.val = val;
      return true;
    }
    return false;
  }
  insert(index, val) {
    if (index < 0 || index > this.length) return null;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);
    var newNode = new Node(val);
    var prevNode = this.get(index - 1);
    var temp = prevNode.next;
    prevNode.next = newNode;
    newNode.next = temp;
    newNode.prev = prevNode;
    temp.prev = newNode;
    this.length++;
    return true;
  }
  remove(index) {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    var prevNode = this.get(index - 1);
    var afterNode = this.get(index + 1);
    var removed = prevNode.next;
    prevNode.next = removed.next;
    afterNode.prev = removed.prev;
    removed.prev = null;
    removed.next = null;
    this.length--;
    return removed;
  }
}

var list = new DoublyLinkedList();
list.push(10);
list.push(20);
console.log(list);
list.shift();
list.shift();
console.log(list);
