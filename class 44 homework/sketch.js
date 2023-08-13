var edges=[];
var rightPaddleScore = 0;
var leftPaddleScore = 0;
var brickGroup;
function preload() {
  ballImg = loadImage("ball.png");
  leftPaddleImg = loadImage("leftpaddle.png");
  rightPaddleImg = loadImage("rightpaddle.png");
}

function setup() {
  createCanvas(800,400);
  ball = createSprite(400, 200, 50, 50);
  ball.addImage(ballImg);
  ball.scale = 0.07
  leftPaddle = createSprite(10,200,5,5);
  leftPaddle.addImage(leftPaddleImg);
  leftPaddle.scale = 0.1;
  rightPaddle = createSprite(790,200,5,5);
  rightPaddle.addImage(rightPaddleImg)
  rightPaddle.scale = 0.1
  edges = createEdgeSprites();
  leftPaddle.debug = false
  rightPaddle.debug = false
  leftPaddle.setCollider("circle",0,0,150)
  rightPaddle.setCollider("circle",0,0,120)
  brickGroup = new Group();

}

function draw() {
  background(255,255,255); 
  background("black"); 
  text(rightPaddleScore  ,450,20);
  text(leftPaddleScore, 350,20);
  strokeWeight(15);
  stroke("blue")
  line(2,0,2,400);
  line(798,0,798,400);
  line(0,2,800,2);
  line(0,398,800,398);
  stroke("white");
  line(400,0,400,400);
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  ball.bounceOff(leftPaddle);
  ball.bounceOff(rightPaddle)
  if(keyDown(UP_ARROW)){
    leftPaddle.y = leftPaddle.y-5
  }
  if(keyDown(DOWN_ARROW)){
    leftPaddle.y = leftPaddle.y+5
  }
  rightPaddle.y = ball.y;
  if(keyDown("space")){
    ball.velocityY=4;
    ball.velocityX=4;
  }
  if(ball.isTouching(leftPaddle)){
    ball.velocityY+=0.2
    ball.velocityX+=0.2
  }

  if(ball.x<0){
    rightPaddleScore+=1
    ball.x =400
    ball.y =200
    ball.velocityX=0;
    ball.velocityY=0
  }

  if(ball.x>800){
    leftPaddleScore+=1
  }
  
  if(rightPaddle.y<20 ){
    rightPaddle.y=20
  }
  if(leftPaddle.y<20 ){
    leftPaddle.y=20
  }
  if(rightPaddle.y>390 ){
    rightPaddle.y=390
  }
  if(leftPaddle.y>390 ){
    leftPaddle.y=390
  }

  if(leftPaddleScore ==5 ||rightPaddleScore==5){
    text("Game Over! Better Luck Next Time",300,250);
    text("To Restart Press R",350,280);
    ball.x =400
    ball.y =200
    ball.velocityX=0;
    ball.velocityY=0
  }
  if(keyDown("r")){
    ball.velocityX = 4;
    ball.velocityY =4;
    rightPaddleScore = 0;
    leftPaddleScore = 0;
  }

  if(frameCount% 50==0){
    var brick = createSprite(random(20,350),random(20,360),15,50);
    brick.shapeColor = "red";
    brick.lifetime = 50;
    brickGroup.add(brick);
  }
  ball.bounceOff(brickGroup);
  
  
  drawSprites();
}



