const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

    constructor() {  
      this._root = null;
    }
    
  root() {
    if(this._root === null){  
      return null;
    }
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if(this._root === null) {  
      this._root = newNode;
    } else {  
      this.insertNode(this._root, newNode)
    }
  }

  insertNode(node,newNode) {  
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return this.find(data) !== null
  }

  find(data) {
    return this.search(this._root, data);
  }

  search(node, key) {  
    if (node === null) {
      return null; 
    }
    if (key < node.data) {
      return this.search(node.left, key);
    } else if (key > node.data) {
      return this.search(node.right, key);
    } else {
      return node; // Key found
    }
  }

  remove(data) {
    this._root = this.removeNode(this._root,data);

  }
  removeNode(node,key) {  
    if (node === null) {
      return null; // Node not found
    }

    if (key < node.data) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.data) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        return null;
      }
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
      const minNode = this.findMinNode(node.right);
      node.data = minNode.data; // Replace with the smallest value in the right subtree
      node.right = this.removeNode(node.right, minNode.data);
      return node;
    }
  }

  findMinNode(node){
    if (node === null) return null;
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  min() {
    if(this._root === null) return null;
    
    let current = this._root;
    while(current.left !== null) {  
      current = current.left;
    }
    return current.data;
  }

  max() {
    if(this._root === null) return null;
    
    let current = this._root;
    while(current.right !== null) {  
      current = current.right;
    }
    return current.data;
  }

}
module.exports = {
  BinarySearchTree
};