// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;

let poseNet;
let poseNetResults = [];

let img;

let nosePositions = new Set();
let brushOn = true;

function preload() {
  img = loadImage("assets/sealogo.png");
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, { flipHorizontal: true });
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function (results) {
    poseNetResults = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function draw() {
  let flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0);

  // if a pose exists
  if (poseNetResults.length > 0) {
    // pull out the first pose
    let pose = poseNetResults[0].pose;

    // pull out the keypoints of the pose
    let keypoints = pose.keypoints;

    //pull out just the first keypoint (the nose)
    let noseKeypoint = keypoints[0];

    // get the position of that point
    let nosePosition = noseKeypoint.position;

    //store the position in a set
    if (brushOn) {
      nosePositions.add(nosePosition);
    }

    // Draw it
    fill("#F6F500"); // snap yellow
    noStroke();

    nosePositions.forEach(function (pos) {
      image(img, pos.x - 25, pos.y - 9.5, 50, 19);
    });
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    // clear the screen
    nosePositions = new Set();
  } else if (keyCode === UP_ARROW) {
    // pause the brush drawing
    brushOn = !brushOn;
  }
}
