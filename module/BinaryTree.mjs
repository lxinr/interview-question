
// 相对本节点较小的值保存在左节点，相对本节点较大的值保存在右节点

function Node(data, left, right) {
  this.data = data
  this.left = left
  this.right = right
}

class BinaryTree {
  constructor() {
    this.root = null
  }

  insert(data) {
    const node = new Node(data, null, null)
    // 如果树还没有节点，则设置为根结点
    if(this.root == null) {
      this.root = node
    } else {
      let current = this.root
      while(true) {
        // 相对本节点较小的值保存在左节点，相对本节点较大的值保存在右节点
        if(data < current.data) {
          if(current.left == null) {
            current.left = node
          }
        }
      }
    }
  }
}