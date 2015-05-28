import chai from 'chai';
import {createBinaryTreeFromArray} from '../src/parser.js';
let should = chai.should();

describe('building tree from array', () => {
  it('should be return a BinaryTree', () => {
    let tree = createBinaryTreeFromArray([14, ['blog']]);
    tree.should.be.an('object');
  })
  it('more test', () => {
    let tree = createBinaryTreeFromArray([39,[[15,[[14,["blog"]],"users"]],{"name":"Michel"}]])
    tree.should.be.an('object');
  });
  it('one more test', () => {
    let tree = createBinaryTreeFromArray([39,[[15,[[14,["blog"]],"users"]],{"name":"Michel"}]])
    tree.should.be.an('object');
  });
  it('testing testing testing testing', () => {
    let tree = createBinaryTreeFromArray([39,[[15,[[14,["blog"]],"users"]],{"name":"Michel"}]])
    tree.should.be.an('object');
  });
})
