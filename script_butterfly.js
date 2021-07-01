let video;
let latestPrediction = null;
let modelIsLoading = true;
let butterflyImage;
let noseWidth;
let noseLocation;
let eyebrowHeight;
let blushImage;
let eyelashImage;
let pGlitterImage;
// let leftEyeLocation;

//main points
const NOSE_POINT = 195;
const LEFT_EYE = 159; //118
const RIGHT_EYE = 386;
const LEFT_CHEEKBONE = 116;
const RIGHT_CHEEKBONE = 345;//345

//nose
const LEFT_NOSE = 236; //104 //142
const RIGHT_NOSE = 456; //333 //371

//eyebrow
const LEFT_EYEBROW_BOTTOM = 223;
const LEFT_EYEBROW_TOP = 52;

//blush
const LEFT_CHEEK = 147;
const RIGHT_CHEEK = 176;

//left eye
const LEFT_EYE_LEFTSIDE = 33;
const LEFT_EYE_RIGHTSIDE = 133;

//right eye
const RIGHT_EYE_LEFTSIDE = 362;
const RIGHT_EYE_RIGHTSIDE = 263;

//left cheekbone
const LEFT_CHEEKBONE_LEFTSIDE = 227;//34
const LEFT_CHEEKBONE_RIGHTSIDE = 101;//35

//right cheekbone
const RIGHT_CHEEKBONE_LEFTSIDE = 330;
const RIGHT_CHEEKBONE_RIGHTSIDE = 447;

// const LEFT_EYE_TOP = 159;
// const LEFT_EYE_BOTTOM = 143;


//p5 function
function preload()
{
    butterflyImage = loadImage("assets/butterfly.gif");
    blushImage = loadImage("assets/Blush.webp");
    eyelashImage = loadImage("assets/eyeliner1.png");
    pGlitterImage = loadImage("assets/pinkGlitter.gif");
}

//p5 function
function setup()
{
    createCanvas(640, 480);
    
    
    video = createCapture(VIDEO);
    video.size(width, height);

    //ml5 function
    let facemesh = ml5.facemesh(video, () => 
    {
        console.log("Model is ready!");
        modelIsLoading = false;
    });

    //ml5 function
    facemesh.on("predict", (results) =>
    {
        //results is an Array
        //we care about the first object only
        //results[0]
        // console.log(results[0]);
        latestPrediction = results[0];
        //get nose location
        // noseLocation = latestPrediction.scaledMesh[NOSE_POINT];//line causes problems
        // leftEyeLocation = latestPrediction.scaledMesh[LEFT_EYE];
    });

    bug = new Butterfly();

    video.hide();
}

