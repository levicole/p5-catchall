let pd;

function setup() {
  createCanvas(400, 400);
  pd = new PoissonDisk(10, 30);
  pd.run();
}

function draw() {
  background(220);
  let points = pd.points;
  fill(1)

  points.forEach(p => {
    circle(p.x, p.y, 4);
  })
}

function vdist(pt1, pt2) {
  return dist(pt1.x, pt1.y, pt2.x, pt2.y);
}


class PoissonDisk {
  constructor(r, k) {
    this.r = r;
    this.cellSize = floor(r/sqrt(2));
    this.rows = ceil(height / this.cellSize);
    this.cols = ceil(width / this.cellSize);
    this.grid = [];
    this.active = [];
    this.points = [];
    this.k = k

    for(let i=0; i < this.cols; i++) {
      this.grid[i] = [];
      for(let j=0; j < this.rows; j++) {
        this.grid[i].push(null);
      }
    }

    this.initialize();
  }

  initialize() {
    let x = random(0, width);
    let y = random(0, height);
    let p0 = createVector(x, y);
    this.insertPoint(p0);
    this.active.push(p0);
    this.points.push(p0)
  }

  validPoint(p) {
    if(p.x < 0 || p.x >=width || p.y < 0 || p.y >= height) {
      return false
    }

    let x = floor(p.x / this.cellSize);
    let y = floor(p.y / this.cellSize);

    let i0 = max(x - 1, 0);
    let i1 = min(x + 1, this.cols - 1);
    let j0 = max(y - 1, 0);
    let j1 = min(y + 1, this.rows - 1);

    let result = true
    for(let i = i0; i <= i1; i++) {
      for(let j = j0; j <= j1; j++) {
        let op = this.grid[i][j];
        if(op != null) {
          if(dist(op.x, op.y, p.x, p.y) < this.r) {
            result = false;
            break
          }
        }
      }
    }

    return result
  }

  step() {
    let idx = floor(random(this.active.length))
    let pt = this.active[idx]
    let found = false;

    for(let i = 0; i <= this.k; i++) {
      let r = random(this.r, 2 * this.r);
      let angle = p5.Vector.random2D().heading();
      let x = pt.x + cos(angle) * r;
      let y = pt.y + sin(angle) * r;
      let newPt = createVector(x,y);

      if(!this.validPoint(newPt)) {
        continue
      }

      this.points.push(newPt);
      this.insertPoint(newPt);
      this.active.push(newPt)
      found = true
      break
    }

    if(!found) {
      this.active.splice(idx, 1)
    }
  }

  run() {
    while(this.active.length > 0) {
      this.step()
    }
  }

  insertPoint(pt) {
    let x = floor(pt.x / this.cellSize);
    let y = floor(pt.y / this.cellSize);
    this.grid[x][y] = pt;
  }
}