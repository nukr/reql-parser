/* global describe, it */
import {expect} from 'chai'
import Query from '../src/query'

describe('build query from array', () => {
  it("simple query r.db('test').table('bills')", () => {
    let query = new Query([15, [ [14, ['test']], 'bills' ] ])
    let promise = query.run()
    promise.then((result) => {
      expect(result.length).to.be.equal(5)
    })
  })

  it("r.db('test').table('bills').filter({billNo: 13799})", () => {
    let query = new Query([39, [[15, [[14, ['test']], 'bills']], {billNo: 13799}]])
    let promise = query.run()
    promise.then((result) => {
      expect(result[0].id).to.be.equal('0006e572-2f24-4d79-87c3-ea6213caba06')
    })
  })

  it("r.db('test').table('bills').filter((b) => {b('id').eq('0006e572-2f24-4d79-87c3-ea6213caba06')})", () => {
    let query = new Query([ 39, [ [ 15, [ [ 14, ['test'] ], 'bills' ] ], [ 69, [ [ 2, [86] ], [ 17, [ [ 170, [ [ 10, [86] ], 'credit' ] ], true]]]]]])
    let promise = query.run()
    promise.then((result) => {
      expect(result[0].id).to.be.equal('0006e572-2f24-4d79-87c3-ea6213caba06')
    })
  })
})