//p5 function
function draw()
{
    // if(modelIsLoading)
    //show a loading screen

    //draw webcam video
    imageMode(CORNER);
    image(video, 0, 0, width, height);
    //------------------------------------
    if(latestPrediction == null) return;//don't draw anything else

    //get nose location
    noseLocation = latestPrediction.scaledMesh[NOSE_POINT];

    //get left eye location
    let leftEyeLocation = latestPrediction.scaledMesh[LEFT_EYE];

    //get right eye location
    let rightEyeLocation = latestPrediction.scaledMesh[RIGHT_EYE];

    //get left cheekbone location
    let leftCheekboneLocation = latestPrediction.scaledMesh[LEFT_CHEEKBONE];

    //get right cheekbone location
    let rightCheekboneLocation = latestPrediction.scaledMesh[RIGHT_CHEEKBONE];

    //get nose width
    let leftNoseLocation = latestPrediction.scaledMesh[LEFT_NOSE];
    let rightNoseLocation = latestPrediction.scaledMesh[RIGHT_NOSE];

    noseWidth = dist(leftNoseLocation[0], 
        leftNoseLocation[1], 
        rightNoseLocation[0], 
        rightNoseLocation[1]);

    //get eyebrow height
    let topEyebrowLocation = latestPrediction.scaledMesh[LEFT_EYEBROW_TOP];
    let bottomEyebrowLocation = latestPrediction.scaledMesh[LEFT_EYEBROW_BOTTOM];

    eyebrowHeight = dist(topEyebrowLocation[0], 
        topEyebrowLocation[1], 
        bottomEyebrowLocation[0],
        bottomEyebrowLocation[1]);
    
    //get cheeks width
    let leftCheekLocation = latestPrediction.scaledMesh[LEFT_CHEEK];
    let rightCheekLocation = latestPrediction.scaledMesh[RIGHT_CHEEK];

    let cheekWidth = dist(leftCheekLocation[0],
        leftCheekLocation[1],
        rightCheekLocation[0],
        rightCheekLocation[1]);
    
    //gets left eye width
    let leftEyeLeftLocation = latestPrediction.scaledMesh[LEFT_EYE_LEFTSIDE];
    let leftEyeRightLocation = latestPrediction.scaledMesh[LEFT_EYE_RIGHTSIDE];

    let leftEyeWidth = dist(leftEyeLeftLocation[0], 
        leftEyeLeftLocation[1], 
        leftEyeRightLocation[0], 
        leftEyeRightLocation[1]);

    //gets right eye width
    let rightEyeLeftLocation = latestPrediction.scaledMesh[RIGHT_EYE_LEFTSIDE];
    let rightEyeRightLocation = latestPrediction.scaledMesh[RIGHT_EYE_RIGHTSIDE];

    let rightEyeWidth = dist(rightEyeLeftLocation[0],
        rightEyeLeftLocation[1],
        rightEyeRightLocation[0],
        rightEyeRightLocation[1]);
    
    //gets left cheekbone width
    let leftCheekboneLeftLocation = latestPrediction.scaledMesh[LEFT_CHEEKBONE_LEFTSIDE];
    let leftCheekboneRightLocation = latestPrediction.scaledMesh[LEFT_CHEEKBONE_RIGHTSIDE];

    let leftCheekboneWidth = dist(leftCheekboneLeftLocation[0],
        leftCheekboneLeftLocation[1],
        leftCheekboneRightLocation[0],
        leftCheekboneRightLocation[1]);

    //gets right cheekbone width
    let rightCheekboneLeftLocation = latestPrediction.scaledMesh[RIGHT_CHEEKBONE_LEFTSIDE];
    let rightCheekboneRightLocation = latestPrediction.scaledMesh[RIGHT_CHEEKBONE_RIGHTSIDE];

    let rightCheekboneWidth = dist(rightCheekboneLeftLocation[0],
        rightCheekboneLeftLocation[1],
        rightCheekboneRightLocation[0],
        rightCheekboneRightLocation[1]);

    // let leftEyeTopLocation = latestPrediction.scaledMesh[LEFT_EYE_TOP];
    // let leftEyeBottomLocation = latestPrediction.scaledMesh[LEFT_EYE_BOTTOM];

    // let leftEyeHeight = dist(leftEyeTopLocation[0], 
    //     leftEyeTopLocation[1],
    //     leftEyeBottomLocation[0],
    //     leftEyeBottomLocation[1]);

    // let pupilWidth = leftEyeWidth;
    // let pupilHeight = leftEyeHeight / 2;
    
    //left eyelash
    let lLashWidth = leftEyeWidth * 2;
    let lLashHeight = (eyelashImage.height / eyelashImage.width) * lLashWidth;

    imageMode(CENTER);
    image
    (eyelashImage,
    leftEyeLocation[0], 
    leftEyeLocation[1], 
    lLashWidth, 
    lLashHeight);
    
    //right eyelash
    let rLashWidth = rightEyeWidth * 2;
    let rLashHeight = (eyelashImage.height / eyelashImage.width) * rLashWidth;
    
    push();
    imageMode(CENTER);
    // scale(-1.0, 1.0);
    image
    (eyelashImage,
    rightEyeLocation[0], 
    rightEyeLocation[1], 
    rLashWidth, 
    rLashHeight);
    pop();

    // scale(1, 1);

    //butterfly
    if(eyebrowHeight > 10) //eyebrow raise
    {
        bug.move();
    }
    else
    {
        bug.updateNoseLocation();
    }

    //blush
    let blushWidth = cheekWidth * 2;
    let blushHeight = (blushImage.height / blushImage.width) * blushWidth;
    imageMode(CENTER);
    image
    (blushImage,
    noseLocation[0], 
    noseLocation[1], 
    blushWidth, 
    blushHeight);

    //left cheek glitter
    let lGlitterWidth = leftCheekboneWidth;
    let lGlitterHeight = (pGlitterImage.height / pGlitterImage.width) * lGlitterWidth;

    imageMode(CENTER);
    image
    (pGlitterImage,
    leftCheekboneLocation[0], 
    leftCheekboneLocation[1], 
    lGlitterWidth, 
    lGlitterHeight);

    //right cheek glitter
    let rGlitterWidth = rightCheekboneWidth;
    let rGlitterHeight = (pGlitterImage.height / pGlitterImage.width) * rGlitterWidth;

    imageMode(CENTER);
    image
    (pGlitterImage,
    rightCheekboneLocation[0], 
    rightCheekboneLocation[1], 
    rGlitterWidth, 
    rGlitterHeight);

    //butterfly
    bug.display();



    // fill('rgba(100%,20%,70%,0.5)');
    // stroke('rgba(100%,20%,70%,0.5)');
    // ellipse(leftEyeLocation[0] + 10, 
    //     leftEyeLocation[1] + 10, 
    //     pupilWidth, 
    //     pupilHeight);

    // image
    // (butterflyImage,
    // noseLocation[0] - 50, 
    // noseLocation[1] - 50, 
    // 100, 
    // 100);
    


    // line(leftNoseLocation[0], 
    //     leftNoseLocation[1], 
    //     rightNoseLocation[0], 
    //     rightNoseLocation[1]);
}


//to move butterfly

let bug; // Declare object
// function setup() {
//   createCanvas(710, 400);
//   // Create object
//   bug = new Butterfly();
// }
// function draw() {
//   if (mouseIsPressed){
//     bug.move();
//   }
//   bug.display();
// }


// Butterfly class
class Butterfly 
{
  constructor() 
  {
    this.x = width / 2;
    this.y = height / 2;
    this.diameter = random(10, 30);
    this.speed = 1;
  }
  move() 
  {
    this.x += random(0, 4);
    this.y -= random(0, 4);
  }
  display() 
  {
    let butterflyWidth = noseWidth * 3;
    let butterflyHeight = (butterflyImage.height / butterflyImage.width) * butterflyWidth;
    imageMode(CENTER);
    image
    (butterflyImage,
    this.x, 
    this.y, 
    butterflyWidth, 
    butterflyHeight);
    // ellipse(this.x, this.y, this.diameter, this.diameter);
  }

  updateNoseLocation()
  {
    this.x = noseLocation[0];
    this.y = noseLocation[1];
  }
}