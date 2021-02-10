let workers = [];
let resources = [];

dragSelect=false;
pressX = 0;
pressY = 0;
relX = 0;
relY = 0;

function setup() {

  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < 3; i++){
    var x = random(width);
    var y = random (height)
    workers[i] = new Worker(x,y)
  }
  for (let i = 0; i < 12; i++){
    var x = random(width);
    var y = random (height)
    resources[i] = new Resource(x,y)
  }

}

function mouseReleased(){
  relX = mouseX;
  relY = mouseY;
  
  for (let i = 0; i < workers.length; i++){
    workers[i].clicked()
  }
  for (let i = 0; i < resources.length; i++){
    resources[i].clicked()
  }
  dragSelect=false;
}

function mousePressed() {
  pressX=mouseX;
  pressY=mouseY;
}

function mouseDragged(){
dragSelect=true;
}



function draw() {
  background(0);
  if (dragSelect){
  rect(pressX,pressY,mouseX-pressX,mouseY-pressY)
  }

  for (let i = 0; i < workers.length; i++){
    if (workers[i].intersects(resources)) {
      workers[i].gainedResource += 0.1;
    }
    workers[i].update();
    workers[i].display();
  }
  for (let i = 0; i < resources.length; i++){
    resources[i].move();
    resources[i].display();
    if (resources[i].radius<2) {
      resources.splice(i,1)
    }
  }

}