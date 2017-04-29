// Watercolor
// Levente Sandor, 2013

var brushes = [];


var Brush = function() {
  this.angle = random(TWO_PI);
  this.x = random(width);
  this.y = random(height);
  this.clr = color(random(255), random(255), random(255), 5);
  this.components = [];
  for (var i = 0; i < 2; i++) {
    this.components.push(random(1, 5));
  }
}

Brush.prototype.pavar = function() {
  var a = 0;
  var r = 0;
  var x1 = this.x;
  var y1 = this.y;
  var u = random(0.5, 1);

  fill(this.clr);
  noStroke();

  beginShape();
  while (a < TWO_PI) {
    vertex(x1, y1);
    var v = random(0.85, 1);
    x1 = this.x + r * cos(this.angle + a) * u * v;
    y1 = this.y + r * sin(this.angle + a) * u * v;
    a += PI / 180;
    for (var i = 0; i < 2; i++) {
      r += sin(a * this.components[i]);
    }
  }
  endShape(CLOSE);

  if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
    this.angle += HALF_PI;
  }

  this.x += 2 * cos(this.angle);
  this.y += 2 * sin(this.angle);
  this.angle += random(-0.15, 0.15);
}

function setup() {
  createCanvas(720, 1280);
  background(255);
  for (var i = 0; i < 50; i++) {
    brushes.push(new Brush());
  }
}

var fs = false;
function keyPressed() {
  fs = !fs;
  fullscreen(fullscreen);
}

function draw() {
  for (i = 0; i < brushes.length; i++) {
    var brush = brushes[i];
    brush.pavar();
  }
}

function mouseClicked() {
  setup();
}
