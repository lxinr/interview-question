function ListNode(val, next) {
  this.val = (val === undefined) ? 0 : val
  this.next = (next === undefined) ? null : next
}

// 单向链表
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = new Node('head')
  }
  // 遍历查找链表
  find (item) {
    let currNode = this.head
    while (currNode.val !== item) {
      currNode = currNode.next
    }
    return currNode
  }
  insert (newEle, item = 'head') {
    // 原链表 n1 ->(n1.next) n2 ->(n2.next) n3 ->(n3.next) n4
    // 此时在n2后插入n5，则新的链表应为
    // n1 ->(n1.next) n2 ->(n2.next) n5 ->(n5.next) n3 ->(n3.next) n4
    const newNode = new Node(newEle)
    const current = this.find(item)
    // 新节点的next应承接插入节点的next
    newNode.next = current.next
    // 插入节点next换成新节点，完成插入过程
    current.next = newNode
  }
  // 删除节点，只需要找到对应节点，将上一个节点的next指向需删除节点的next即可
  remove (item) {
    let currentNode = this.head
    let removeNode = null
    while (currentNode.next != null) {
      if (currentNode.next.val === item) {
        removeNode = currentNode.next
        break;
      }
      currentNode = currentNode.next
    }
    if (removeNode) currentNode.next = removeNode.next
  }
  // 显示链表中的所有节点
  display () {
    let currentNode = this.head
    while (currentNode.next != null) {
      console.log(currentNode.next.val)
      currentNode = currentNode.next
    }
  }
}

const ll = new LinkedList()

// ll.insert('周杰伦')
// ll.insert('林俊杰', '周杰伦')
// ll.insert('王力宏', '林俊杰')
// ll.insert('陶喆', '王力宏')

ll.insert(1)
ll.insert(2, 1)
ll.insert(3, 2)
ll.insert(4, 3)
ll.insert(5, 4)
console.log('ff;;----', ll.head)
ll.display()

function reverseList(head) {
  // let currentNode = head
  // let eles = []
  // while(currentNode.next != null) {
  //   eles.push(currentNode.next.val)
  //   currentNode = currentNode.next
  // }


  // let reverseNode = head
  // while(eles.length > 0) {
  //   const node = new ListNode(eles.pop(), reverseNode.next)
  //   reverseNode.next = node
  //   console.log('rev----', reverseNode.next, reverseNode.next.val)
  // }

  let prev = null
  let curr = head
  while (curr) {
    let temp = curr.next
    curr.next = prev
    prev = curr
    curr = temp

  }
  console.log('prev----', prev)
  return prev
}

reverseList(ll.head)