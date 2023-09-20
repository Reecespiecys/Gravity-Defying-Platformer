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

function setup() {
  createCanvas(800, 800);
  background(0);
  stroke(255);
  spawnBlocks();
}

function draw() {
  background(0);
  for (let block of blocks) {
    block.show();
  }
}

function mousePressed() {
  switchToNextMap();
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
  }
  
  show() {
    noStroke();
    fill(255);
    rect(this.pos.x, this.pos.y, this.size, this.size);
  }
}

// Function to switch to the next map (you can modify this logic as needed)
function switchToNextMap() {
  currentMapIndex = (currentMapIndex + 1) % maps.length;
  clearCanvas(); // Optional: Clear the canvas when switching maps
  blocks = []; // Clear the blocks array
  spawnBlocks(); // Spawn blocks for the new map
}

// Optional: Function to clear the canvas
function clearCanvas() {
  background(0);
}
