class Dot {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.visited = false;
  }

  draw() {
    fill(this.color.fillColor());
    circle(this.x * scl, this.y * scl, 1.4 * scl)
  }

  perturb() {
    for(let y = this.y - 1; y <= this.y + 1; y++) {
        for(let x = this.x - 1; x <= this.x + 1; x++ ) {
            if(this.x == x && this.y == y) {
                continue;
            }
            if(x >= 0 && x < cols && y >= 0 && y < rows) {
                try {
                    let dot = dots[y * rows + x];
                    if(!dot.visited && !dot.color) {
                        dot.color = this.color.perturb(perturbation)
                    }
                } catch {
                    console.log(`x: ${x}, y: ${y}`)
                }
            }
        }
    }
  }
}

class MixableColor {
  constructor(r,g,b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  fillColor() {
    return color(this.r, this.g, this.b)
  }

  perturb(w) {
    let r = randomGaussian() * w + this.r;
    let g = randomGaussian() * w + this.g;
    let b = randomGaussian() * w + this.b;

    return new MixableColor(r, g, b)
  }
}
