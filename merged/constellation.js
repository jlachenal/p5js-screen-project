function drawConstellation() {
  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();
  if (!positions) {
    return;
  }

// draw ALL the points
  // for (var i=0; i<positions.length; i++) {
  // set the color of the ellipse based on position on screen
  // fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
  // draw ellipse at each position point
  // var val = slider.value();
  // ellipse(positions[i][0], positions[i][1], 2, 2);

  stroke(202, 244, 234);
  // nose line
  line(positions[33][0], positions[33][1], positions[41][0], positions[41][1]);
  line(positions[41][0], positions[41][1], positions[62][0], positions[62][1]);

  // nose stars
  ellipse(positions[33][0], positions[33][1], 2, 2);
  ellipse(positions[41][0], positions[41][1], 2, 2);
  ellipse(positions[62][0], positions[62][1], 1, 1);

  // right eye
  stroke(113, 205, 189);
  line(positions[23][0], positions[23][1], positions[63][0], positions[63][1]);
  line(positions[63][0], positions[63][1], positions[24][0], positions[24][1]);
  line(positions[24][0], positions[24][1], positions[64][0], positions[64][1]);
  line(positions[64][0], positions[64][1], positions[25][0], positions[25][1]);
  line(positions[25][0], positions[25][1], positions[65][0], positions[65][1]);
  line(positions[65][0], positions[65][1], positions[26][0], positions[26][1]);
  line(positions[26][0], positions[26][1], positions[66][0], positions[66][1]);
  line(positions[66][0], positions[66][1], positions[23][0], positions[23][1]);

  // right eye stars
  ellipse(positions[23][0], positions[23][1], 1, 2);
  ellipse(positions[24][0], positions[24][1], 2, 2);
  ellipse(positions[64][0], positions[64][1], 3, 3);
  ellipse(positions[26][0], positions[26][1], 4, 4);

  // left eye
  line(positions[30][0], positions[30][1], positions[68][0], positions[68][1]);
  line(positions[68][0], positions[68][1], positions[29][0], positions[29][1]);
  line(positions[29][0], positions[29][1], positions[67][0], positions[67][1]);
  line(positions[67][0], positions[67][1], positions[28][0], positions[28][1]);
  line(positions[28][0], positions[28][1], positions[70][0], positions[70][1]);
  line(positions[70][0], positions[70][1], positions[31][0], positions[31][1]);
  line(positions[31][0], positions[31][1], positions[69][0], positions[69][1]);
  line(positions[69][0], positions[69][1], positions[30][0], positions[30][1]);

  // right eye stars
  ellipse(positions[30][0], positions[30][1], 2, 2);
  ellipse(positions[28][0], positions[28][1], 3, 3);
  ellipse(positions[70][0], positions[70][1], 2, 2);
  ellipse(positions[69][0], positions[69][1], 1, 1);

  // left jawline
  for (var i=7; i<=14; i++){
    line(positions[i][0], positions[i][1], positions[i+1][0], positions[i+1][1]);
    ellipse(positions[i][0], positions[i][1], 3, 3);
  }

  // nostril half
  for (var i=34; i<=36; i++){
    line(positions[i][0], positions[i][1], positions[i+1][0], positions[i+1][1]);
    ellipse(positions[i][0], positions[i][1], 3, 3);
  }
}
