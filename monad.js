const R = require('ramda')
const { log } = console

class Identity {

  // of :: (Identity f) => a -> f a
  static of(value) {
    return new Identity(value)
  }

  constructor(value) {
    this.value = value
  }

  // fmap :: (Identity f) => f a ~> (a -> b) -> f b
  fmap(fn) {
    return new Identity(fn(this.value))
  }

  // ap :: (Identity f) => f a ~> f (a -> b) -> f b
  ap(aFn) {
    return this.fmap(aFn.value)
  }

  // chain :: (Identity f) => f a ~> (a -> f b) -> f b
  chain(fnA) {
    return fnA(this.value)
    // Or, the more verbose version:
    // return Identity.of(fnA(this.value).value)
  }

}

const { compose, equals } = R
const id = x => x
const f = n => n * 1.07 + 10
const g = n => 100 - n
const fg = R.compose(g, f)

const fa = new Identity('Apply Work')
const mf = n => Identity.of(f(n))
const mg = n => Identity.of(g(n))


/************************************/
/********** NOTES & LOGS ************/
/************************************/

/**** APPLY ****/
log(
  // same!
  fa.ap(new Identity(R.toUpper)),
  fa.fmap(R.toUpper)
) // Identity { value: 'APPLY WORK' }

// this second one gets a little more confusing, but notice that if you
// read it, it makes sense. also notice that the predicate Identity
// can hold a function itself, and returns a value when the 2nd
// Identity returns a function itself applied to a value
// NOTE:(revise for correctness)

/**** APPLICATIVE ****/
log(equals(
  Identity.of(100).ap(Identity.of(f)),
  Identity.of(f).ap(Identity.of(fn => fn(100)))
)) // true

/**** CHAIN ****/
log(
  Identity.of(100).fmap(mf).value.fmap(mg).value,
  Identity.of(100).chain(mf).chain(mg)
) // Identity { value: 17 }

