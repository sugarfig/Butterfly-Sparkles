let video;
let latestPrediction = null;
let modelIsLoading = true;
let butterflyImage;

const NOSE_POINT = 195;
const LEFT_EYE = 159; //159
const LEFT_NOSE = 236; //104 //142
const RIGHT_NOSE = 456; //333 //371


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
    
    let butterflyWidth = noseWidth * 3;
    let butterflyHeight = (butterflyImage.height / butterflyImage.width) * butterflyWidth;
    
    imageMode(CENTER);
    image
    (butterflyImage,
    noseLocation[0], 
    noseLocation[1], 
    butterflyWidth, 
    butterflyHeight);

    fill('pink');
    stroke('pink');
    ellipse(leftEyeLocation[0] + 10, 
        leftEyeLocation[1] + 10, 
        10, 
        10);

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