// Define your maps as an array of arrays
let maps = [
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 1, 0, 0, 0, 1,
    1, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 1, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 1, 0, 0, 0, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ]
];

let blocks = [];
let currentMapIndex = 0;
let player;

function setup() {
  createCanvas(800, 800);
  background(0);
  stroke(255);
  spawnBlocks();
  // Spawn the player at a valid starting position
  player = new Block(createVector(width / 2, height / 2), width / sqrt(maps[currentMapIndex].length));
}

function draw() {
  background(0);

  // Move and display the player
  player.move();
  player.show();

  for (let block of blocks) {
    block.show();
  }
}

function keyPressed() {
  // Switch gravity based on arrow keys
  if (keyCode === UP_ARROW) {
    player.setGravity(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    player.setGravity(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    player.setGravity(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    player.setGravity(1, 0);
  }
}

function spawnBlocks() {
  let blockSize = width / sqrt(maps[currentMapIndex].length);
  let positions = Array.from(maps[currentMapIndex], (point, index) => ({
    point,
    pos: createVector((index % sqrt(maps[currentMapIndex].length)) * blockSize, (Math.floor(index / sqrt(maps[currentMapIndex].length))) * blockSize)
  }));

  for (let { point, pos } of positions) {
    if (point === 1) {
      blocks.push(new Block(pos, blockSize));
    }
  }
}

class Block {
  constructor(pos, size) {
    this.pos = pos;
    this.size = size;
    this.gravity = createVector(0, 1); // Initial gravity
    this.velocity = createVector(0, 0);
  }

  // Set the gravity direction
  setGravity(x, y) {
    this.gravity.set(x, y);
  }

  // Move the block based on gravity
  move() {
    this.velocity.add(this.gravity);
    this.pos.add(this.velocity);

    // Check for collisions with other blocks
    for (let block of blocks) {
      if (block !== this && this.collidesWith(block)) {
        // Reset position and velocity on collision
        this.pos.set(this.pos.x - this.velocity.x, this.pos.y - this.velocity.y);
        this.velocity.set(0, 0);
      }
    }

    // Check for collision with walls
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.velocity.x = 0;
    }
    if (this.pos.x + this.size > width) {
      this.pos.x = width - this.size;
      this.velocity.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.velocity.y = 0;
    }
    if (this.pos.y + this.size > height) {
      this.pos.y = height - this.size;
      this.velocity.y = 0;
    }
  }

  // Check for collision with another block
  collidesWith(otherBlock) {
    return (
      this.pos.x < otherBlock.pos.x + otherBlock.size &&
      this.pos.x + this.size > otherBlock.pos.x &&
      this.pos.y < otherBlock.pos.y + otherBlock.size &&
      this.pos.y + this.size > otherBlock.pos.y
    );
  }

  show() {
    noStroke();
    fill(255);
    rect(this.pos.x, this.pos.y, this.size, this.size);
  }
}
