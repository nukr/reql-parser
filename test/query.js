/* global describe, it */
import {expect} from 'chai'
import Query from '../src/query'
import r from 'rethinkdb'

describe('build query from array', () => {
  it("simple query r.db('test').table('bills')", () => {
    let query = new Query(r.db('test').table('bills').build())
    let promise = query.run()
    promise.then((result) => {
      expect(result.length).to.be.equal(35177)
    })
  })

  it("filter with objet", () => {
    let query = new Query(r.db('test').table('bills').filter({billNo: 13799}).build())
    let promise = query.run()
    promise.then((result) => {
      expect(result[0].id).to.be.equal('0006e572-2f24-4d79-87c3-ea6213caba06')
    })
  })

  it("filter with function", () => {
    let query = new Query(
      r.db('test').table('bills').filter((bill) => {
        return bill('id').eq('0006e572-2f24-4d79-87c3-ea6213caba06')
      }).build()
    )
    let promise = query.run()
    promise.then((result) => {
      expect(result[0].id).to.be.equal('0006e572-2f24-4d79-87c3-ea6213caba06')
    })
  })

  it("filter with function", () => {
    let query = new Query(
      r.db('test').table('bills').filter((bill) => {
        return bill('id').eq('0006e572-2f24-4d79-87c3-ea6213caba06')
      }).build()
    )
    let promise = query.run()
    promise.then((result) => {
      expect(result[0].id).to.be.equal('0006e572-2f24-4d79-87c3-ea6213caba06')
    })
  })

  it('map reduce add', () => {
    let query = new Query(
      r.db('test').table('bills')
      .map(function(bill){
        return 1
      })
      .reduce(function (left, right){
        return left.add(right)
      }).build()
    )
    let promise = query.run()
    promise.then(result => {
      expect(result).to.be.equal(35177)
    })
  })

  it('withFields', () => {
    let query = new Query(r.db('test').table('bills').withFields('billNo', 'creator').limit(1).build())
    let promise = query.run()
    promise.then(result => {
      expect(Object.keys(result[0])).to.be.deep.equal(['billNo', 'creator'])
    })
  })
})
