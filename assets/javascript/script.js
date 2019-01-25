/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * remote controller that sends a variable to all the listening devices
 * phone only
 */

/* 

SceneNumber variable

//CHECK FOR HIGHEST NUMBER
for (var i; i < 10; i ++){

    if (i > 0) {
        i = newHighest;
    }
    
}

*/
var currentRoundNumber = 0;
var numberOfPlayers = 3;
var currentQuestionIndex = 0;
var numberOfRecievedAnswers = 0;
var thisPlayersIndex = null;
var topPlayer, secondPlayer, thirdPlayer;

//BOOLEAN TO ENSURE ONLY ANSWER PER PLAYER
var alreadyAnswered = 0;


var allPlayers = [];
var allQuestions = [
    
  {
        question: "From 1966-1978 classical music was banned in what country",
        answerA: "Indosnesia",
        answerB: "China",
        answerC: "USA",
        answerD: "England",
        correctAnswer: "B"
    },
    {
        
        //play The Overture to Don Giovanni
        question: "Mozart wrote this song after suffering from?",
        answerA: "Influenza",
        answerB: "Depression",
        answerC: "A Hangover",
        answerD: "Starvation",
        correctAnswer: "C"
    },
    {
        question: "How many single peices of Wood are needed to make a violin?",
        answerA: "2",
        answerB: "1000",
        answerC: "70",
        answerD: "0",
        correctAnswer: "D"
    },
    {
        question: "Warner Communcations paid how much for the legal use of 'Happy Birthday'?",
        answerA: "1.50$",
        answerB: "28$",
        answerC: "75,000",
        answerD: "28 Million",
        correctAnswer: "D"
    },
    
    {
        question: "What key do most tilets flush in'?",
        answerA: "E Minor",
        answerB: "E flat",
        answerC: "what",
        answerD: "D major",
        correctAnswer: "B"
    },
    
        {
        question: "Mozart began composing at what age'?",
        answerA: "5",
        answerB: "16",
        answerC: "39",
        answerD: "13",
        correctAnswer: "A"
    },
    
           {
        question: "The early version of the Trombone was called'?",
        answerA: "Trombune",
        answerB: "Sackbut",
        answerC: "Iron Horn",
        answerD: "Trombest",
        correctAnswer: "B"
    },
    
           {
        question: "What is the french word for a bad note from a reed instrument'?",
        answerA: "Couac",
        answerB: "Blah",
        answerC: "Bruyont",
        answerD: "Mete",
        correctAnswer: "A"
    },
    
           {
        question: "Why did Bach go to jail'?",
        answerA: "Looting",
        answerB: "Murder",
        answerC: "Quitting his Job",
        answerD: "Playing Piano",
        correctAnswer: "C"
    },
    
           {
        question: "The japanese word 'Karaoke' comes from the phrase meaning?",
        answerA: "Sing Vibration",
        answerB: "Encore",
        answerC: "Empty Orchestra",
        answerD: "Solo Sound",
        correctAnswer: "C"
    },
    
    

];

var dataServer;
var pubKey = 'pub-c-d41b58e7-05c8-423d-8ff5-bd42356a9845';
var subKey = 'sub-c-8789e4ac-135a-11e9-b4a6-026d6924b094';

//input variables

//name used to sort your messages. used like a radio station. can be called anything
var channelName = "kahoot";
var setupChannelName = "kahootSetup"

//GRAPHIC ELEMENTS
var answerABtn, answerBBtn, answerCBtn , answerDBtn;
var questionLabel;
var nameInput, joinBtn;

function setup() 
{

  
  background(255);
  
   // initialize pubnub
    dataServer = new PubNub(
    {
        publish_key   : pubKey,  //get these from the pubnub account online
        subscribe_key : subKey,  
        ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
      
    });
    
    //attach callbacks to the pubnub object to handle messages and connections
    dataServer.addListener({ message: readIncoming });
    dataServer.subscribe({channels: [channelName]});
    //WE ALSO WANT TO SUBSCRIBE TO THE SETUP CHANNEL, USED FOR ADDING PLAYERS TO LOBBY
    dataServer.subscribe({channels: [setupChannelName]});

    
    background(255);
    noStroke();
    
    nameInput = createInput();
    joinBtn = createButton("Join");
    joinBtn.mousePressed(requestJoinGame);
       joinBtn.class("joinBtn");
    nameInput.class("nameInput");
    
    setupAnswerButtons();
    
}

