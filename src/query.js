import rethinkdbdash from 'rethinkdbdash'
import protodef from './protodef'

let termTypes = protodef.Term.TermType
let r = rethinkdbdash({
  host: '192.168.100.5',
  port: 28015
})

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
      case termTypes.MAKE_ARRAY: // 2
        return this.makeArray(term[1])
      case termTypes.VAR: // 10
        return this.varId(term[1])
      case termTypes.EQ: // 17
        return this.eq(term[1])
      case termTypes.BRACKET: // 170
        return this.bracket(term[1])
      case termTypes.REDUCE: // 37
        return this.reduce(term[1])
      case termTypes.MAP: // 38
        return this.map(term[1])
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

  reduce (args) {
    console.log(JSON.stringify(args, null, 2))
  }

  map (args) {
    console.log(args)
  }

  func (args) {
    this.fnArgs = this.evaluate(args[0])
    this.funcBody = args[1]
    return new Function(
      this.fnArgs.join(','),
      `
        this.runtimeVar = ${this.fnArgs};
        return this.evaluate(this.funcBody);
      `
    ).bind(this)
  }

  makeArray (args) {
    return args.map((arg) => `var_${arg}`)
  }

  eq (args) {
    let sequence = this.evaluate(args[0])
    return sequence.eq(args[1])
  }

  bracket (args) {
    let sequence = this.evaluate(args[0])
    return sequence(args[1])
  }

  varId (args) {
    return this.runtimeVar
  }

}

export default Query
