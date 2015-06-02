import rethinkdbdash from 'rethinkdbdash'
import protodef from './protodef'

let termTypes = protodef.Term.TermType
let r = rethinkdbdash()

class Query {
  constructor (query) {
    this.query = query
  }

  run (query) {
    query = query || this.query
    let result = this.evaluate(query)
    return result.limit(5).run()
  }

  evaluate (term, internalOptions) {
    internalOptions = internalOptions || {}

    let termType = term[0]
    switch (termType) {
      case termTypes.DB: // 14
        return this.db(term[1])
      case termTypes.TABLE: // 15
        return this.table(term[1])
      case termTypes.FILTER: // 39
        return this.filter(term[1])
      case termTypes.FUNC: // 69
        return this.func(term[1])
      default:
    }
  }

  db (args) {
    let dbName = args[0]
    return r.db(dbName)
  }

  table (args) {
    let db = this.evaluate(args[0])
    let tableName = args[1]
    return db.table(tableName)
  }

  filter (args) {
    let sequence = this.evaluate(args[0])
    let predicate = null
    if (Array.isArray(args[1])) {
      predicate = this.evaluate(args[1])
    } else {
      predicate = args[1]
    }
    return sequence.filter(predicate)
  }

  func (args) {
    let fnArgs = this.evaluate(args[0])
    let body = this.evaluate(args[1])
    return (p) => {
      return p('id').eq('0006e572-2f24-4d79-87c3-ea6213caba06')
    }
  }
}

export default Query
