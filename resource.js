class Resource{
  constructor(x,y){
  this.pos = createVector(x,y)
}
  targeted = false;
  radius = 12;
  depleted = false;
  jiggle = 2;
  destination = createVector();
  arrived = false;
display() {
    stroke(255);
    fill(173,255,47,map(this.radius,0,16,100,255));
    ellipse(this.pos.x,this.pos.y,this.radius*2,this.radius*2)
    if (this.targeted) {
      ellipse(this.pos.x,this.pos.y,this.radius*3,this.radius*3)
    }
}

decrease() {
  if  (this.jiggle<=0) {this.jiggle=0;}

  if ( this.radius < 0 ) {this.radius = 0; this.depleted=true;} 

  this.radius -= 0.1;
  this.jiggle -= 0.01;

}

clicked() {
  let d = dist(mouseX,mouseY,this.pos.x,this.pos.y)
  if (d < this.radius*1.3 && this.targeted==false) {
    this.targeted = true;
  } else if (this.targeted==true){
    this.targeted = false;
  }
}

  move() {
      this.pos.x = this.pos.x + random(-this.jiggle,+this.jiggle)
      this.pos.y = this.pos.y + random(-this.jiggle,+this.jiggle)
  }
}
