/* global describe, it */
/* eslint-disable no-unused-vars */
const should = require('chai').should()
/* eslint-disable no-unused-vars */

import fixtures from '../fixtures'
import BinaryTree from '../src/BinaryTree'
import parser from '../src/parser.js'

describe('building tree from array', () => {
  it('tree should instanceof BinaryTree', () => {
    let tree = parser.createBinaryTreeFromArray(fixtures.reql.simple)
    tree.should.be.instanceof(BinaryTree)
  })

  it('deep equal', () => {
    let tree = parser.createBinaryTreeFromArray(fixtures.reql.simple)
    tree.should.be.deep.equal({
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
    tree.should.be.deep.equal({
      value: 2,
      left: {value: [10, 20, 30], left: null, right: null},
      right: null
    })
  })

  it('Array only contain one number', () => {
    let tree = parser.createBinaryTreeFromArray(fixtures.reql.arrayOnlyContainOneNumber)
    tree.should.be.deep.equal({
      value: 10,
      left: {value: [1], left: null, right: null},
      right: null
    })
  })
})
