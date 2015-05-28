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
  let a = createBinaryTreeFromArray(reql);
})
