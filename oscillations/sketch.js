const size = 5, scl = 15, numFrames=100;
let frameCount = 0;
const record = false;
let baseColor;

class MixableColor {
  constructor(r,g,b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  
  rgb() {
    return color(this.r, this.g, this.b)
  }
  randomize(w, x, y) {
    w = w > 1 ? 1 : w;
    w = w < 0 ? 0 : w;

    let r = map(noise(x * 0.02, y * 0.02), 0, 1, 0, 255)
    let g = map(noise(x * 0.03, y * 0.03), 0, 1, 0, 255)
    let b = map(noise(x * 0.04, y * 0.04), 0, 1, 0, 255)

    r = (1 - w) * r + w * this.r
    g = (1 - w) * g + w * this.g
    b = (1 - w) * b + w * this.b

    return color(r, g, b)
  }

}

function setup() {
  createCanvas(400, 400);
  createLoop({duration: 2, gif: {render: record, download: record}})
  noStroke();
  baseColor = new MixableColor(246, 198, 234);
  console.log(baseColor)
  // createLoop({duration: 3})
}

function cOffset(x, y) {
  // return 0.01 * dist(x, y, width/2, height/2)
  return (x + 1.5 * y) * 0.005
}

function periodic(p) {
  // return map(sin(TWO_PI * p), -1, 1, 0, PI)
  return abs(1.0 * sin(TWO_PI * p))
}

function draw() {
  background("rgb(205, 240, 234)");
  let t = 1.0 * frameCount/numFrames;
  for(let y = scl; y <= height; y += scl) {
    for (let x = 0; x <= width + scl; x += scl) {
      let d = dist(x, y, width, height)
      let size = periodic(animLoop.progress - cOffset(x, y));
      let length = floor(scl/2) - 2;
      fill(baseColor.randomize(0.4, x, y))
      push()
      translate(x - length, y - length)
      rotate(size)
      ellipse(0, 0, scl, scl/3)
      pop()
    }
  }

  frameCount = (frameCount + 1) % numFrames
}
