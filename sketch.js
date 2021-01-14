var dog,dog_Img;
var food, food_Img;
var happyDog, happyDog_Img
var database = firebase.database();
var foodS = 10;
var foodStock;


function preload()
{
dog_Img = loadImage("dogImg.png")
happyDog_Img = loadImage("dogImg1.png")
food_Img = loadImage("Food.PNG")
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250,430,20,20);
  dog.scale = 0.2
  dog.addImage(dog_Img);
  dog.visible = true;

happyDog = createSprite(250,450,20,20);
happyDog.scale= 0.2;
happyDog.addImage(happyDog_Img);
happyDog.visible = false

food = createSprite(190,490,10,10);
food.scale = 0.07
food.addImage(food_Img);
food.visible = false;


  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
}


function draw() {  
background(46,139,87);



if(keyWentDown(UP_ARROW)){
writeStock(foodS);

happyDog.visible = true;
dog.visible = false;
food.visible = true;
}

if(keyWentUp(UP_ARROW)){
  dog.visible = true;
  happyDog.visible = false;
  food.visible = false;

}

if(foodS <= 0){
textSize(30)
strokeWeight(2)
stroke("black")
fill("yellow")
textSize(20)
text("Victor wants more food, press space to get more food " ,10,250);
happyDog.visible = false;
food.visible = false;
dog.visible = true;
}



  drawSprites();
  textSize(30)
  strokeWeight(2)
  stroke("black")
  fill("yellow")
  text("Press Up arrow key to feed Victor!", 20,200);
  text("Food Remaining : " + foodS, 100,150)

}

function readStock(data){
foodS = data.val()
}

function writeStock(x){
if(x<=0){
x=0
}else{
x = x-1
}
database.ref('/').update({
Food:x
})
}

function keyPressed(){
  if(keyCode === 32){
    foodS = foodS+20
    dog.visible = true;
    happyDog.visible = false;
    food.visible = false;
    }
}
