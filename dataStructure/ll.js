
function SinglyListNode (index, val) {
  this.index = index
  this.val = val
  this.next = null
}

/**
 * Initialize your data structure here.
 */
 var MyLinkedList = function() {
  this.head = new SinglyListNode(-1, 'head')
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
  if (!this.head) return -1
  while (this.head.next != null) {
    if (this.head.next.index === index) return this.head.next.val
  }
  return -1
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
  let currentNode = this.head
  const inertNode = new SinglyListNode(0, val)
  while (currentNode.next != null) {
    if(currentNode.index === -1) {
      inertNode.next = currentNode.next
      currentNode.next = inertNode
      break;
    }
  }
  console.log('curr----', currentNode)
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
  let currentNode = this.head
  while (currentNode.next != null) {
    if(currentNode.next.next == null) {
      break;
    }
    currentNode = currentNode.next
  }
  if (currentNode.next) {
    const index = currentNode.next.index + 1
    currentNode.next.next = new SinglyListNode(index, val)
  }
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
  let currentNode = this.head
  const node = new SinglyListNode(index,val)
  while (currentNode.next != null) {
    if(currentNode.next.index === index) {
      break;
    }
    currentNode = currentNode.next
  }
  if (currentNode.next) {
    node.next = currentNode.next.next
    currentNode.next = node
  }
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
  let currentNode = this.head
  while (currentNode.next != null) {
    if(currentNode.next.index === index) {
      break;
    }
    currentNode = currentNode.next
  }
  if (currentNode.next) {
    currentNode = currentNode.next.next
  }
};

MyLinkedList.prototype.display = function() {
  var vals = []
  let currentNode = this.head
  while(currentNode.next != null) {
    vals.push(currentNode.next.val)
    currentNode = currentNode.next
  }
  return vals.join(' -> ')
}

var obj = new MyLinkedList()
obj.addAtHead(3)
obj.addAtHead(2)
obj.addAtHead(1)

console.log(obj.display())

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

// var obj = {
//   head: {
//     val: '55',
//     next: {
//       val: 44,
//       next: {

//       }
//     }
//   }
// }

// var o1 = {
//   val: 1,
//   next: o2
// }

// var o2 = {
//   val: 2,
//   next: o3
// }

// var o3 = {
//   val: 3
// }