// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/KB9LpyM2z/';


// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let particles = [];

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(1280, 720);
  // Create the video
  video = createCapture(VIDEO);
  video.size(160, 120);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
  for (let i = 0; i < windowWidth / 10; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  // background(0, 255, 0);
  // Draw the video
  image(flippedVideo, 0, 0, width, height);

  if (label === 'Thumbs') {
    tint(0, 153, 204); // Tint blue
    for (let i = 0; i < particles.length; i++) {
      particles[i].createParticle('white');
      particles[i].moveParticle();
    }
  } else {
    tint(255); // Tint none

  }

  // Draw the label
  // fill(255);
  // textSize(16);
  // textAlign(CENTER);
  // text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}


// this class describes the properties of a single particle.
class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
  constructor() {
    this.x = random(0, windowWidth);
    this.y = random(0, windowHeight);
    this.r = random(10, 20);
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-1, 1.5);
  }

  // creation of a particle.
  createParticle(color) {
    strokeWeight(1);
    stroke("white");
    fill(color);
    circle(this.x, this.y, this.r);
    strokeWeight(0);
  }

  // setting the particle in motion.
  moveParticle() {
    if (this.x < 0 || this.x > windowWidth) this.xSpeed *= -1;
    if (this.y < 0 || this.y > windowHeight) this.ySpeed *= -1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
}
