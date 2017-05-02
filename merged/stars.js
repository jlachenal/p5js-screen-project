function createStar(x, y) {
  var now = millis();
  if(now - previous > 700){
    stars = [];
    starsgroups.push(stars);
  }
  previous = now;

  var star = {};
  star.x = x;
  star.y = y;
  star.alpha = 255;
  stars.push(star);
}

function drawStars() {
  var star;
  for (var g = 0; g < starsgroups.length; g++) {
    var stars = starsgroups[g];
    //// offscreen check- assume offscreen
    var offscreen = true;
    for(var i = 0; i < stars.length; i++) {
      star = stars[i];
      if (i != stars.length - 1){
        stroke(255,255,255,star.alpha);
        line(star.x, star.y, stars[i+1].x, stars[i+1].y);
      }
      fill(255,255,255,star.alpha);
      ellipse(star.x, star.y, 5, 5);
      star.y = star.y - 0.3;
      star.alpha = star.alpha - 2;
      //// if any one of the stars in the group is NOT offscreen, then the group is not offscreen
      if (star.y > -5) {
        offscreen = false;
      }
    }
    //// if offscreen, remove
    if (offscreen) {
      starsgroups.splice(g, 1);
    }
  }
}
