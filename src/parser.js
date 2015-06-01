import BinaryTree from './BinaryTree'
import translate from './translate'
import _ from 'lodash'
import rethinkdbdash from 'rethinkdbdash'
import co from 'co'

const r = rethinkdbdash()

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

let isTree = (tree) => {
  let left = null
  let right = null
  let value = null
  if (typeof tree !== 'undefined' && tree !== null) {
    let keys = Object.keys(tree)

    keys.forEach((key) => {
      switch (key) {
        case 'left':
          left = true
          break
        case 'right':
          right = true
          break
        case 'value':
          value = true
          break
      }
    })
  }

  if (left && right && value) {
    return true
  } else {
    return false
  }
}

let extractTree = (tree) => {
  let arr = []
  if (Array.isArray(tree.value)) {
    arr.push({array: tree.value})
  } else {
    arr.push(tree.value)
  }

  if (isTree(tree.left) && tree.right !== null) {
    arr.unshift(extractTree(tree.left))
  } else if (isTree(tree.left) && tree.right === null) {
    arr.push(extractTree(tree.left))
  }

  if (isTree(tree.right)) {
    arr.push(extractTree(tree.right))
  }
  return arr
}

parser.buildReqlFromBTree = (tree) => {

  let arr = _.flattenDeep(extractTree(tree))

  co(function * () {
    // let db = r.db('test')
    let table = r.table('bills')
    let filter = r.filter({credit: true})
    console.log(yield filter.run())
  })

  // co(function * () {
  //   let result = yield eval('r.db("test").table("bills").limit(5).run()')
  //   console.log(result)
  // })
  return 'r.db("blog").table("users")'
}

export default parser
