const R = require('ramda')
const { log } = console
const { map, compose, equals } = R


class Maybe {

  // of :: (Maybe m) => a -> m a
  static of(value) {
    return new Just(value)
  }

  // toMaybe :: (Maybe m) => a -> m a
  static toMaybe(value) {
    return value == null ? new Nothing() : new Just(value)
  }

  constructor(value) {
    if(this.constructor === Maybe) {
      throw new Error('Maybe cannot be used as a constructor!')
    }
    if(!this.isNothing) {
      this.value = value
    }
  }

}


class Just extends Maybe {

  get isJust() { return true }
  get isNothing() { return false }

  // fmap :: (Maybe m) => m a ~> (a -> b) -> m b
  fmap(fn) {
    return new Just(fn(this.value))
  }

  // ap :: (Maybe m) => m a ~> m (a -> b) -> m b
  ap(aFn) {
    /* implemented new version of `ap` to keep from throwing error if
     * we call toMaybe on null value (which isn't a function) */
    return aFn.chain(fn => Just.of(fn(this.value)))
    //return this.fmap(aFn.value)
  }

  // chain :: (Maybe m) => m a ~> (a -> m b) -> m b
  chain(fnA) {
    return fnA(this.value)
  }

}


class Nothing extends Maybe {

  get isJust() { return false }
  get isNothing() { return true }

  // fmap :: (Maybe m) => m a ~> (a -> b) -> m b
  fmap(_) {
    return this
  }

  // ap :: (Maybe m) => m a ~> m (a -> b) -> m b
  ap(_) {
    return this
  }

  // chain :: (Maybe m) => m a ~> (a -> m b) -> m b
  chain(_) {
    return this
  }

}

const id = x => x
const f = n => n * 1.07 + 10
const g = n => 100 - n
const fg = compose(g, f)

const fa = new Just('wut up werld')
const mf = n => Just.of(f(n))
const mg = n => Just.of(g(n))

const { toMaybe } = Maybe

log(
  toMaybe(100).ap(toMaybe(x => x + 100)),
  toMaybe(null).ap(toMaybe(x => x + 111))
)

log(
  Just.of(':)').ap(toMaybe(null))
  // this is why we did that juju on Just's ap method above
)

