const Frame = require('./Frame');

module.exports =  class FinalFrame extends Frame {
  MAX_TURN_INDEX = 2;

  isComplete() {
    console.log('Final frame turn', this.turn)
    return this.turn === this.MAX_TURN_INDEX || (this.turn === 1 && !(this.isStrike() || this.isSpare()))
  }
}
