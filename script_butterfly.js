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

//main points
const NOSE_POINT = 195;
const LEFT_EYE = 159;
const RIGHT_EYE = 386;
const LEFT_CHEEKBONE = 116;
const RIGHT_CHEEKBONE = 345;

//nose
const LEFT_NOSE = 236;
const RIGHT_NOSE = 456;

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
const LEFT_CHEEKBONE_LEFTSIDE = 227;
const LEFT_CHEEKBONE_RIGHTSIDE = 101;

//right cheekbone
const RIGHT_CHEEKBONE_LEFTSIDE = 330;
const RIGHT_CHEEKBONE_RIGHTSIDE = 447;


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
        latestPrediction = results[0];
    });

    bug = new Butterfly();

    video.hide();
}

function getLatestPrediction(point)
{
    return latestPrediction.scaledMesh[point];
}

function getDistance(firstPoint, secondPoint)
{
    let leftLocation = getLatestPrediction(firstPoint);
    let rightLocation = getLatestPrediction(secondPoint);

    return dist(leftLocation[0], leftLocation[1], rightLocation[0], rightLocation[1]);
}

function displayImage(theImage, mainLocation, imageWidth, imageHeight)
{
    imageMode(CENTER);
    image
    (theImage,
    mainLocation[0], 
    mainLocation[1], 
    imageWidth, 
    imageHeight);
}

function getImageHeight(theImage, width)
{
    return (theImage.height / theImage.width) * width;
}

//p5 function
function draw()
{
    //draw webcam video
    imageMode(CORNER);
    image(video, 0, 0, width, height);
    //------------------------------------
    if(latestPrediction == null) return;//don't draw anything else

    //get nose location
    noseLocation = getLatestPrediction(NOSE_POINT);

    //get left eye location
    let leftEyeLocation = getLatestPrediction(LEFT_EYE);

    //get right eye location
    let rightEyeLocation = getLatestPrediction(RIGHT_EYE);

    //get left cheekbone location
    let leftCheekboneLocation = getLatestPrediction(LEFT_CHEEKBONE);

    //get right cheekbone location
    let rightCheekboneLocation = getLatestPrediction(RIGHT_CHEEKBONE);

    //get nose width
    noseWidth = getDistance(LEFT_NOSE, RIGHT_NOSE);

    //get eyebrow height
    eyebrowHeight = getDistance(LEFT_EYEBROW_TOP, LEFT_EYEBROW_BOTTOM);
    
    //get cheeks width
    let cheekWidth = getDistance(LEFT_CHEEK, RIGHT_CHEEK);
    
    //gets left eye width
    let leftEyeWidth = getDistance(LEFT_EYE_LEFTSIDE, LEFT_EYE_RIGHTSIDE);

    //gets right eye width
    let rightEyeWidth = getDistance(RIGHT_EYE_LEFTSIDE, RIGHT_EYE_RIGHTSIDE);
    
    //gets left cheekbone width
    let leftCheekboneWidth = getDistance(LEFT_CHEEKBONE_LEFTSIDE, LEFT_CHEEKBONE_RIGHTSIDE);

    //gets right cheekbone width
    let rightCheekboneWidth = getDistance(RIGHT_CHEEKBONE_LEFTSIDE, RIGHT_CHEEKBONE_RIGHTSIDE);
    
    //left eyelash
    let lLashWidth = leftEyeWidth * 2;
    let lLashHeight = (eyelashImage.height / eyelashImage.width) * lLashWidth;

    displayImage(eyelashImage, leftEyeLocation, lLashWidth, lLashHeight);
    
    //right eyelash
    let rLashWidth = rightEyeWidth * 2;
    let rLashHeight = (eyelashImage.height / eyelashImage.width) * rLashWidth;
    
    displayImage(eyelashImage, rightEyeLocation, rLashWidth, rLashHeight);

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
    displayImage(blushImage, noseLocation, blushWidth, blushHeight);

    //left cheek glitter
    let lGlitterWidth = leftCheekboneWidth;
    let lGlitterHeight = (pGlitterImage.height / pGlitterImage.width) * lGlitterWidth;
    displayImage(pGlitterImage, leftCheekboneLocation, lGlitterWidth, lGlitterHeight);

    //right cheek glitter
    let rGlitterWidth = rightCheekboneWidth;
    let rGlitterHeight = (pGlitterImage.height / pGlitterImage.width) * rGlitterWidth;
    displayImage(pGlitterImage, rightCheekboneLocation, rGlitterWidth, rGlitterHeight);

    //butterfly
    bug.display();
}



let bug; // Declare object

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
  //to move butterfly
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
  }

  updateNoseLocation()
  {
    this.x = noseLocation[0];
    this.y = noseLocation[1];
  }
}