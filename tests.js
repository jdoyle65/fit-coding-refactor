const Bowling = require('./index');

function test1() {
  const game = new Bowling();
  while (!game.gameComplete) {
    game.roll(4);
  }

  console.assert(game.calculateScore() === 80, `Test 1 failed. Expected 80, but got ${game.calculateScore()}`);
}

function perfectGameTest() {
  const game = new Bowling();
  while (!game.gameComplete) {
    game.roll(10);
  }

  console.assert(game.calculateScore() === 300, `Test 2 failed. Expected 300, but got ${game.calculateScore()}`);
}

// test1();
perfectGameTest();
