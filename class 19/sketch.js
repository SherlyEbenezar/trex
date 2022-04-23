var trex,trexImage, ground, groundImage,cloud,cloudImage,obstacle
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var r,obstaclesGroup, cloudsGroup, trexCollided
var gameState = "play"
var gameOver, restart, gameOverImage, restartImage
var score = 0
var highScore = 0
var bird, birdImage,birdsGroup

function preload(){
  trexImage = loadAnimation("trex1.png","trex3.png","trex4.png")
  trexCollided = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  
  obstacle1 = loadImage("obstacle1.png")
    obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  
  restartImage = loadImage("restart.png")
  gameOverImage = loadImage("gameOver.png")
  birdImage = loadImage("bird.png")
  
}

function setup(){
  
  createCanvas(600,200)
  
  trex = createSprite(50,170,10,10)
  trex.addAnimation("run",trexImage)
  trex.addAnimation("collide",trexCollided)
  trex.scale = 0.5
  
  
  trex.setCollider("circle",0,0,40)
  
  ground = createSprite(300,190,600,10)
  ground.addImage(groundImage)
  ground.velocityX = -4
  
  ground2 = createSprite(200,195,400,10)
  ground2.visible = false
  
  obstaclesGroup = new Group()
  cloudsGroup = new Group()
  birdsGroup = new Group()
  
  
  
  restart = createSprite(300,140,10,10)
  restart.addImage(restartImage)
  restart.scale = 0.5
  
  gameOver = createSprite(300,100,10,10)
  gameOver.addImage(gameOverImage)
  gameOver.scale = 0.5
  
}


function draw(){
 
  
  if(score<200 || score>400){
      background("white")
     }
  else{
     background("black")
  }
 
  
  text("score = " + score,500,50)
 
  
  if(gameState=="play"){
    
      if(ground.x<0){
     ground.x = ground.width/2
     }
     if(keyDown("space") && trex.y>150){
     trex.velocityY = -8
     }
    if(frameCount%30 == 0){   
      createClouds()
     } 
     if(frameCount%100==0){
       createObstacles()
     }
    if(frameCount%50==0 && score>500 && score<800){
       createBirds()
       }
    
  if(trex.isTouching(obstaclesGroup) ){
     ground.velocityX = 0
   
    obstaclesGroup.setVelocityXEach(0) 
    cloudsGroup.setVelocityXEach(0)
    birdsGroup.setVelocityXEach(0)
    trex.changeAnimation("collide")
    gameState = "end"
     }
     trex.velocityY = trex.velocityY+0.5
    if(frameCount%1==0){
       score = score+1
       }
    
    restart.visible = false
    gameOver.visible = false
     
     }
  
  if(gameState=="end"){
      trex.velocityX = 0
    trex.velocityY=0
    restart.visible = true
    gameOver.visible = true
    
    if(score>highScore){
       highScore = score
       }
    
    if(mousePressedOver(restart)){
       reset()
       }
    
    text("high score = " + highScore,400,50)
    
     }
 
  
 
  
  trex.collide(ground2)
 
  drawSprites()
}

function reset(){
  score = 0
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  birdsGroup.destroyEach()
  gameState = "play"
  trex.changeAnimation("run")
  ground.velocityX = -4
}


function createObstacles(){
  obstacle = createSprite(600,170,10,30)
  obstacle.velocityX = -4
  if(score%10==0){
     obstacle.velocityX = obstacle.velocityX-3
     }
 
  r=Math.round(random(1,6))
  
    
  switch(r){
      case 1: obstacle.addImage(obstacle1)
      obstacle.scale = 0.5
      break;
      case 2: obstacle.addImage(obstacle2)
      obstacle.scale = 0.5
      break;
      case 3: obstacle.addImage(obstacle3)
      obstacle.scale = 0.5
      break;
      case 4: obstacle.addImage(obstacle4)
      obstacle.scale = 0.3
      break;
      case 5: obstacle.addImage(obstacle5)
      obstacle.scale = 0.3
      break;
      case 6: obstacle.addImage(obstacle6)
      obstacle.scale = 0.2
      break;

         }
  
  
  obstaclesGroup.add(obstacle)
 
}

function createClouds(){
  cloud = createSprite(600,20,20,5)
  cloud.y = random(50,100)
 // console.log(cloud.y)
  cloud.addImage(cloudImage)
  cloud.velocityX = -2
  cloud.scale = 0.6
  cloud.depth = 1
  trex.depth = 2
  cloudsGroup.add(cloud)

}

function createBirds(){
  bird = createSprite(600,20,10,10)
  bird.addImage(birdImage)
  bird.scale = 0.1
  bird.y = random(0,80)
  bird.velocityX = -4
  birdsGroup.add(bird)
}