function setupAnswerButtons(){
    
    //ON EVERY ROUND EXCEPT FOR THE FIRST ONE, REMOVE THE BUTTONS
    if (currentRoundNumber > 0) {
        questionLabel.remove();
        answerABtn.remove();
        answerBBtn.remove();
        answerCBtn.remove();
        answerDBtn.remove();
    }
    
    //THEN CREATE THEM AGAIN WITH NEW QUESTION INFORMATION
    questionLabel = createP(allQuestions[currentQuestionIndex].question);
    
    //CREATE THE FOUR BUTTONS
    answerABtn = createButton('A ' + allQuestions[currentQuestionIndex].answerA);
    answerABtn.style('width', "300px");
    answerABtn.style('height', "300px");
     answerABtn.class("buttona");
    
    answerBBtn = createButton('B ' + allQuestions[currentQuestionIndex].answerB);
    answerBBtn.style('width', "300px");
    answerBBtn.style('height', "300px");
     answerBBtn.class("buttonb");
    answerCBtn = createButton('C ' + allQuestions[currentQuestionIndex].answerC);
    answerCBtn.style('width', "300px");
    answerCBtn.style('height', "300px");
    answerCBtn.class("buttonc");
    answerDBtn = createButton('D ' + allQuestions[currentQuestionIndex].answerD);
    answerDBtn.style('width', "300px");
    answerDBtn.style('height', "300px");
    answerDBtn.class("buttond");
    
    answerABtn.mousePressed(chooseOptionA);
    answerBBtn.mousePressed(chooseOptionB);
    answerCBtn.mousePressed(chooseOptionC);
    answerDBtn.mousePressed(chooseOptionD);
}


function goToResultsScreen(correctOrIncorrect){
    
    //REMOVE EXSISTING ELEMENTS//REMOVE EXSISTING ELEMENTS
    //REMOVE EXSISTING ELEMENTS//REMOVE EXSISTING ELEMENTS
    
    answerABtn.remove();
    answerBBtn.remove();
    answerCBtn.remove();
    answerDBtn.remove();
    
    nameInput.remove();
    joinBtn.remove();
    questionLabel.remove();
    
    
    //ADD NEW ELEMENTS | ADD NEW ELEMENTS | ADD NEW ELEMENTS
    //ADD NEW ELEMENTS | ADD NEW ELEMENTS | ADD NEW ELEMENTS
    
    //IF THEY GOT IT RIGHT SHOW CORRECT
    if (correctOrIncorrect){
        
        createP("Correct!");
        //OMAR STYLING HERE
        
        //var img = loadImage("assets/checkmarkicon.jpg");
        
    } else {
        
        createP("Wrong!");
        //OMAR STYLING HERE
        
        //var img = loadImage("assets/crossicon.jpg");
    }
    
    //image(img,0,0,0,0);
    
    var test = [
        {
            playerIndex: 0,
            name: "Fred",
            score:0
        },
        {
            playerIndex: 1,
            name: "Tom",
            score:18
        },
        {
            playerIndex: 2,
            name: "Syndy",
            score:25
        },
        {
            playerIndex: 3,
            name: "Paul",
            score:12
        }
    ];
    
    var blank = {
            playerIndex: 0,
            name: "blank",
            score:0
    }
   topPlayer = blank;
    secondPlayer = blank;
   thirdPlayer = blank;
    
    //FIND TOP PLAYER
    for (var i =0; i < allPlayers.length; i++){
        
        if (allPlayers[i].score > topPlayer.score){
            console.log("set 1 place");
           topPlayer = allPlayers[i];
        }
    }
    
    //FIND SECOND PLAYER
    for (var j =0; j < allPlayers.length; j++){
        
        if (allPlayers[j].score >= secondPlayer.score && allPlayers[j] != topPlayer){
            
            console.log("Setting 2");
            secondPlayer = allPlayers[j];
            
        }
         
         
    }
    
    //FIND THIRD PLAYER
     for (var k =0; k < allPlayers.length; k++){
       
        if (allPlayers[k].score >= thirdPlayer.score && allPlayers[k] != topPlayer && allPlayers[k] != secondPlayer){
            
            console.log("Setting 3");
           thirdPlayer = allPlayers[k];
        }
         
    }
    
   
   console.log(topPlayer); 
     console.log(secondPlayer);
     console.log(thirdPlayer);
    
    setTimeout(newRound,3000);
    
}

