const Frame = require("./Frame");
const FinalFrame = require("./FinalFrame.js");

class Bowling {
  frames = []
  frameIndex = 0;
  scoreModifier = 0;
  gameComplete = false;
  turn;
  pinsLeft;

  constructor() {
    this.frames[this.frameIndex] = new Frame()
  }

  calculateScore() {
    /*   [1] => [1 => 6, 2 => 4]
    [2] => [1 => 10],
    [3] => [1 => 4, 2 => 3] */

    let score = 0
    this.frames.forEach((frame, index) => {
      if (frame instanceof FinalFrame) {
        score += frame.pinsKnockedDown()
        return
      }

      if (frame.isStrike()) {
        score += frame.pinsKnockedDown()
        if (this.frames[index + 1]) {
          score += this.frames[index + 1].pinsKnockedDown()
          if (this.frames[index + 1].isStrike() && this.frames[index + 2]) {
            score += this.frames[index + 2].pinsKnockedLog[0]
          }
        }
      } else if (frame.isSpare()) {
        score += frame.pinsKnockedDown()
        if (this.frames[index + 1]) {
          score += this.frames[index + 1].pinsKnockedLog[0]
        }
      } else {
        score += frame.pinsKnockedDown()
      }
    })

    return score
  }

  newFrame() {
    this.frameIndex++;
    if (this.frameIndex === 9) {
      this.frames[this.frameIndex] = new FinalFrame();
    } else {
      this.frames[this.frameIndex] = new Frame();
    }
  }

  roll(pinsKnockedDown) {
    if (this.gameComplete) {
      return false;
    }

    const frame = this.frames[this.frameIndex];
    frame.roll(pinsKnockedDown);

    console.log(this.frameIndex + 1, this.frames, this.calculateScore());

    if (frame.isComplete() && this.frameIndex < 9) {
      this.newFrame();
    } else if (frame.isComplete() && this.frameIndex === 9) {
      this.gameComplete = true;
    }
  }
}

module.exports = Bowling;

testBowl = new Bowling();
// testBowl.roll(5); 
// testBowl.roll(5); //1 13
// testBowl.roll(3);
// testBowl.roll(6); //2 22
// testBowl.roll(10); //3 39
// testBowl.roll(2);
// testBowl.roll(5); //4  46
// testBowl.roll(5);
// testBowl.roll(5); //5 61
// testBowl.roll(5);
// testBowl.roll(5); //6 76
// testBowl.roll(5);
// testBowl.roll(5); //7 91
// testBowl.roll(10); //8 121
// testBowl.roll(10); //9  131 
// testBowl.roll(10); //10.1 161
// testBowl.roll(10); //10.2
// testBowl.roll(10); //10.3

/* #5      -5
#4			-9
#2			-11
#8			-19
#10			- 39
-
#10			- 59
-
#4			- 67
#3			- 70 */
