let video;
let latestPrediction = null;
let modelIsLoading = true;
let crownImage;

const FOREHEAD_POINT = 151;

//p5 function
function preload()
{
    crownImage = loadImage("assets/crown.png");
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
    image(video, 0, 0, width, height);
    //------------------------------------
    if(latestPrediction == null) return;//don't draw anything else

    //get forehead location
    let foreheadLocation = latestPrediction.scaledMesh[FOREHEAD_POINT];
    console.log(foreheadLocation);

    image
    (crownImage,
    foreheadLocation[0] - 50, 
    foreheadLocation[1] - 50, 
    100, 
    100);
}