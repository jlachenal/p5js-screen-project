// Watercolor
// Levente Sandor, 2013

var Brush = function(width, height) {
  this.angle = random(TWO_PI);
  this.x = random(width);
  this.y = random(height);
  this.clr = color(random(255), random(255), random(255), 5);
  this.components = [];
  for (var i = 0; i < 2; i++) {
    this.components.push(random(1, 5));
  }
}

Brush.prototype.draw = function(g) {
  var a = 0;
  var r = 0;
  var x1 = this.x;
  var y1 = this.y;
  var u = random(0.5, 1);

  g.fill(this.clr);
  g.noStroke();

  g.beginShape();
  while (a < TWO_PI) {
    g.vertex(x1, y1);
    var v = random(0.85, 1);
    x1 = this.x + r * cos(this.angle + a) * u * v;
    y1 = this.y + r * sin(this.angle + a) * u * v;
    a += PI / 180;
    for (var i = 0; i < 2; i++) {
      r += sin(a * this.components[i]);
    }
  }
  g.endShape(CLOSE);

  if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
    this.angle += HALF_PI;
  }

  this.x += 2 * cos(this.angle);
  this.y += 2 * sin(this.angle);
  this.angle += random(-0.15, 0.15);
}
