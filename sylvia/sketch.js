var stars = [];
var paingting = false;
var secsdelay;

function setup() {
  createCanvas(640, 480);
}

function mouseClicked() {
  var star = {};
  star.x = mouseX;
  star.y = mouseY;
  stars.push(star);
  console.log(stars);

}

function draw() {
  clear();
  fill(255);
  for(var i = 0; i < stars.length; i++){
    if (i != stars.length - 1){
    line(stars[i].x, stars[i].y, stars[i+1].x, stars[i+1].y);
  }
    ellipse(stars[i].x, stars[i].y, 5, 5);
    stars[i].y = stars[i].y - 1;
    opacity
  }
//  var secdelay {
//    if mousePress
//  }
}


//function secsdelay() {
//  painting = false;
//}
