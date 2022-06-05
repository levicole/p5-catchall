const maxSteps=6
      //rules = {"F" : "FF", "X": "F-[[X]+X]+F[+FX]-X"}
      // rules = {"F" : "FF+F-F+F+FF"}
      // rules = {"F" : "F+F-F-FF+F+F-F"}
      //rules = {
        //"F" : ">F<",
        //"a" : "F[+x]Fb",
        //"b" : "F[-y]Fa",
        //"x" : "a",
        //"y" : "b"
      //}
      //rules = { "X" : "X[-FFF][+FFF]FX", "Y" : "YFX[+Y][-Y]" }
      //rules = { "F" : "FF+[+F-F-F]-[-F+F+F]" }
      //rules = { "X" : "X+YF++YF-FX--FXFX-YF+", "Y" : "-FX+YFYF++YF+FX--FX-Y"}
      //rules = { "X" : "XFX--XFX" }
//let current="-X--X",
    //next="",
    //steps=0,
    //dir = -1,
    //angle,
    //linelen = 5
    //scaleFac = 1.36
    //angleEl,
    //axiomEl,
    //linlenEl,
    //scaleFactorEl,
    //rulesEl;

let current,
    next="",
    steps=0,
    dir = -1,
    angle,
    linelen,
    scaleFac,
    angleEl,
    axiomEl,
    linelenEl,
    scaleFactorEl,
    rulesEl;

function setup() {
  createCanvas(windowHeight, windowHeight);
  axiomEl = document.querySelector("#axiom");
  linelenEl = document.querySelector("#linelen");
  scaleFactorEl = document.querySelector("#scaleFactor");
  rulesEl = document.querySelector("#rules");
  angleEl = document.querySelector("#angle");
  document.querySelector("#reset").addEventListener("click", (e) => {
    reset();
  })
  document.querySelector("#generate").addEventListener("click", (e) => {
    generate();
  })
}

function parseRules(rawRules) {
  return Object.fromEntries(rawRules.split("\n").map( (r) => r.split(/\s?[-]{1,2}>\s?/)))
}

function reset() {
  angle = radians(parseFloat(angleEl.value));
  linelen = parseInt(linelenEl.value)
  scaleFac = parseInt(scaleFactorEl.value)
  rules = parseRules(rulesEl.value)
  current = axiomEl.value
  console.log(angle)
  console.log(linelen)
  console.log(rules)
  generate()
}

function getRule(c) {
  return rules[c] || c;
}

function generate() {
  background(220);
  print(current)
  push()
  translate(width/2, height);
  for(let i = 0; i < current.length; i++) {
    let c = current.charAt(i);
    switch(c) {
      case "F":
        line(0, 0, 0, linelen * dir);
        translate(0, linelen * dir);
        break;
      case "f":
        translate(0, linelen * dir);
        break;
      case "+":
        rotate(-angle);
        break;
      case "-":
        rotate(angle);
        break;
      case "|":
        dir *= -1;
        break;
      case "[":
        push();
        break;
      case "]":
        pop();
        break;
      case "#":
        linelen += linelen;
        break;
      case "!":
        linelen -= linelen;
        break;
      case "@":
        circle(0, 0, linelen);
        break;
      case "{":
        beginShape();
        break;
      case "}":
        endShape()
        break;
      case ">":
        linelen *= scaleFac
        break;
      case "<":
        linelen /= scaleFac
        break;
      case "&":
        angle *= -1;
        break;
      case "(":
        angle -= angle;
        break;
      case ")":
        angle += angle;
        break;
      default:
        break;
    }
  }
  pop();
  next=""
  for(let i = 0; i < current.length; i++) {
    let c = current.charAt(i);
    next += getRule(c);
  }
  current=next;
}
