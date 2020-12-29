
  var monkey , monkey_running
  var banana ,bananaImage, obstacle, obstacleImage
  var bananaGroup, obstacleGroup;
  var score;
  var ground;
  var groundImage;
  var cloud;
  var cloudImage;
  var bg;
  var bgImage;
  var score=0;
  var SCORE;
  var SURVIVAL;
  var TIME;
  var survival=0;
  var MONKEY;
  var GO;
  var HAPPY;
  var INFINITE;
  var RUN;
  var GAMEOVER;
  var GAMEOVERImage;
  var PLAY=1;
  var END=0;
  var gameState=PLAY;
  var restart;
  var restartImage;
var checkpointSound;
var dieSound;


function preload(){
  
  
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstaceImage = loadImage("obstacle.png");

   groundImage=loadImage("ground2.png");
    cloudImage=loadImage("cloud.png");
    bgImage=loadImage("jungle.jpg");
    groundImage=loadImage("ground2.png");
    GAMEOVERImage=loadImage("gameover.png");
    restartImage=loadImage("restart.png");
    checkpointSound=loadSound("checkPoint.mp3");
    dieSound=loadSound("die.mp3");
  }



function setup() {
  createCanvas(500, 450);

  
    bg=createSprite(200, 200, 20, 20);
    bg.addImage(bgImage);


   monkey=createSprite(50, 180, 20, 50);
    monkey.addAnimation("moving", monkey_running);
    monkey.scale=0.1;

    edges=createEdgeSprites;

    ground=createSprite(100, 450, 400, 20);
    ground.visible=false;

    ground.addImage(groundImage);




    bananaGroup=new Group();
    obstacleGroup=new Group();



  }


function draw() {
background("jungle.jpg");
  textSize(20);
  if(gameState===PLAY){
  if(bg.x<200){
       bg.x=bg.width/2;
  }
  ground.velocityX=-(4+3*survival/100); 
   bg.velocityX=-(12+3*survival/100);
    if(ground.x<0){
     ground.x=ground.width/2;
  }
    if (keyDown("space") && monkey.y>=410){
    monkey.velocityY = -12;
  }
    monkey.collide(ground);
   monkey.velocityY=monkey.velocityY+0.6;
  survival=Math.ceil(frameCount/frameRate());
  if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
    score=score+1;
  }
  
    bananas();
  obstacles();
    if(obstacleGroup.isTouching(monkey)){
      dieSound.play();
      gameState=END;
    }
  
  }
  if(gameState===END){
    ground.velocityX=0;
    bg.velocityX=0;
    monkey.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("white");
    GAMEOVER=createSprite(200, 200, 20, 20);
    GAMEOVER.addImage(GAMEOVERImage);
    restart=createSprite(200, 300, 20, 20);
    restart.addImage(restartImage);
    if(mousePressedOver(restart)){
    reset();
    }
    
  }
  if(survival>0 &&survival%20===0){
    checkpointSound.play();
  }
  drawSprites();
  stroke("navy");
  fill("black");
  
  text("SCORE " +score, 110, 60);
  text(" MONKEY"+" GO"+" HAPPY"+" INFINITE"+" RUN", 100, 20)
  ; 
  
    
  text("SURVIVAL "+"TIME "+survival, 290, 60);
  
  
}
function bananas(){ 
  if(World.frameCount%100===0){
banana=createSprite(500, 100, 20, 20);
  banana.addImage(bananaImage);
  banana.velocityX=-(8+3*survival/100);
    banana.scale=0.1;
    banana.y=Math.round(random(350, 260))
    banana.lifetime=160;
    bananaGroup.add(banana);
  }
}

function obstacles(){
  if(World.frameCount%150===0){
    obstacle=createSprite(500, 449, 20, 20);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX=-(6+3*survival/100);  
    obstacle.scale=0.1;
    obstacle.x=Math.round(random(500,600 ));
    obstacle.lifetime=170;
    obstacleGroup.add(obstacle);
    
  }
} 
function reset(){
  score=0;
  survival=0;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  GAMEOVER.visible=false;
  restart.visible=false;
  gameState=PLAY;
  
}





