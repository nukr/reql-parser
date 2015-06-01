/* global describe, it */
import {expect} from 'chai'
import fixtures from '../fixtures'
import BinaryTree from '../src/BinaryTree'
import parser from '../src/parser'
import translate from '../src/translate'

describe('building tree from array', () => {
  it('tree should instanceof BinaryTree', () => {
    let tree = parser.createBinaryTreeFromArray(fixtures.reql.simple)
    expect(tree).to.be.instanceof(BinaryTree)
  })

  it('simple case deep equal', () => {
    let tree = parser.createBinaryTreeFromArray(fixtures.reql.simple)
    expect(tree).to.be.deep.equal({
      value: 15,
      left: {value: 14,
        left: {value: 'blog', left: null, right: null},
        right: null
      },
      right: { value: 'users', left: null, right: null}
    })
  })

  it('MAKE_ARRAY as expected', () => {
    let tree = parser.createBinaryTreeFromArray(fixtures.reql.makeArray)
    expect(tree).to.be.deep.equal({
      value: 2,
      left: {value: [10, 20, 30], left: null, right: null},
      right: null
    })
  })

  it('VAR as expected', () => {
    let tree = parser.createBinaryTreeFromArray(fixtures.reql.arrayOnlyContainOneNumber)
    expect(tree).to.be.deep.equal({
      value: 10,
      left: {value: [1], left: null, right: null},
      right: null
    })
  })

  it('translate term', () => {
    expect(translate(1)).to.be.equal('DATUM')
    expect(translate(14)).to.be.equal('DB')
    expect(translate(15)).to.be.equal('TABLE')
    expect(translate(39)).to.be.equal('FILTER')
    expect(translate(999)).to.be.equal(undefined)
  })

})

describe('walking through the tree', () => {
  it('postorder', () => {
    let arr = []
    let tree = parser.createBinaryTreeFromArray(fixtures.reql.reql)
    tree.postorder((value) => {
      Number.isInteger(value) ? arr.push(translate(value)) : arr.push(value)
    })
    expect(arr).to.be.deep.equal(
      ['blog', 'DB', 'users', 'TABLE', { name: 'Michel'}, 'FILTER']
    )
  })

  it('preorder', () => {
    let arr = []
    let tree = parser.createBinaryTreeFromArray(fixtures.reql.reql)
    tree.preorder((value) => {
      Number.isInteger(value) ? arr.push(translate(value)) : arr.push(value)
    })
    expect(arr).to.be.deep.equal(
      ['FILTER', 'TABLE', 'DB', 'blog', 'users', { name: 'Michel'}]
    )
  })

  it('inorder', () => {
    let arr = []
    let tree = parser.createBinaryTreeFromArray(fixtures.reql.reql)
    tree.inorder((value) => {
      Number.isInteger(value) ? arr.push(translate(value)) : arr.push(value)
    })
    expect(arr).to.be.deep.equal(
      ['blog', 'DB', 'TABLE', 'users', 'FILTER', { name: 'Michel'}]
    )
  })

  it('levelorder', () => {
    let arr = []
    let tree = parser.createBinaryTreeFromArray(fixtures.reql.reql)
    tree.levelorder((value) => {
      Number.isInteger(value) ? arr.push(translate(value)) : arr.push(value)
    })
    expect(arr).to.be.deep.equal(
      ['FILTER', 'TABLE', { name: 'Michel'}, 'DB', 'users', 'blog']
    )
  })
})

describe('build js reql form from BinaryTree', () => {
  it('build simple reql', () => {
    let tree = parser.createBinaryTreeFromArray(fixtures.reql.filterWithFunc)
    let query = parser.buildReqlFromBTree(tree)
    expect(query).to.be.equal('r.db("blog").table("users")')
  })
})
