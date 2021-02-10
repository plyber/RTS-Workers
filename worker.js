
class Worker{
  constructor(x,y) 
  {
    this.pos = createVector(x,y)
  }
  vel = createVector();
  radius = 12;
  gainedResource = 0;
  selected = false;
  destination = createVector();
  arrived = false;

  //DISPLAY VARS
  xOffsetUi = 32;
  yOffsetUi = 12;

  display() {
    stroke(255);
    fill(70,130,180,map(this.gainedResource,0,25,0,255));
    textSize(12)

    if (this.selected) {
      //INFO
      // RESOURCES
      text("RESOURCES: " + floor(this.gainedResource),this.pos.x+this.xOffsetUi,this.pos.y);

      //IS SELECTED OR STATIONED?
      text("IS SELECTED: " + this.selected,this.pos.x+this.xOffsetUi,this.pos.y+this.yOffsetUi);

      //THIS POSITION
      text("POSITION: " + floor(this.pos.x) + ", " + floor(this.pos.y),this.pos.x+this.xOffsetUi,this.pos.y+this.yOffsetUi*2);
      //DESTINATION
      text("TARGET: " + floor(this.destination.x) + ", " + + floor(this.destination.y),this.pos.x+this.xOffsetUi,this.pos.y+this.yOffsetUi*3);
        ellipse(this.pos.x,this.pos.y,this.radius*(this.radius/5),this.radius*(this.radius/5))
    }
    
    if (this.destination.x !==0 && this.destination.y !==0 ){
      ellipse(this.destination.x,this.destination.y,8,8)
    }

    ellipse(this.pos.x,this.pos.y,this.radius*2,this.radius*2)

   
  }
  
  update() {
    let b = dist(this.pos.x,this.pos.y,this.destination.x,this.destination.y)
    if (b < 1) {
      this.arrived=true;
      this.destination.set(0,0);
      this.vel.set(0,0)
    } else {
      this.arrived=false;
      this.pos.add(this.vel)
    }

  }


intersects(arr) {
  for (let i=0;i<arr.length;i++){
  let d = dist(arr[i].pos.x,arr[i].pos.y,this.pos.x,this.pos.y)
  if (d < this.radius*2){
      arr[i].decrease()
      if (resources[i].depleted) {
        return false;
      } else 
      return true;
    }
  }
}

clicked() {
let d = dist(mouseX,mouseY,this.pos.x,this.pos.y)
if (this.pos.x > pressX && this.pos.x < relX && this.pos.y > pressY && this.pos.y < relY && dragSelect){
  this.selected = true;
  } else if (d < this.radius && this.selected==false) {
    this.selected = true;
  } else if (this.selected==true && d > this.radius) {
      this.attracted(mouseX+random(-16,16),mouseY+random(-16,16))
      this.selected = false; 
  }
}

attracted(x,y) {
  this.destination.set(x,y);

  if (this.selected && !this.arrived){
    var target = createVector(x,y);
    var distance = target.dist(this.pos);
    var mappedDistance = map(distance, 100, 0, 2, 1.7);
    target.sub(this.pos);
    target.normalize();
    target.mult(mappedDistance);  
    this.vel = target;
    this.arrived=false;
    }
  }
}