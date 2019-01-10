// server variables

var dataServer;
var pubKey = 'pub-c-d41b58e7-05c8-423d-8ff5-bd42356a9845';
var subKey = 'sub-c-8789e4ac-135a-11e9-b4a6-026d6924b094';

//input variables

//name used to sort your messages. used like a radio station. can be called anything
var channelName = "book";

var images = [];
var currentlyDraggedImg = {};

function setup() 
{
  
    
  createCanvas(windowWidth, windowHeight);
  background(255);
  
   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
      
  });
    
    images[0] = loadImage("https://www.freelogodesign.org/Content/img/logo-ex-7.png"); 
    images[0] = loadImage("https://techcrunch.com/wp-content/uploads/2018/07/logo-2.png?w=300"); 
    images[0] = loadImage("https://brandmark.io/logo-rank/random/beats.png"); 
    
    background(255);
    noStroke();
    
}

function draw() 
{

    for (var i=0; i < images.length; i++){
        
        images[i].x = imagePositions[i].x;
        
        image(images[i], imagePositions[i].x, imagePositions[i].y);
    }

    
}
function mousePressed(){
    
    for (var i=0; i < images.length; i++){
        
        if (dist(mouseX, mouseY, images[i].x, images[i].y) < 10) {
            
            currentlyDraggedImg = i;
            
        }
            
    }
}

function mouseDragged(){
    
    
       if (currentlyDraggedImg != null) {
           
           imagePositions[currentlyDraggedImg].x = mouseX;
           imagePositions[currentlyDraggedImg].y = mouseY; 
           
       }
            
    
    
}
