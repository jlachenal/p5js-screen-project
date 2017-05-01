var starsgroups = [];
var stars = [];
var previous;
var img;

// var paingting = false;
// var secsdelay;

function setup() {
  createCanvas(361, 641);
  starsgroups.push(stars);
  previous = millis();
  img = loadImage('image/bg.jpg');
}

function mouseClicked() {
  var now = millis();
  if(now - previous > 700){
    stars = [];
    starsgroups.push(stars);
  }
  previous = now;

  var star = {};
  star.x = mouseX;
  star.y = mouseY;
  star.alpha = 255;
  stars.push(star);
  console.log(stars);

}


function draw() {
  background(img);
  var star;
  for (var g = 0; g < starsgroups.length; g++) {
    var stars = starsgroups[g];
    for(var i = 0; i < stars.length; i++) {
      star = stars[i];
      if (i != stars.length - 1){
        stroke(255,255,255,star.alpha);
        line(star.x, star.y, stars[i+1].x, stars[i+1].y);
      }
      fill(255,255,255,star.alpha);
      ellipse(star.x, star.y, 5, 5);
      star.y = star.y - 0.3;
      star.alpha = star.alpha - 0.5;
    }
  }
}

//  var secdelay {
//    if mousePress
//  }



//function secsdelay() {
//  painting = false;
//}
