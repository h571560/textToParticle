let colors = ["#40E0D0","#AFEEEE","#48D1CC","#00CED1","#40e0d0"]
//let colors = ["#468966","#FFF0A5", "#FFB03B","#B64926", "#8E2800"];
let radius = 1;


function Particle(x,y,r) {
  this.radius = r;
  this.position = createVector(random(width),random(height));
  this.velocity = createVector();
  this.acc = createVector();
  this.color = colors[Math.floor(Math.random()*5)];
  this.dest = createVector(x,y);
  this.maxSpeed = 6;
  this.maxForce = 1.8;

    this.update = function(){

      this.velocity.add(this.acc);
      this.position.add(this.velocity);
      this.acc.mult(0);
      this.position.x = constrain(this.position.x,6,width-6);
      this.position.y = constrain(this.position.y,6,height-6);
  }

    this.applyForce = function(force){

      this.acc.add(force);

    }

    this.behave  = function(){
      let arrive = this.arrive(this.dest);
      this.applyForce(arrive);
    }

    // this.mouseNearPart = function(){
    //   return((mouseX > this.position.x - 30 && mouseX < this.position.x + 30) && mouseY > this.position.y-30 && mouseY < this.position.y + 30);
    // }

    this.repelled = function(aria){
      let mouseVector = createVector(mouseX,mouseY);
      let force = p5.Vector.sub(mouseVector,this.position);
      let d = force.mag()/aria;
      let G = 5;
      let strength = -G/d;
      force.setMag(strength);
      this.acc.add(force);
    }

    this.arrive = function(target){
      let desired = p5.Vector.sub(target,this.position);
      var d = desired.mag();
      if(d < 300){
        let speed = map(d,0,300,0,this.maxSpeed);
        desired.setMag(speed);
      }
      let steer = p5.Vector.sub(desired,this.velocity);
      steer.limit(this.maxForce);
      return steer;
    }



    this.show = function(){
      stroke(this.color);
      strokeWeight(r);
      point(this.position.x,this.position.y,r);
    }
}
