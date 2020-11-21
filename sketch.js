var PLAY = 1;
var END = 0;
var gameState = 1;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var ground2;
var invisGround;

var score = 0;
var survivalTime = 0;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(50,300,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  
  fill("Green");
  ground = createSprite(200,330,450,10);
  ground.shapeColor = "green";
  ground.velocityX = -6;

  
  ground2 = createSprite(200,370,400,70);
  ground2.shapeColor = "black";

  invisGround = createSprite(200,90,400,10);
  invisGround.visible = false;
  
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  
}


function draw() {
  createCanvas(400,400);
  background("lightBlue");
  
  
 stroke("white") ;
 textSize(20);
  fill("white");
  text("score :"+ score,300,20);
  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time : " + survivalTime,100,20);
  
  if(gameState === PLAY){
  bananas();
  ob();
  
    if(keyDown("space")){
    monkey.velocityY = -10;
  }  
    
    
     if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score + 2;
  }
   survivalTime = survivalTime + Math.round(getFrameRate()/60);
    ground.x = ground.width/2;
    
     if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
    
  } 
  else if (gameState === END){
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);

    ground.velocityX = 0;
    
    text("press 'p' t restart",100,150);
    text("YOU LOST :(",200,250);
    text("try not to be greedy",150,200);
    if (keyWentDown("p")){
      reset();
    }
    
  }
  
  
 
  
  
  monkey.velocityY = monkey.velocityY + 2; 
  
  
  
  monkey.collide(ground);
  monkey.collide(invisGround);
  
  
 

  
  
  drawSprites();
  
}


function reset(){
  gameState = PLAY;
  
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  score = 0;
  survivalTime = 0;
}


function bananas(){
  
  if(World.frameCount%100===0){
  banana = createSprite(400,random(95,250),20,20);
  banana.velocityX = -5;
  banana.addImage(bananaImage);
    banana.scale = 0.1;
    FoodGroup.add(banana);
    banana.lifetime = 85;
  }
}

function ob(){
  if(World.frameCount%80===0){
  obstacle = createSprite(400,287,40,40);
  obstacle.velocityX = -5;
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  obstacleGroup.add(obstacle);
  obstacleGroup.lifetime = 85;
    obstacle.setCollider("circle",-15,0,240)
  }
}

























