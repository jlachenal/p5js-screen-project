// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Recursion

//var stars=[];

// function setup() {
//   createCanvas(640,360);
// }
//
// function draw() {
//   background(51);
//   drawCircle(width/2,height/2,width);
//   for(var i=0; i<stars.length; i=i+1){
//     ellipse(stars[i].x, stars[i].y, stars[i].r, stars[i].r);
//   }
// }
// function mouseClicked() {
//   var star={};
//   star.x=mouseX;
//   star.y=mouseY;
//   star.r=6;
//   stars.push(star);
// }
// // Very simple function that draws one circle
// // and recursively calls itself
// function drawCircle(x,y,r) {
//   stroke(255);
//   noFill();
//   ellipse(x, y, r, r);
//   // Exit condition, stop when radius is too small
//   if(r > 2) {
//     r *= 0.75;
//     // Call the function inside the function! (recursion!)
//     drawCircle(x, y, r);
//
//   }
// }

// Watercolor
// Levente Sandor, 2013

var brushes = [];


var Brush = function() {
  this.angle = random(TWO_PI);
  this.x = random(width);
  this.y = random(height);
  this.clr = color(random(255), random(255), random(255), 5);
  this.components = [];
  this.alpha = random(30);
//original  for (var i = 0; i < 2; i++) {
for (var i = 0; i < 2; i=i+1) {
    this.components.push(random(1, 5));
  }
}

Brush.prototype.draw = function() {
  var a = 0;
  var r = 0;
  var x1 = this.x;
  var y1 = this.y;
  var u = random(0.0, 1);

  fill(this.clr);
  noStroke();
  //this is the code that defines the polygon from begin to endshape
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

  this.x += 4 * cos(this.angle);
  this.y += 4 * sin(this.angle);
  this.angle += random(-0.01, 0.15);
  this.clr = color(
    red(this.clr),
    green(this.clr),
    blue(this.clr),
    alpha(this.clr) - 0.05
  );
}

function setup() {
  createCanvas(500, 500);
  background(255);
// for (var i = 0; i < 50; i++) {
//     brushes.push(new Brush());
//   }
}

function draw() {
for (i = 0; i < brushes.length; i++) {
    // for (var i = 0; i < 2; i=i+1) {
    var brush = brushes[i];
    brush.draw();
  }
}
function mouseMoved() {
//function mouseClicked() {
  var brush= new Brush();
  brush.x=mouseX;
  brush.y=mouseY;
//  brush.r=6;
//  brush.draw();
brushes.push(brush)
}
// function mouseClicked() {
//   setup();
// }
