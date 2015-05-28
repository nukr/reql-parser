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
    let nextLeft = arr[1][0]
    let nextRight = arr[1][1]
    if (Array.isArray(nextLeft)) {
      left = createBinaryTreeFromArray(nextLeft)
    } else {
      if (Number.isInteger(nextLeft)) {
        nextLeft = protodef.Term.TermType[nextLeft]
      }
      left = new BinaryTree(nextLeft)
    }

    if (Array.isArray(nextRight)) {
      right = createBinaryTreeFromArray(nextRight)
    } else {
      if (Number.isInteger(nextRight)) {
        nextRight = protodef.Term.TermType[nextRight]
      }
      right = new BinaryTree(nextRight);
    }
  }

  return new BinaryTree(arr[0], left, right);
};

let tree = createBinaryTreeFromArray(real);
console.log('******* traversal postorder start *******')
tree.postorder(console.log);
console.log('******* traversal postorder done *******')
console.log(tree);
