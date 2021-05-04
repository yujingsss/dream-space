let polySynth;
let seaguall, fireworks, zen, river, rain;
let synthDuration = 1;

let osc, fft;

let num;

let scl = 10;
let cols, rows;
let zoff = 0;
let particles = [];
let particleSize = 1500;
let flowfield;

let theta = 94;
let r = 150;
let circleR = 30;
let circleSize = 15;

let vis2zoff = 0;
let vis4sina = 0;
let vis4cosa = 0;

let vis6y;

let bgWeight = 1.5;
let lineWeight = 2.5;

let colorIndex = 6;
let colors = [];
//pink+green
colors[0] = [
  [255, 181, 214],
  [204, 255, 204]
];
//orange+white
colors[1] = [
  // [255, 198, 112],
  [255, 180, 66],
  [255, 255, 255]
];
//gray+purpleblue
colors[2] = [
  [230, 230, 230],
  [153, 153, 255]
];
//skyblue+yellow
colors[3] = [
  [153, 206, 255],
  [255, 255, 204]
];
//purple+green
colors[4] = [
  [179, 255, 153],
  [198, 179, 255]
];
//blue+skin
colors[5] = [
  [255, 236, 229],
  [85, 107, 199]
];
//black+white
colors[6] = [
  [0, 0, 0],
  [255, 255, 255]
];
//purple+orange
colors[7] = [
  [193, 152, 245],
  [252, 146, 50]
];

let bgCol, lineCol;

let rotateDegree = 0;

let cnv;

function preload() {
  soundFormats("mp3", "ogg", "wav");
  seaguall = loadSound('seaguall');
  fireworks = loadSound('fireworks');
  zen = loadSound('zen');
  river = loadSound('river');
  rain = loadSound('rain');
}

function setup() {
  // console.log(`1. Press 1-0 to change visuals & generate sound\n2. Press SPACE to change color\n3. Press TAB to reset color\n4. Adjust slider & click 'submit' or press ENTER to change particle size and scale\n5. Press s to save canvas`);

  cnv = createCanvas(windowWidth, windowHeight);
  background(0);

  vis6y = height;

  //sound
  polySynth = new Tone.PolySynth({
    envolope: {
      attack: 0.5,
      decay: 0.3,
      sustain: 0.8,
      release: 1.5
    },
    resonance: 1
  }).toMaster();

  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(0.5);
  fft = new p5.FFT();

  //set colors
  // console.log(colors);
  setColor(colorIndex);


  //cols & rows, scale
  cols = floor(width / scl);
  rows = floor(height / scl);

  //initialize flowfield & particles
  flowfield = new Array(cols * rows);
  for (let i = 0; i < particleSize; i++) {
    particles[i] = new Particle();
  }
}

function setColor(colorIndex) {
  background(colors[colorIndex][0][0], colors[colorIndex][0][1], colors[colorIndex][0][2], 100);
  bgCol = color(colors[colorIndex][0][0], colors[colorIndex][0][1], colors[colorIndex][0][2], 10);
  lineCol = color(colors[colorIndex][1][0], colors[colorIndex][1][1], colors[colorIndex][1][2], 75);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(bgCol);
}

function draw() {
  // background(0, 10);
  background(bgCol);
  strokeWeight(bgWeight);

  //vis1
  if (num == 1) {
    vis1();
    drawLines(0.5, 0.5, 0.00001);
  }

  //vis2
  if (num == 2) {
    vis2();
    drawLines(0.8, 0.0001, 0.00001);
  }

  //vis3
  if (num == 3) {
    vis3();
    drawLines(0.05, 0.0000005, 0.001);
  }

  //vis4
  if (num == 4) {
    vis4();
    drawLines(0.01, 0.01, 0.00005);
  }

  //vis5
  if (num == 5) {
    vis5();
    drawLines(0.05, 1, 0.0001);
  }

  //vis6
  if (num == 6) {
    vis6();
    drawLines(0.0001, 0.5, 0.00001);
  }

  //vis7
  if (num == 7) {
    vis7();
    drawLines(0.1, 0.1, 0.00001);
  }

  //vis8
  if (num == 8) {
    vis8();
    drawLines(0.005, 0.05, 0.005);
  }

  //vis9
  if (num == 9) {
    vis9();
    drawLines(0.05, 5, 0.00001);
  }

  //vis10
  if (num == 10) {
    vis10();
    drawLines(0.05, 0.05, 0.0001);
  }
}


