// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let flippedVideo;

let poseNet;
let poses = [];

let lastNoseX = 0; 
let lastNoseY = 0; 

let newNosePositionX = 0;
let newNosePositionY = 0;
let img; 

let nosePositions = new Set();
let toggle = true;

function preload(){
  img = loadImage('assets/sealogo.png');
}

function setup() {
  createCanvas(1.33*displayHeight, displayHeight);
  video = createCapture(VIDEO);
  video.size(1.33*displayHeight, displayHeight);
  flippedVideo

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function draw() {
  image(video, 0, 0, 1.33*displayHeight, displayHeight);
  
  // if a pose exists
  if (poses.length > 0) {
    	// pull out the first pose
      let pose = poses[0]; 
     // pull out the pose information
    	let poseInformation = pose.pose; 
    // pull out the keypoints of the pose
  		let keypoints = poseInformation.keypoints; 
    
    	//pull out just the first keypoint (the nose) 
    	let noseKeypoint = keypoints[0]; 
    
    	// get the position of that point
    	let nosePosition = noseKeypoint.position; 

      //store the position in a set
      nosePositions.add(nosePosition);
    
    // if it's likely to exist, interpolate for a smooth position
    	if( noseKeypoint.score > .2) {        
        newNosePositionX  = lerp(lastNoseX, nosePosition.x, .3); 
        newNosePositionY  = lerp(lastNoseY, nosePosition.y, .3); 
	
  
        lastNoseX = newNosePositionX; 
        lastNoseY = newNosePositionY; 
      }
  
    	// Draw it
      fill('#F6F500'); 
      noStroke();

      nosePositions.forEach(function(pos) {
        if (toggle){
          image(img, pos.x, pos.y, 90, 50); 
        } 
      });
  }
}

function keyPressed(){
  if (keyCode === ENTER){
    nosePositions = new Set();
  } else if (keyCode === UP_ARROW){
    toggle = !toggle;
  }
}