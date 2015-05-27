import protodef from './reverse-protodef';
import {reql, simple, real} from './fixtures';

class BinaryTree {
  constructor (value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  postorder (f) {
    this.walk(f, ['left', 'right', 'this']);
  }

  preorder (f) {
    this.walk(f, ['this', 'left', 'right']);
  }

  walk (func, order) {
    for (let i = 0; i < order.length; i += 1) {
      switch (order[i]) {
        case 'this': func(this.value); break;
        case 'left': if (this.left) this.left.walk(func, order); break;
        case 'right': if (this.right) this.right.walk(func, order); break;
      }
    }
  }

  // walk (func, order) {
  //   for (let i of order)
  //     switch (order[i]) {
  //       case 'this': func(this.value); break;
  //       case 'left': if (this.left) this.left.walk(func, order); break;
  //       case 'right': if (this.right) this.right.walk(func, order); break;
  //     }
  // }
}

let counter = 0;
let createBinaryTreeFromArray = (arr) => {
  let left = null, right = null, thisValue = null;

  if (Array.isArray(arr[0])) {
    createBinaryTreeFromArray(arr[0]);
  } else {
    arr[0] = protodef.Term.TermType[arr[0]]
  }

  if (Array.isArray(arr[1])) {
    if (Array.isArray(arr[1][0])) {
      left = createBinaryTreeFromArray(arr[1][0])
    } else {
      if (Number.isInteger(arr[1][0])) arr[1][0] = protodef.Term.TermType[arr[1][0]]
      left = new BinaryTree(arr[1][0])
    }

    if (Array.isArray(arr[1][1])) {
      right = createBinaryTreeFromArray(arr[1][1])
    } else {
      if (Number.isInteger(arr[1][1])) arr[1][1] = protodef.Term.TermType[arr[1][1]]
      right = new BinaryTree(arr[1][1]);
    }
  }

  return new BinaryTree(arr[0], left, right);
};

let tree = createBinaryTreeFromArray(real);
console.log('******* traversal postorder start *******')
tree.postorder(console.log);
console.log('******* traversal postorder done *******')
console.log(tree);
