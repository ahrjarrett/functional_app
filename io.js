// identity monad, rewritten to be lazy

class IO {

  // of :: (IO f) => a -> f a
  static of(value) { return new IO(value) }

  constructor(value) {
    if(typeof value !== 'function')
      throw new Error('IO monad takes a function as argument')
    this.value = value
  }

  // fmap :: (IO f) => f a ~> (a -> b) -> f b
  fmap(fn) {
    return new IO( () => fn(this.run()) )
  }

  // ap :: (IO f) => f a ~> f (a -> b) -> f b
  ap(aFn) {
    return IO.of( () => aFn.run()(this.run()) )
  }

  // chain :: (IO f) => f a ~> (a -> f b) -> f b
  chain(fnA) {
    return fnA( this.value() )
    // or, could alternately (less readably) be written as:
    //return IO.of( () => fnA(this.run()).run() )
  }

  // run :: (IO f) => f a ~> () -> a
  run() {
    return this.value()
  }

}


