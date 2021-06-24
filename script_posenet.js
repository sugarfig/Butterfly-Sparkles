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
let poses = [];

// Storing the last keypoint position
let lastKeypoints = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
	
  print(lastKeypoints); 
	// setup original keypoints
	createDefaultKeypoints(); 
  print(lastKeypoints);
}

// Create default keypoints for easing. 
function createDefaultKeypoints() {
	let numKeypoints = 17; 
	for (let i=0; i<numKeypoints; i++) {
		newKeypoint = {x:width/2,
									 y:height/2}
    
		lastKeypoints.push(newKeypoint);
	}
}

function updateKeypoints() {
	// If there are no poses, ignore it.
	if (poses.length <= 0) {
		return; 
	}
	
	// Otherwise, let's update the points; 
	
	let pose = poses[0].pose;
	let keypoints = pose.keypoints; 
	
	for (let kp=0; kp<keypoints.length; kp++) {
    
		let oldKeypoint = lastKeypoints[kp];
		let newKeypoint = keypoints[kp].position; 
		
		let interpX = lerp(oldKeypoint.x, newKeypoint.x, .3); 
		let interpY = lerp(oldKeypoint.y, newKeypoint.y, .3); 
		
		let interpolatedKeypoint = {x: interpX,
																y: interpY}
		
		lastKeypoints[kp] = interpolatedKeypoint; 
	}
}

function draw() {
  image(video, 0, 0, width, height);

	updateKeypoints(); 
  
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  
	for (let i=0; i<lastKeypoints.length; i++) {
		keypoint = lastKeypoints[i]; 
    fill(255,0,0); 
    ellipse(keypoint.x, keypoint.y, 10,10); 
	}
}
