import protodef from './reverse-protodef';
import BinaryTree from './BinaryTree';

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

export {createBinaryTreeFromArray}
