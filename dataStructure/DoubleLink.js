// 节点
class LinkNode {
  constructor(key, val) {
    this.key = key
    this.val = val
    this.next = null
    this.prev = null
  }
}

class DoubleLinkedList {
  constructor() {
    // 初始化双向链表的头尾节点
    this.head = new LinkNode(0, 0)
    this.tail = new LinkNode(0, 0)

    this.head.next = this.tail
    this.tail.prev = this.head

    // 链表元素数量
    this.size = 0
  }

  insert(node) {
    node.prev = this.tail.prev
    node.next = this.tail
    this.tail.prev.next = node
    this.tail.prev = node
    ++this.size
  }
  // 删除节点
  remove(node) {
    node.prev.next = node.next
    node.next.prev = node.prev
    --this.size
  }
  // 删除链表的第一个节点，并返回对应节点
  removeFirst() {
    // 如果只有头尾节点，则没有可删除的节点
    if (this.head.next === this.tail) {
      return null
    }
    const firstNode = this.head.next
    this.remove(firstNode)
    return firstNode
  }
  getSize() {
    return this.size
  }
}

class LRUCache {
  // 以正整数作为容量 capacity 初始化 LRU 缓存
  constructor(capacity = 0) {
    this.hash = new Map()
    this.cache = new DoubleLinkedList()
    this.capacity = capacity
  }

  get(key) {
    if (!this.hash.has(key)) return -1
    // 此段逻辑目的是为了将该数据提升至最新访问
    const node = this.hash.get(key)
    // 先将该节点从缓存中删除
    this.cache.remove(node)
    // 再将其插入队尾
    this.cache.insert(node)

    return node.val
  }

  put(key, value) {
    if (this.hash.has(key)) {
      const node = this.hash.get(key)
      // 如果是已存在的数据，则先删除
      this.hash.delete(key)
      this.cache.remove(node)
    } else {
      const cacheSize = this.cache.getSize()
      // 当缓存容量已满
      if (cacheSize >= this.capacity) {
        // 则需要删除链表的第一个节点，此时该节点为最旧的访问数据
        const removeNode = this.cache.removeFirst()
        // 删除哈希表中对应的key
        this.hash.delete(removeNode.key)
      }
    }
    // 插入哈希表和链表
    const nNode = new LinkNode(key, value)
    this.hash.set(key, nNode)
    this.cache.insert(nNode)
  }
}

class LRUCache2 {
  // 以正整数作为容量 capacity 初始化 LRU 缓存
  constructor(capacity = 0) {
    this.hash = new Map()
    this.cache = new Set()
    this.capacity = capacity
  }
  // 插入key和数据
  _insert(key, val) {
    this.hash.set(key, val)
    this.cache.add(key)
  }
  // 删除key
  _remove(key) {
    this.hash.delete(key)
    this.cache.delete(key)
  }

  get(key) {
    if (!this.hash.has(key)) return -1
    // 此段逻辑目的是为了将该数据提升至最新访问
    // 先将该节点从缓存中删除
    this.cache.delete(key)
    // 再将其插入队尾
    this.cache.add(key)

    return this.hash.get(key)
  }

  put(key, val) {
    if (this.hash.has(key)) {
      // 如果是已存在的数据，则先删除
      this._remove(key)
    } else {
      const cacheSize = this.cache.size
      // 当缓存容量已满
      if (cacheSize >= this.capacity) {
        // 获取到Set对象内按照插入顺序返回的最旧一个数据
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/values
        const removeKey = this.cache.values().next().value
        // 删除对应的key
        this._remove(removeKey)
      }
    }

    // 插入对应的key和val
    this._insert(key, val)
  }
}

const lRUCache = new LRUCache2(2)

lRUCache.put(1, 1) // 缓存是 {1=1}
lRUCache.put(2, 2) // 缓存是 {1=1, 2=2}
console.log('lRUCache.get(1)---', lRUCache.get(1)) // 返回 1
lRUCache.put(3, 3) // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
console.log('lRUCache.get(2)---', lRUCache.get(2)) // 返回 -1
lRUCache.put(4, 4) // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
console.log('lRUCache.get(1)---', lRUCache.get(1)) // 返回 -1
console.log('lRUCache.get(3)---', lRUCache.get(3)) // 返回 3
console.log('lRUCache.get(4)---', lRUCache.get(4)) // 返回 4
