var dog,happyDog,database,foodS,foodStock,dogImg;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() { 
  textSize(20);
  fill("white");
  background(46,139,87); 

  if(keyWentDown("D")){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  if(keyWentUp("D")){
    dog.addImage(dogImg);
  }
  if(keyDown("R")&& foodS <= 0){
        foodS=20;
  }


  drawSprites();
  if(foodS!== undefined){
    text("food remaining: "+foodS,150,150);
    }
  
  text("Note: Press up arrow to feed dog milk",100,30);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
   if(x<=0){
  x = 0; 
} else{
x=x-1;
 } 
 database.ref('/').update({ 
   Food:x 
  }) 
}