function keyPressed() {
  // console.log(event.key);

  document.getElementById("intro").style.animation = "fade 0.5s ease-in";
  document.getElementById("intro").style.animationFillMode = "forwards";

  //change settings
  if (event.key === " ") {
    let prevCol = colorIndex;
    colorIndex = floor(random(colors.length));
    // console.log(colorIndex);
    if (colorIndex != prevCol) {
      setColor(colorIndex);
    } else {
      colorIndex = floor(random(6));
      setColor(colorIndex);
    }
    // console.log("color: " + colorIndex);
  }

  // save canvas
  if (key === "s") {
    saveCanvas("sound", "jpg");
  }

  if (key === "1") {
    theta = 94;
    num = 1;
    setColor(3);
    polySynth.triggerAttackRelease(["C4", "E4", "G4"], synthDuration);
    fireworks.play();
    fireworks.setVolume(3);
    fireworks.setLoop(false);
  }
  if (key === "2") {
    num = 2;
    setColor(0);
    polySynth.triggerAttackRelease(["D4", "F4", "A4"], synthDuration);

  }
  if (key === "3") {
    num = 3;
    setColor(2);
    polySynth.triggerAttackRelease(["E4", "G4", "B4"], synthDuration);
    vis(1, "white");
    audioEffect(500, 0.4);
  }
  if (key === "4") {
    num = 4;
    setColor(6);
    polySynth.triggerAttackRelease(["F4", "A4", "C5"], synthDuration);
    zen.play();
    // zen.stop(3);
    zen.setVolume(1.5);
    zen.setLoop(false);

  }
  if (key === "5") {
    num = 5;
    setColor(7);
    polySynth.triggerAttackRelease(["G4", "B4", "D5"], synthDuration);
    vis(2, "white");
    createRect();
    vis(0, "white");
    audioEffect(100, 1);
  }
  if (key === "6") {
    num = 6;
    setColor(1);
    vis6y = height;
    polySynth.triggerAttackRelease(["A4", "C5", "E5"], synthDuration);
    seaguall.play();
    seaguall.setVolume(0.2);
    // seaguall.stop(3);
    seaguall.setLoop(false);
  }
  if (key === "7") {
    num = 7;
    setColor(5);
    polySynth.triggerAttackRelease(["B4", "D5", "F5"], synthDuration);
    river.play();
    river.setLoop(false);
  }
  if (key === "8") {
    setColor(4);
    num = 8;
    polySynth.triggerAttackRelease(["C5", "E5", "G5"], synthDuration);
    createMulTriangle();
    vis(3, "white");
    vis(1, "white");
    audioEffect(800, 0.1);
  }
  if (key === "9") {
    setColor(2);
    num = 9;
    polySynth.triggerAttackRelease(["D5", "F5", "A5"], synthDuration);
    rain.play();
    rain.setVolume(4);
    rain.setLoop(false);
  }
  if (key === "0") {
    num = 10;
    setColor(6);
    polySynth.triggerAttackRelease(["E5", "G5", "B5"], synthDuration);
    createRect();
    vis(0, "white");
    vis(4, "white");
    audioEffect(500, 0.3);
  }
}

function audioEffect(freq, amp) {
  osc.start();
  osc.freq(freq);
  osc.amp(amp);
  setTimeout(function() {
    osc.stop();
  }, 1500);
}

let sclX = 30;
let sclY = 15;

function createRect() {
  let rectDiv = document.getElementsByClassName("rect")[0];
  for (let i = 0; i < sclX; i++) {
    for (let j = 0; j < sclY; j++) {
      let rects = document.createElement("div");
      rectDiv.appendChild(rects);
    }
  }
}

let sclTX = 12;
let sclTY = 12;

