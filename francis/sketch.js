/**
 * This function defines a new _class_ called Ripple (classes denoted with a
 * capital R). To use it, you _instantiate_ a new object instance of the class
 * passing in the width and height of the image being processed as well as
 * its source pixels array.
 *
 * var ripple = new Ripple(480, 480, pixels);
 *
 */
var Ripple = function(width, height) {
  this.width = width;
  this.height = height;
  this.d = pixelDensity();
  this.dstPixels = new Uint8Array(4 * width * height * this.d * this.d);

  this.halfWidth = width >> 1;
  this.halfHeight = height >> 1;

  this.mapLength = width * (height + 2) * 2;
  this.map = [];
  for (var i = 0; i < this.mapLength; i++) {
    this.map.push(0);
  }
  this.prevIndex = width;
  this.nextIndex = width * (height + 3);
  this.rippleRadius = 3;
}

/**
 * This syntax defines a _prototype function_, also known as an instance method,
 * on the Ripple class that "disturbs" the surface at the specified x/y
 * coordinate. You can execute this function on instances of the Ripple class
 * using dot notation. Given the variable declared and initialized above:
 *
 * ripple.disturb(230, 480);
 *
 */
Ripple.prototype.disturb = function(centerX, centerY) {
  var x, y, index;
  //// disturb a square radius of pixels around the specified center point
  for (y = centerY - this.rippleRadius, maxY = centerY + this.rippleRadius; y < maxY; y++) {
    for (x = centerX - this.rippleRadius, maxX = centerX + this.rippleRadius; x < maxX; x++) {
      //// check to make sure still within the bounds of the image
      if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
        //// bump the "height" of this point on the surface
        index = this.prevIndex + (y * this.width) + x;
        this.map[index] += 512;
      }
    }
  }
}

var once = true;
/**
 * This function generates a new animation frame of the rippled image and
 * stores it in the dstPixels property of the instantiated object.
 */
Ripple.prototype.newFrame = function(srcPixels) {
  //// swap between the indices of the height map
  var nextIndex = this.prevIndex;
  this.prevIndex = this.nextIndex;
  this.nextIndex = nextIndex;

  //// now, for every pixel in the image...
  var x, y;
  //// calculate a rippled offset pixel
  var data, offX, offY, offset, r, g, b, a, i, j;
  //// for performance, copy frequently used object properties into local vars
  var map = this.map;
  var width = this.width, height = this.height, d = this.d;
  var dstPixels = this.dstPixels;
  var halfWidth = this.halfWidth, halfHeight = this.halfHeight;
  var prevIndex = this.prevIndex;
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      //// compute a new map height value...
      data = (
        map[prevIndex - width] + // from pixel above
        map[prevIndex + width] + // from pixel below
        map[prevIndex - 1] +     // from pixel to left
        map[prevIndex + 1]       // from pixel to right
      ) >> 1;                   // and divide by 2 (by shift right one bit)
      data -= map[nextIndex];
      data -= data >> 5;
      map[nextIndex] = data;

      //// calculate a pixel offset coordinate based on the height data
      data = 1024 - data;
      offX = (((x - halfWidth) * data / 1024) << 0) + halfWidth;
      offY = (((y - halfHeight) * data / 1024) << 0) + halfHeight;

      //// constrain that offset to within the bounds of the image
      if (offX >= width) {
        offX = width - 1;
      }
      if (offX < 0) {
        offX = 0;
      }
      if (offY >= height) {
        offY = height - 1;
      }
      if (offY < 0) {
        offY = 0;
      }

      //// now pick the pixel at that offset and write it into the output
      offset = 4 * (offY * d * width * d + offX * d);
      r = srcPixels[offset];
      g = srcPixels[offset + 1];
      b = srcPixels[offset + 2];
      a = srcPixels[offset + 3];
      for (i = 0; i < d; i++) {
        for (j = 0; j < d; j++) {
          offset = 4 * ((y * d + j) * width * d + (x * d + i));
          dstPixels[offset] = r;
          dstPixels[offset + 1] = g;
          dstPixels[offset + 2] = b;
          dstPixels[offset + 3] = a;
        }
      }

      //// increment to the next pixel in the map
      prevIndex++;
      nextIndex++;
    }
  }
  once = false;
  return dstPixels;
}

var img;
var video;
var ctracker;
var ripple;

function preload() {
  img = loadImage('acme.jpg');
}

function setup() {
  createCanvas(320, 200);

  video = createCapture(VIDEO);
  video.size(320, 200);

  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(video.elt);

  ripple = new Ripple(320, 200);

  noStroke();
}

function draw() {
  // image(img, 0, 0);
  image(video, 0, 0);
  var positions = ctracker.getCurrentPosition();

  for (var i=0; i<positions.length; i++) {
    // set the color of the ellipse based on position on screen
    fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
    // draw ellipse at each position point
    var val = 4;
    ellipse(positions[i][0], positions[i][1], val, val);
  }
  loadPixels();
  pixels.set(ripple.newFrame(pixels));
  updatePixels();
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
