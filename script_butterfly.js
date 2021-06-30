let video;
let latestPrediction = null;
let modelIsLoading = true;
let butterflyImage;

//main points
const NOSE_POINT = 195;
const LEFT_EYE = 118; //159

//nose
const LEFT_NOSE = 236; //104 //142
const RIGHT_NOSE = 456; //333 //371

//blush
// const CHEEKS 

//left eye
const LEFT_EYE_LEFTSIDE = 33;
const LEFT_EYE_RIGHTSIDE = 133;
const LEFT_EYE_TOP = 159;
const LEFT_EYE_BOTTOM = 143;


//p5 function
function preload()
{
    butterflyImage = loadImage("assets/butterfly.gif");
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
        
    });

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
    let noseLocation = latestPrediction.scaledMesh[NOSE_POINT];
    let leftEyeLocation = latestPrediction.scaledMesh[LEFT_EYE];
    
    console.log(noseLocation);

    let leftNoseLocation = latestPrediction.scaledMesh[LEFT_NOSE];
    let rightNoseLocation = latestPrediction.scaledMesh[RIGHT_NOSE];

    let noseWidth = dist(leftNoseLocation[0], 
        leftNoseLocation[1], 
        rightNoseLocation[0], 
        rightNoseLocation[1]);

    let leftEyeLeftLocation = latestPrediction.scaledMesh[LEFT_EYE_LEFTSIDE];
    let leftEyeRightLocation = latestPrediction.scaledMesh[LEFT_EYE_RIGHTSIDE];

    let leftEyeWidth = dist(leftEyeLeftLocation[0], 
        leftEyeLeftLocation[1], 
        leftEyeRightLocation[0], 
        leftEyeRightLocation[1]);

    let leftEyeTopLocation = latestPrediction.scaledMesh[LEFT_EYE_TOP];
    let leftEyeBottomLocation = latestPrediction.scaledMesh[LEFT_EYE_BOTTOM];

    let leftEyeHeight = dist(leftEyeTopLocation[0], 
        leftEyeTopLocation[1],
        leftEyeBottomLocation[0],
        leftEyeBottomLocation[1]);

    let butterflyWidth = noseWidth * 3;
    let butterflyHeight = (butterflyImage.height / butterflyImage.width) * butterflyWidth;

    let pupilWidth = leftEyeWidth;
    let pupilHeight = leftEyeHeight / 2;
    
    imageMode(CENTER);
    image
    (butterflyImage,
    noseLocation[0], 
    noseLocation[1], 
    butterflyWidth, 
    butterflyHeight);

    fill('rgba(100%,20%,70%,0.5)');
    stroke('rgba(100%,20%,70%,0.5)');
    ellipse(leftEyeLocation[0] + 10, 
        leftEyeLocation[1] + 10, 
        pupilWidth, 
        pupilHeight);

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