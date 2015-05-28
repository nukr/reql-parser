import chai from 'chai';
import {reql} from '../fixtures/reql'
import BinaryTree from '../src/BinaryTree';
import {createBinaryTreeFromArray} from '../src/parser.js';
let should = chai.should();

describe('building tree from array', () => {
  it('tree should instanceof BinaryTree', () => {
    let tree = createBinaryTreeFromArray(reql);
    tree.should.be.instanceof(BinaryTree);
  });
  let expected = JSON.stringify({"value":"FILTER","left":{"value":"TABLE","left":{"value":"DB","left":{"value":"blog"},"right":{}},"right":{"value":"users"}},"right":{"value":{"name":"Michel"}}})
  let result = JSON.stringify(createBinaryTreeFromArray(reql));
  it('equal object', () => {
    result.should.be.deep.equal(expected);
  })
})
