/*
 * Description: 链表实现
 * Project Name: dataStructure
 * File Path: /LinkedList.js
 * File Created Date: 2021-03-25 14:44
 * Author: liux
 * -----
 * Last Modified: 2021-03-25 14:44
 * Modified By: liux
 * -----
 * HISTORY:
 */

// 单向链表
// class Node {
//   constructor(element) {
//     this.element = element
//     this.next = null
//   }
// }

// class LinkedList {
//   constructor() {
//     this.head = new Node('head')
//   }
//   // 遍历查找链表
//   find (item) {
//     let currNode = this.head
//     while (currNode.element !== item) {
//       currNode = currNode.next
//     }
//     return currNode
//   }
//   insert (newEle, item = 'head') {
//     // 原链表 n1 ->(n1.next) n2 ->(n2.next) n3 ->(n3.next) n4
//     // 此时在n2后插入n5，则新的链表应为
//     // n1 ->(n1.next) n2 ->(n2.next) n5 ->(n5.next) n3 ->(n3.next) n4
//     const newNode = new Node(newEle)
//     const current = this.find(item)
//     // 新节点的next应承接插入节点的next
//     newNode.next = current.next
//     // 插入节点next换成新节点，完成插入过程
//     current.next = newNode
//   }
//   // 删除节点，只需要找到对应节点，将上一个节点的next指向需删除节点的next即可
//   remove (item) {
//     let currentNode = this.head
//     let removeNode = null
//     while (currentNode.next != null) {
//       if (currentNode.next.element === item) {
//         removeNode = currentNode.next
//         break;
//       }
//       currentNode = currentNode.next
//     }
//     if (removeNode) currentNode.next = removeNode.next
//   }
//   // 显示链表中的所有节点
//   display () {
//     let currentNode = this.head
//     while (currentNode.next != null) {
//       console.log(currentNode.next.element)
//       currentNode = currentNode.next
//     }
//   }
// }

// const ll = new LinkedList()

// ll.insert('周杰伦')
// ll.insert('林俊杰', '周杰伦')
// ll.insert('王力宏', '林俊杰')
// ll.insert('陶喆', '王力宏')
// ll.display()

// console.info('-----')

// ll.remove('陶喆')

// ll.display()
// console.log('new---', ll)

// 双向链表
class Node {
  constructor(element) {
    this.element = element
    this.next = null
    this.previous = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
  }
  // 查找节点
  find (item) {
    let currentNode = this.head
    while (currentNode.element !== item) {
      currentNode = currentNode.next
    }
    return currentNode
  }
  // 插入新节点
  insert(element, item) {
    let newNode = new Node(element)
    if (this.head && !item) throw new Error('需先指定插入节点')
    if (!this.head) {
      this.head = newNode // 第一次insert的作为头节点
      return
    }

    const currentNode = this.find(item)
    if (!currentNode) return
    newNode.next = currentNode.next // 新节点的next指向插入节点的next
    newNode.previous = currentNode // 新节点的previous指向插入节点
    currentNode.next = newNode // 插入节点的next指向新节点
  }
  // 找出链表的最后一个节点
  findLast () {
    let currentNode = this.head
    while(currentNode.next != null) {
      currentNode = currentNode.next
    }
    return currentNode
  }
  // 删除节点
  remove (item) {
    let currentNode = this.find(item)
    if (!currentNode) return
    // 上一个节点的next指向删除节点的next
    currentNode.previous.next = currentNode.next || null
    // 如果存在next，则将next的previous指向删除节点的previous
    if (currentNode.next) currentNode.next.previous = currentNode.previous
    // 清空当前currentNode
    currentNode.next = null
    currentNode.previous = null
  }
  display () {
    let currentNode = this.head
    while (currentNode.next != null) {
      console.log(currentNode.next.element)
      currentNode = currentNode.next
    }
  }
  // 反序显示链表内容
  displayReverse () {
    let currentNode = this.head
    currentNode = this.findLast()
    while (currentNode.previous != null) {
      console.log(currentNode.previous.element)
      currentNode = currentNode.previous
    }
  }
}

const ll = new LinkedList('head')

ll.insert('周杰伦')
ll.insert('林俊杰', '周杰伦')
ll.insert('王力宏', '林俊杰')
ll.insert('陶喆', '王力宏')
ll.displayReverse()

console.log('-----')

ll.display()