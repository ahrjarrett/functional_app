const R = require('ramda')
const { log } = console

class Functor {

  // of :: (Functor f) => a -> fa
  static of(value) {
    return new Functor(value)
  }

  constructor(value) {
    this.value = value
  }

  fmap(fn) {
    return new Functor(fn(this.value))
  }

}

const gt0 = n => n > 0

const fNum = new Functor(10)

log(
  R.map(gt0, [-1]),
  R.map(gt0, [10])
)

