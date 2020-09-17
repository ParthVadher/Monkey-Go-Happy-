var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey1;
var ground

var bananasGroup, bananasImage, banana;
var obstaclesGroup, obstacle1;
var banana;
var time;
var reset,reset1;
function preload() {
  monkey1 = loadAnimation( "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png");
reset1=loadImage("reset.jpg");



  bananasImage = loadImage("banana.png");

  obstacle1 = loadImage("obstacle.png");



}

function setup() {
  createCanvas(600, 200);

  reset =createSprite(300,100);
  reset.addImage(reset1);
  reset.scale=0.5

  monkey = createSprite(50, 160, 20, 50);
  monkey.addAnimation("monkey", monkey1);



  monkey.scale = 0.1;

  ground = createSprite(200, 200, 1200, 20);
  ground.x = ground.width / 2;
  ground.shapeColor = "brown"




  obstaclesGroup = createGroup();
  bananasGroup = createGroup();


  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
  //monkey.debug = true

  bananatouch = 0;
  time = 0;
}

function draw() {

  background(256);
  //displaying score
  text("score: " + time, 500, 50);
  text("Banana :" + bananatouch, 500, 65);

  if (gameState === PLAY) {

    for (var i = 0; i < bananasGroup.length; i++) {
      if (bananasGroup.get(i).isTouching(monkey)) {
        bananasGroup.get(i).remove()
        bananatouch = bananatouch + 1;
      }
    }
     reset.visible=false
     
      ground.velocityX = -(4 + 3 * time / 100)
      //scoring
      time = time + Math.round(getFrameRate(300) /  60  )
      monkey.collide(ground);


      if (ground.x < 0) {
        ground.x = ground.width / 2;
      }

      //jump when the space key is pressed
      if (keyDown("space") && monkey.y >= 130) {
        monkey.velocityY = -12;

      }

      //add gravity
      monkey.velocityY = monkey.velocityY + 0.6

      //spawn the clouds
      spawnBananas();

      //spawn obstacles on the ground
      spawnObstacles();

      if (obstaclesGroup.isTouching(monkey)) {

        gameState = END;
        monkey.changeAnimation("monkey_0.png");

      }
    } else if (gameState === END) {
      reset.visible=true
      text("!! GAMEOVER !!", 250, 50);
      
      if (mousePressedOver(reset)){
          restart();
          }
      



      ground.velocityX = 0;
      monkey.velocityY = 0


      //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      bananasGroup.setLifetimeEach(-1);

      obstaclesGroup.setVelocityXEach(0);
      bananasGroup.setVelocityXEach(0);
    }




    drawSprites();
  }




  function spawnObstacles() {
    if (frameCount % 60 === 0) {
      var obstacle = createSprite(600, 165, 10, 40);
      obstacle.velocityX = -(6 + time / 100);
      obstacle.addImage(obstacle1);

      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.2;
      obstacle.lifetime = 300;
     // obstacle.debug = true
      obstacle.setCollider("rectangle", 0, 0, obstacle.width - 70, 250);
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }

  function spawnBananas() {
    //write code here to spawn the clouds
    if (frameCount % 80 === 0) {
      var banana = createSprite(600, 120, 40, 10);
      banana.y = Math.round(random(80, 120));
      banana.addImage(bananasImage);
      banana.scale = 0.1;
      banana.velocityX = -3;

      //assign lifetime to the variable
      banana.lifetime = 200;

      //adjust the depth
      banana.depth = monkey.depth;
      monkey.depth = monkey.depth + 1;

      //add each cloud to the group
      bananasGroup.add(banana);
    }
  }
function restart(){
  gameState=PLAY
  obstaclesGroup.destroyEach();
  bananasGroup.destroyEach();
  time=0;
  bananatouch=0
  

  
}

