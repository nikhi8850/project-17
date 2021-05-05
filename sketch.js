
var monkey , monkey_running,monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime
var gameState="play"

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
 }


function draw() {
  background("white")  
  if(gameState === "play"){
  if(keyDown("space")){
    monkey.velocityY=-5;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  
  if(ground.x<200){
    ground.x=ground.width/2;
  }
  monkey.collide(ground);
  spawnFood();
  spawnObstacle();
    
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time "+survivalTime,100,50);
    if(obstacleGroup.isTouching (monkey))
{
  gameState="end"
}  }
  if(gameState === "end"){
    text("GAME OVER", 200,100)
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX=0
    FoodGroup.setVelocityXEach(0)
  }
  
  drawSprites();
}

function spawnFood(){
  if (frameCount % 80 === 0){
    food=createSprite(200,200,20,20);
    food.y=Math.round(random(120,200));
    food.addImage("banana",bananaImage);
    food.scale=0.1;
    food.velocityX=-3;
    food.lifetime=600;
    FoodGroup.add(food);
 }
}

function spawnObstacle(){
  if(frameCount % 200 === 0){
    obstacle=createSprite(600,280,20,20);
    
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale=0.4;
    obstacle.velocityX=-3;
    obstacle.lifetime=600;
    obstacleGroup.add(obstacle);
  }
}

