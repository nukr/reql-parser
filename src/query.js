import rethinkdbdash from 'rethinkdbdash'
import protodef from './protodef'
import debug from 'debug'

let log = debug('query')

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
    log('result', result)
    return result.run()
  }

  evaluate (term, internalOptions) {
    internalOptions = internalOptions || {}

    if(!Array.isArray(term)) return term

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
      case termTypes.ADD: // 24
        return this.add(term[1])
      case termTypes.LIMIT: // 71
        return this.limit(term[1])
      case termTypes.WITH_FIELDS: // 96
        return this.withFields(term[1])
      default:
        throw new Error.ReqlRuntimeError("Unknown term")
    }
  }

  db (args) {
    let dbName = args[0]
    log('db')
    return r.db(dbName)
  }

  table (args) {
    let db = this.evaluate(args[0])
    let tableName = args[1]
    log('table')
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
    log('filter')
    return sequence.filter(predicate)
  }

  reduce (args) {
    let sequence = this.evaluate(args[0])
    let predicate = this.evaluate(args[1])
    log('reduce()')
    return sequence.reduce(predicate)
  }

  map (args) {
    let sequence = this.evaluate(args[0])
    let predicate = this.evaluate(args[1])
    log('map()')
    return sequence.map(predicate)
  }

  add (args) {
    let var1 = this.evaluate(args[0])
    let var2 = this.evaluate(args[1])
    log('add()', var1, var2)
    return var1.add(var2);
  }

  func (args) {
    this.fnArgs = this.evaluate(args[0])
    this.funcBody = args[1]
    let vars = ''
    this.fnArgs.forEach(arg => {
      vars = vars + `this.${arg} = ${arg};`
    })
    log('func', vars)
    return new Function(
      this.fnArgs.join(','),
      `
        ${vars};
        return this.evaluate(this.funcBody);
      `
    ).bind(this)
  }

  makeArray (args) {
    log(`makeArray ${args}`)
    return args.map((arg) => `var_${arg}`)
  }

  eq (args) {
    let sequence = this.evaluate(args[0])
    log(`.eq(${args[1]})`)
    return sequence.eq(args[1])
  }

  bracket (args) {
    let sequence = this.evaluate(args[0])
    log(`.(${args[1]})`)
    return sequence(args[1])
  }

  varId (args) {
    log(`${args}`)
    return this[`var_${args}`]
  }

  limit (args) {
    let sequence = this.evaluate(args[0])
    return sequence.limit(args[1])
  }

  withFields (args) {
    let sequence = this.evaluate(args.shift())
    return sequence.withFields(...args)
  }

}

export default Query
