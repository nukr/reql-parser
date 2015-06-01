import BinaryTree from './BinaryTree'
let parser = {}
parser.createBinaryTreeFromArray = (arr) => {
  let left = null, right = null, thisValue = null

  // skip MAKE_ARRAY and VAR
  if (Array.isArray(arr[1]) && arr[0] !== 2 && arr[0] !== 10) {
    left = parser.createBinaryTreeFromArray(arr[1][0])
    right = arr[1][1] ? parser.createBinaryTreeFromArray(arr[1][1]) : null
  } else if (Array.isArray(arr[1])) {
    left = new BinaryTree(arr[1], null, null)
  }

  thisValue = arr[0]

  if (!Array.isArray(arr)) thisValue = arr

  return new BinaryTree(thisValue, left, right)
}

parser.buildReqlFromBTree = (query) => {
  let command = null, argument = null, option = null
  query =
    [ 39,
      [
        [ 15, [ [ 14, ['test'] ], 'bills' ] ],
        [ 69, [ [ 2, [86] ], [ 17, [ [ 170, [ [ 10, [86] ], 'credit' ] ], true ]]]]
      ]
    ]

  // DATUM case
  if (Array.isArray(query) && query.length === 3) {
    command = query[0]
    argument = query[1]
    option = query[2]
  }

  // [command + argument]
  if(Array.isArray(query)) {
  }
  return 'r.db("blog").table("users")'
}

export default parser
