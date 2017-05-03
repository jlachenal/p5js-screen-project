//// the main output canvas
var canvas;

//// night sky background image
var bgImage;
var fgImage;

//// stars
var starsgroups = [];
var stars = [];
var previous;

//// brushes for aurora effect
var brushes = []
//// offscreen rendering context/layer for aurora effect
var auroraLayer;

//// video and face tracker
var video;
var ctracker;

//// ripple effect layer
var ripple;
var rippleLayer;

function preload() {
  bgImage = loadImage('bg.jpg');
  fgImage = loadImage('fg.png');
}

function setup() {
  //// set up canvas with portrait screen resolution
  canvas = createCanvas(720, 1280);

  //// start video-only capture (no sound)
  video = createCapture(VIDEO);
  video.size(320, 200);

  //// start face tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(video.elt);

  //// initialize stars timing
  previous = millis();
  //// start randomly generating new stars
  var noiseCoord = 0;
  var randomStars = function() {
    var startX = random(520);
    var startY = 100 + random(200);
    for (var i = 0, length = round(random(5, 8)); i < length; i++) {
      var x = startX + 200 * noise(noiseCoord);
      var y = startY + 200 * noise(0, noiseCoord);
      createStar(x, y);
      noiseCoord += 0.3;
    }
    var val = random()
    noiseCoord += 100
    setTimeout(randomStars, 2000 + 1000*val);
  }
  randomStars();

  //// initialize brushes for aurora effect
  for (var i = 0; i < 12; i++) {
    brushes.push(new Brush(720, 420));
  }
  //// initialize an offscreen rendering context for the aurora effect
  auroraLayer = createGraphics(720, 420);

  ripple = new Ripple(320, 200);
  rippleLayer = createGraphics(320, 200);
  var randomRipples = function() {
    var x = 160 + round(random(-40, 40));
    var y = 100 + round(random(-40, 40));
    ripple.disturb(x, y);
    setTimeout(randomRipples, 4000 + random(4000));
  }
  randomRipples();
  noStroke();
}

function draw() {
  //// draw night sky background
  image(bgImage, 0, 0, 720, 420);
  //// overlay stars
  drawStars();
  //// draw and then overlay aurora effect
  for (i = 0; i < brushes.length; i++) {
    var brush = brushes[i];
    brush.draw(auroraLayer);
  }
  image(auroraLayer, 0, 0);
  //// overlay face constellation
  drawConstellation();
  // load composed image into pixel array
  loadPixels();
  //// flip!
  var d = pixelDensity();
  var rowLength = 4 * 720 * d;
  var dstIndex = rowLength * (1280 * d - 1);
  var _pixels = pixels;
  for (var srcIndex = 0, endIndex = 420 * rowLength * d; srcIndex < endIndex; srcIndex += rowLength) {
    for (var i = 0; i < 2; i++) {
      for (var x = 0; x < rowLength; x++) {
        _pixels[dstIndex + x] = _pixels[srcIndex + x];
      }
      dstIndex -= rowLength;
    }
  }
  //// add ripples
  updatePixels();

  //// overlay video head with low opacity
  tint(255, 20);
  image(video, 0, 830, 720, 450);
  noTint();

  //// draw into ripple layer and distort
  rippleLayer.image(canvas, 0, 0, 320, 200, 0, 830, 720, 450);
  rippleLayer.loadPixels();
  rippleLayer.pixels.set(ripple.newFrame(rippleLayer.pixels));
  rippleLayer.updatePixels();
  tint(255, 128);
  image(rippleLayer, 0, 830, 720, 450);
  noTint();

  //// overlay mountains and land
  image(fgImage, 0, 0, 720, 1280);
}

function keyTyped() {
  if (key === 'f') {
    fullscreen(true);
  }
}

function mousePressed() {
  if (ripple) {
    ripple.disturb(mouseX, mouseY);
  }
}

function mouseDragged() {
  if (ripple) {
    ripple.disturb(mouseX, mouseY);
  }
}
