import BinaryTree from './BinaryTree'

let isArray = Array.isArray
let parser = {}

/**
 *
 *
 */

let createBinaryTreeFromArray = (arr) => {
  let left = null, right = null, thisValue = null

  if (isArray(arr[0])) {
    left = createBinaryTreeFromArray(arr[0])
  }

  // skip MAKE_ARRAY and VAR
  if (isArray(arr[1]) && arr[0] !== 2 && arr[0] !== 10) {
    left = arr[1][0] ? createBinaryTreeFromArray(arr[1][0]) : null
    right = arr[1][1] ? createBinaryTreeFromArray(arr[1][1]) : null
  } else if (isArray(arr[1])) {
    left = new BinaryTree(arr[1], null, null)
  }

  thisValue = arr[0]

  if (!isArray(arr)) thisValue = arr

  return new BinaryTree(thisValue, left, right)
}

parser.createBinaryTreeFromArray = createBinaryTreeFromArray

export default parser