function createMulTriangle() {
  let multiTriangleDiv = document.getElementsByClassName("multi-triangle")[0];
  for (let i = 0; i < sclTX; i++) {
    for (let j = 0; j < sclTY; j++) {
      let multiTriangles = document.createElement("div");
      multiTriangleDiv.appendChild(multiTriangles);
    }
  }
}

function vis(index, col, col2) {
  // console.log(index);
  document.getElementsByClassName("vis-container")[index].style.display = "flex";
  document.getElementsByClassName("vis-container")[index].style.animation = "visible 0.5s ease-in-out";

  if (index == 0) {
    flexCenter(index);
    let rectW = document.getElementsByClassName("vis")[index].clientWidth / sclX;
    let rectH = document.getElementsByClassName("vis")[index].clientHeight / sclY;
    let rects = document.querySelectorAll(".rect > div");
    rects.forEach(rect => {
      rect.style.width = `${rectW / 2}px`;
      rect.style.height = `${rectH / 2}px`;
      rect.style.display = "block";
      rect.style.background = "white";
      rect.style.animation = "Rect 2s ease-in-out";
      rect.style.animationFillMode = "forwards";
    });
  }
  if (index == 1) {
    flexCenter(index);
    document.getElementsByClassName("vis")[index].style.background = "white";
    document.getElementsByClassName("vis")[index].style.animation = "Ripple 2s ease-in-out";
    document.getElementsByClassName("vis")[index].style.animationFillMode = "forwards";
  }
  if (index == 2) {
    flexCenter(index);
    let lineDiv = document.getElementsByClassName("line")[0];
    lineDiv.style.background = "white";
    lineDiv.style.animation = "Line 2s ease-in-out";
    lineDiv.style.animationFillMode = "forwards";
  }
  if (index == 3) {
    flexCenter(index);
    let multiTri = document.querySelectorAll(".multi-triangle > div");
    multiTri.forEach(tri => {
      tri.style.borderBottomColor = "white";
      tri.style.animation = "multiTri 2s ease-in-out";
      tri.style.animationFillMode = "forwards";
    });
  }
  if (index == 4) {
    let triangles = document.querySelectorAll(".triangle > div");
    triangles[0].style.borderLeftColor = "white";
    triangles[1].style.borderRightColor = "lightgray";
    triangles[0].style.animation = "Triangle1 2s ease-in-out";
    triangles[1].style.animation = "Triangle2 2s ease-in-out";
    triangles[0].style.animationFillMode = "forwards";
    triangles[1].style.animationFillMode = "forwards";
  }

  setTimeout(function() {
    document.getElementsByClassName("vis-container")[index].style.animation = "notVisible 0.5s ease-in-out";
    document.getElementsByClassName("vis-container")[index].style.display = "none";
  }, 2500);
}

function flexCenter(index) {
  document.getElementsByClassName("vis-container")[index].style.justifyContent = "center";
  document.getElementsByClassName("vis-container")[index].style.alignItems = "center";
}

function flexTop(index) {
  document.getElementsByClassName("vis-container")[index].style.justifyContent = "flex-start";
}

function vis1() {
  stroke(lineCol);
  noFill();
  strokeWeight(lineWeight);
  push();
  translate(width / 2, height / 2);
  angleMode(RADIANS);
  rotate(-QUARTER_PI * 3);
  for (let i = 0; i < circleSize; i++) {
    rotate(TWO_PI / circleSize);
    push();
    translate(50, r * sin(theta));
    for (let j = -circleR * 1.5; j < circleR * 3; j += circleR * 1.5) {
      circle(0, j, circleR);
    }
    pop();
  }
  if (theta < 96) {
    theta += 0.02;
  } else {
    theta = 96;
  }
  pop();
}

