/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * remote controller that sends a variable to all the listening devices
 * phone only
 */

// server variables

var dataServer;
var pubKey = 'pub-c-d41b58e7-05c8-423d-8ff5-bd42356a9845';
var subKey = 'sub-c-8789e4ac-135a-11e9-b4a6-026d6924b094';

//input variables

//name used to sort your messages. used like a radio station. can be called anything
var channelName = "book";

var images = [];
var currentlyDraggedImg = 0;
var imagePositions = [];

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
    
    images[0] = loadImage("https://angular.io/assets/images/logos/angular/angular.png"); 
    images[1] = loadImage("https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F07%2F21%2F9757e437-5ec1-4378-804f-ca0f9567c110%2F380048_Widakk.png?auto=format&ch=Width%2CDPR&w=250&h=250"); 
    images[2] = loadImage("https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250"); 
    
    background(255);
    noStroke();
    
    for (var i=0; i < 3; i++){
        
        imagePositions[i] = {
            x: 0,
            y:0
        }
    }
}

function draw() 
{

    background(255);
    
    for (var i=0; i < images.length; i++){
        
        images[i].x = imagePositions[i].x;
        
        image(images[i], imagePositions[i].x, imagePositions[i].y);
    }

    
}
function mousePressed(){
    
    for (var i=0; i < images.length; i++){
        
        if (dist(mouseX, mouseY, imagePositions[i].x + 250/2, imagePositions[i].y + 250/2) < 40) {
            
            
            currentlyDraggedImg = i;
            
          
        }
            
    }
}

function mouseDragged(){
    
        console.log(currentlyDraggedImg);
    
       if (currentlyDraggedImg != null) {
           
           imagePositions[currentlyDraggedImg].x = mouseX - 250/2;
           imagePositions[currentlyDraggedImg].y = mouseY - 250/2; 
           
       }
            
    
    
}

function mouseReleased(){
    
    currentlyDraggedImg = null;
}
