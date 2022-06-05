const perturbation = 3.6;
let scl = 4, dots = [], seedColor, rows, cols;

function seedCanvas() {
  // need to make this one dimentional...
  
  for(let j = 0; j < rows + 1; j++) {
    for(let i = 0; i < cols + 1; i++) {
      let dot = new Dot(
        i,
        j
      )
      dots[j * rows + i] = dot
      let coinFlip = random(1)
      if(coinFlip < 0.004) {
        dot.color = seedColor;
      }
    }
  }
}

function fillCanvas() {
  let active = dots.filter(f => f.color && !f.visited)
  if(active.length > 0) {
    let idx = floor(random(active.length));
    let pick = active[idx];
    pick.draw();
    pick.visited = true;
    pick.perturb();
  }
}

function setup() {
  // seedColor = new MixableColor(194, 222, 209)
  seedColor = new MixableColor(246, 198, 234);
  createCanvas(800 + (scl * 2), 800 + (scl * 2));
  cols = width/scl;
  rows = height/scl;
  noStroke();
  seedCanvas();
  background(205, 240, 234);
}

function draw() {
  for(let i = 0; i < 200; i++) {
    fillCanvas()
  }
}
