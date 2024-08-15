module.exports = class Frame {
  turn = 0
  MAX_TURN_INDEX = 1

  constructor() {
    this.pinsKnockedLog = Array(this.MAX_TURN_INDEX + 1).fill(0)
  }

  isSpare() {
    return this.pinsKnockedLog[0] + this.pinsKnockedLog[1] === 10
  }

  isStrike() {
    return this.pinsKnockedLog[0] === 10
  }

  roll(pinsKnockedDown) {
    if (pinsKnockedDown > 10) {
      throw new Error("You can't knock down more than 10 pins in a single roll!")
    }

    if (this.turn > this.MAX_TURN_INDEX) {
      throw new Error(`You can't roll more than ${this.MAX_TURN_INDEX} times in this frame!`)
    }

    this.pinsKnockedLog[this.turn] = pinsKnockedDown
    ++this.turn
  }

  isComplete() {
    return this.turn === this.MAX_TURN_INDEX + 1 || this.isStrike()
  }

  pinsKnockedDown() {
    return this.pinsKnockedLog.reduce((a, b) => a + b, 0)
  }
}
