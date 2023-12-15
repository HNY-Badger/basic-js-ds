const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  head = null;

  root() {
    return this.head;
  }

  add(data) {
    if (!this.head) {
      this.head = data ? new Node(data) : new Node(null);
      return
    }
    let parent = this.head;
    while (true) {
      if (data < parent.data) {
        if (!parent.left) {
          parent.left = data ? new Node(data) : new Node(null);
          return;
        } else {
          parent = parent.left;
          continue;
        }
      } else {
        if (!parent.right) {
          parent.right = data ? new Node(data) : new Node(null);
          return;
        } else {
          parent = parent.right;
          continue;
        }
      }
    }
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  find(data) {
    let parent = this.head;
    while (true) {
      if (parent === null) {
        return null;
      }
      if (data === parent.data) {
        return parent;
      }
      if (data < parent.data) {
        if (parent.left) {
          parent = parent.left;
          continue;
        } else {
          return null;
        }
      } else {
        if (parent.right) {
          parent = parent.right;
          continue;
        } else {
          return null;
        }
      }
    }
  }

  remove(data) {
    let parent = null;
    let node = this.head;
    while (true) {
      if (node === null) {
        return;
      }
      if (data === node.data) {
        if (node.left === null && node.right === null) {
          if (parent === null) {
            this.head = null;
          } else {
            this.swap(parent, node, null);
          }
        } else if (node.left !== null && node.right === null) {
          this.swap(parent, node, node.left);
        } else if (node.left === null && node.right !== null) {
          this.swap(parent, node, node.right);
        } else {
          let currentParent = node;
          let current = node.right;
          while (true) {
            if (current.left !== null) {
              currentParent = current;
              current = current.left;
            } else {
              this.swap(currentParent, current, current.right);
              current.left = node.left;
              current.right = node.right;
              this.swap(parent, node, current);
              break;
            }
          }
        }
        return;
      }
      parent = node;
      if (data < node.data) {
        if (node.left) {
          node = node.left;
          continue;
        } else {
          return;
        }
      } else {
        if (node.right) {
          node = node.right;
          continue;
        } else {
          return;
        }
      }
    }
  }

  swap(parent, node, to) {
    if (parent === null) {
      this.head = to;
    } else if (parent.left === node) {
      parent.left = to;
    } else {
      parent.right = to;
    }
  }

  min() {
    if (this.head === null) {
      return 0;
    }
    let node = this.head;
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (this.head === null) {
      return 0;
    }
    let node = this.head;
    while (node.right !== null) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};