function readIncoming(inMessage){
    
    var correctOrIncorrect;
    
    if (inMessage.channel == channelName){
        
        //ONLY EXCEPT ANSWERS FROM REGISTARED PLAYERS
        if (inMessage.message.playerIndex != null){
            
            //ADD TO THE NUMBER OF ANSWERS
            numberOfRecievedAnswers++;


            //CHECK IF THE THE RECIEVED ANSWER IS THE RIGHT ONE
            if(inMessage.message.answerLetter == allQuestions[currentQuestionIndex].correctAnswer) {

                //DISPLAY CORRECT ON NEXT SCREEN

                //IF IT IS THEN ADD ONE TO THAT PLAYERS SCORE
                allPlayers[inMessage.message.playerIndex].score += 1;
                
                
                correctOrIncorrect = true;
                
                console.log(allPlayers[inMessage.message.playerIndex].name + " guessed correctly!");

            } else {
                
                correctOrIncorrect = false;
                console.log(allPlayers[inMessage.message.playerIndex].name + " guessed wrong!");
            }


            //ONCE EVERYONE HAS ANSWERED
            if (numberOfRecievedAnswers == numberOfPlayers) {

                //LOAD NEW PAGE
                //SCENE VARIABLE SWITCH
                
                
                //MOVE TO NEW PAGE
                goToResultsScreen(correctOrIncorrect);
                
                //newRound();

            } 
        }else {
            
                alert("You have not joined a game yet!");
            
        }
    //IF A MESSAGE IS RECIEVED FROM THE SETUP CHANNEL
    //RECIEVED ANYTIME SOMEONE WANTS TO JOIN A GAME
    } else if (inMessage.channel == setupChannelName) {
        
        //FIRST WE HAVE TO MAKE SURE THEY HAVE NOT ALREADY JOINED
        var alreadyAdded = false;
        
        //CYCLE THOUGH ALL THE PLAYERS AND MAKE SURE NO ONE HAS THAT NAME
        for (var i = 0; i < allPlayers.length; i ++){

            if (allPlayers[i].name == inMessage.message.playerName){
                alreadyAdded = true;
            }
            
        }
        
        //IF NO PLAYER WITH THAT NAME EXSISTS ADD THEM TO THE ALLPLAYERS ARRAY
        if (!alreadyAdded) {
            
            //ADD PLAYER TO ARRAY
            allPlayers.push({
                playerIndex: allPlayers.length,
                name: inMessage.message.playerName,
                score:0
            });
            
            
            
            
            
            
            //IF IT WAS THIS MACHINE THAT SENT THE REQUEST TO JOIN GAME
            if (inMessage.message.playerName == nameInput.value()){
                
                //CYCLE THROUGH ALL THE PLAYERS
                for (var i = 0; i < allPlayers.length; i ++){
                    
                    //FIND THIS PLAYER IN THE ARRAY OF ALL PLAYERS, BECAUSE YOU MAY NOT BE THE FIRST TO JOIN
                    if (allPlayers[i].name == inMessage.message.playerName){
                        //SET THIS PLAYERS INDEX TO BE THE RIGHT NUMBER
                        thisPlayersIndex = allPlayers[i].playerIndex;
                    }
                    
                    //IF THIS PLAYER WAS THE LAST ONE TO JOIN, THEN WE ARE READY TO PLAY
                    if (allPlayers.length == numberOfPlayers){
                        
                        alert("Everyone is ready, lets play!");
                    }
            
                }
                
            }
            
        } else {
            
            alert("A player with this name already exsists!");
        }
        
    
    }
}

//CALLED BY
function requestJoinGame (){
    
    //WHEN THE PLAYER PRESSES THE JOIN BUTTON, SEND A REQUEST ON THE SETUP CHANNEL, PASSING THROUGH THE VALUE IN THE TEXT BOX
    dataServer.publish({
    
            channel: setupChannelName,
            message:
            {
                playerName: nameInput.value()
            }
    
    });
   
}

//CALLED BY ___ ONCE A NEW QUESTION IS POSED
function newRound(){
    
    
    
    console.log("New Round");
    
    //Reset the number of answers
    numberOfRecievedAnswers = 0;
    
    //ALLOW THE PLAYER TO BE ABLE TO ANSWER AGAIN
    alreadyAnswered = false;
    
    //INCREASE THE ROUND NUMBER
    currentRoundNumber++;
    //PICK A RANDOM QUESTION INDEX
    //currentQuestionIndex = int(random(0,allQuestions.length));
    if (currentQuestionIndex == allQuestions.length-1){
        
        currentQuestionIndex = 0;
        
    } else {
       
        currentQuestionIndex++;
    }
    //REFRESH THE ANSWER BUTTONS TO DISPLAY THE NEW INFORMATION
    setupAnswerButtons();
}

//CALLED WHEN THIS PLAYER SELECTS AN ANSWER
function chooseOptionA() {
    
    if (!alreadyAnswered) {
        
        dataServer.publish({
    
            channel: channelName,
            message:
            {
                playerIndex: thisPlayersIndex,
                answerLetter: "A"
            }
    
        });
        
        alreadyAnswered = true;
    }

}
function chooseOptionB() {
    
    if (!alreadyAnswered) {
        
        dataServer.publish({
    
            channel: channelName,
            message:
            {
                playerIndex: thisPlayersIndex,
                answerLetter: "B"
            }
    
        });
        
        alreadyAnswered = true;
    }

}
function chooseOptionC() {
    
    if (!alreadyAnswered) {
        
        dataServer.publish({
    
            channel: channelName,
            message:
            {
                playerIndex: thisPlayersIndex,
                answerLetter: "C"
            }
    
        });
        
        alreadyAnswered = true;
    }

}
function chooseOptionD() {
    
    if (!alreadyAnswered) {
        
        dataServer.publish({
    
            channel: channelName,
            message:
            {
                playerIndex: thisPlayersIndex,
                answerLetter: "D"
            }
    
        });
        
        alreadyAnswered = true;
    }

}