function vis2() {
  push();
  stroke(lineCol);
  strokeWeight(lineWeight);
  noFill();
  const sclX = 10;
  const sclY = 8;
  let rectX = round((width - 10) / sclX);
  let rectY = round((height - 10) / sclY);
  rectMode(CENTER);
  angleMode(DEGREES);
  translate(30, 30);
  for (let i = 0; i < sclX; i++) {
    for (let j = 0; j < sclY; j++) {
      push();
      translate(rectX * i, rectY * j);
      // rotate(rotateDegree * j);
      rect(0, 0, 100 * noise(vis2zoff), 100 * noise(vis2zoff));
      rect(0, 0, random(0.2, 1) * 35, random(0.2, 1) * 35);
      // rect(0, 0, 10 * map(noise(random(500, 1000)), 0, 1, 0.1, 2), 10 * map(noise(random(500)), 0, 1, 0.1, 2));
      pop();
      vis2zoff += 5;
      rotateDegree += 0.2;
    }
  }
  rotateDegree += 1;
  pop();
}

function vis3() {
  strokeWeight(lineWeight);
  stroke(lineCol);
  for (var i = 0; i < 30; i++) {
    fill(lineCol);
    noStroke();
    circle(random(width), random(height), 6);
  }

}

function vis4() {
  angleMode(DEGREES);
  stroke(lineCol);
  noFill();
  strokeWeight(lineWeight);
  push();
  translate(width / 2, height / 2);
  for (let i = 1; i < 6; i++) {
    circle(sin(vis4sina) * r * i / 2, cos(vis4cosa) * r * i / 2, circleR);
    circle(-sin(vis4sina) * r * i / 2, -cos(vis4cosa) * r * i / 2, circleR);
    circle(sin(vis4sina + 90) * r * i / 2, cos(vis4cosa + 90) * r * i / 2, circleR);
    circle(sin(vis4sina - 90) * r * i / 2, cos(vis4cosa - 90) * r * i / 2, circleR);
    circle(sin(vis4sina + 45) * r * i / 2, cos(vis4cosa + 45) * r * i / 2, circleR);
    circle(sin(vis4sina - 45) * r * i / 2, cos(vis4cosa - 45) * r * i / 2, circleR);
    circle(sin(vis4sina + 135) * r * i / 2, cos(vis4cosa + 135) * r * i / 2, circleR);
    circle(sin(vis4sina - 135) * r * i / 2, cos(vis4cosa - 135) * r * i / 2, circleR);
  }
  pop();
  vis4sina++;
  vis4cosa++;
}

function vis5() {

}

function vis6() {
  stroke(lineCol);
  strokeWeight(lineWeight);
  line(random(0, width), random(0, height), width / 2, vis6y);
  line(random(0, width), random(0, height), width / 2, vis6y);
  line(random(0, width), random(0, height), width / 2, vis6y);
  line(random(0, width), random(0, height), width / 2, vis6y);
  line(random(0, width), random(0, height), width / 2, vis6y);
  strokeWeight(2);
  noFill();
  circle(random(0, width), random(0, height), random(50, 100));
  fill(lineCol);
  circle(width / 2, vis6y, random(0.6, 1) * 300);
  vis6y -= 3;
  if (vis6y <= height / 2) {
    vis6y = height / 2;
  }
}

function vis7() {

}

function vis8() {

}

function vis9() {
  for (var i = 0; i < 30; i++) {
    fill(lineCol);
    stroke(lineCol);
    ellipse(random(width), random(height), 1, random(30, 50));
  }
}

function vis10() {

}


function drawLines(incx, incy, incz) {
  // background(0, 10);
  angleMode(RADIANS);
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 3;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(5);
      flowfield[index] = v;
      xoff += incx;

    }
    yoff += incy;
    zoff += incz;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}

function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 10;

  this.prevPos = this.pos.copy();
  //start with previous pos

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  this.follow = function(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }
  this.applyForce = function(force) {
    this.acc.add(force);
  }

  //play w/ show() to have various effects
  this.show = function() {
    stroke(lineCol);
    strokeWeight(bgWeight);
    // point(this.pos.x, this.pos.y);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }
  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }
  this.edges = function() {
    if (this.pos.x > windowWidth) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = windowWidth;
      this.updatePrev();
    }
    if (this.pos.y > windowHeight) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = windowHeight;
      this.updatePrev();
    }
  }
}