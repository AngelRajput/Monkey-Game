var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var SurvivalTime;

function preload(){
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  
  createCanvas (400,400);
  
   monkey = createSprite(50,315,20,50);
   monkey.addAnimation("moving",monkey_running);
   monkey.scale = 0.1;
  
   ground = createSprite(400,350,990,10);
   ground.velocityX = -4;
   ground.x = ground.width /2;

   foodGroup = createGroup();
   obstacleGroup = createGroup();
  
}


function draw() {
  background("white");
  
   if(gameState === PLAY){
     
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
     
   if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -9;
   }
     monkey.velocityY = monkey.velocityY + 0.8
     
       monkey.collide(ground);
  
    food();
    obstacle();
     
     
 if(obstacleGroup.isTouching(monkey)){
       gameState = END;
   
 }
}
         
   else if (gameState === END) {
    
       foodGroup.setLifetimeEach(-1);
       obstacleGroup.setLifetimeEach(-1);
      foodGroup.setVelocityXEach (0);
      obstacleGroup.setVelocityXEach (0);
      ground.velocityX = 0;
      monkey.velocityY = 0;
   
    
   }
  
  var SurvivalTime = 0;
  
  textSize(20);
  SurvivalTime = Math.ceil(frameCount/frameRate());
  text("SurvivalTime: "+ SurvivalTime,100,50);
  
   drawSprites();
  
}
  
function food () {
  if (frameCount % 80 === 0) {
    var banana = createSprite(300,120,40,10);
    banana.y = Math.round(random(70,170));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 100;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(banana);
  }
}

 
function obstacle () {
  if (frameCount % 300 === 0) {
    var stone = createSprite(328,328,990,10);
    stone.addImage(obstaceImage);
    stone.scale = 0.1;
   stone.velocityX = -3;
    
    stone.lifetime = 100;
    
    obstacleGroup.add(stone);
    
  }
}
