//let colors = ["#40E0D0","#AFEEEE","#48D1CC","#00CED1","#40e0d0"]
let colors = ["#468966","#FFF0A5", "#FFB03B","#B64926", "#8E2800"];
let radius = 1;


function Particle(x,y,r) {
  this.radius = r; //radius of the particle
  this.position = createVector(random(width),random(height)); // particle startin position, random x and y between the frame width and height
  this.velocity = createVector();
  this.acc = createVector();
  this.color = colors[Math.floor(Math.random()*colors.length)]; //chooses a random color from the colors array.
  this.dest = createVector(x,y); //destination of the particle
  this.maxSpeed = 6; // maximum speed of the particle on its way to the destination
  this.maxForce = 1.8; // maximum force the steering algorithm can use on the particle to arrive at the destination

    this.update = function(){ //update function is a basic physics engine with Euler integation, speed is change of position, acceleration is
      // change of speed. multiplys acceletarion by zero each frame to not make it increas speed for each frame, (FPS 30 ish):
      this.velocity.add(this.acc);
      this.position.add(this.velocity);
      this.acc.mult(0);
      this.position.x = constrain(this.position.x,6,width-6); //constrain the x and y position of the particle to the widht and height of the
      this.position.y = constrain(this.position.y,6,height-6); // window
  }

    this.applyForce = function(force){ //adds a vector(force) to the acceleration of the particle to apply force to it

      this.acc.add(force);

    }

    this.behave  = function(){ //behaviour of a particle, makes particle seek out a destination. applying the arrive vector that always points towards
      let arrive = this.arrive(this.dest); // the destination.
      this.applyForce(arrive);
    }

    this.repelled = function(aria){        //makes the particle flee from a aria/radius around the mouse force is stronger the closer the pointer
      let mouseVector = createVector(mouseX,mouseY);  // is to the partilce, since force is position of the particel subtracted from the vector
      let force = p5.Vector.sub(mouseVector,this.position); // mouseX and mouseY creates
      let d = force.mag()/aria;
      let G = 5;   //G is a artificial gravitational constant used to computate the magnetude of the vector: force.
      let strength = -G/d;   // negative to get the push force instead of gravitational pull
      force.setMag(strength);
      this.acc.add(force);
    }

    this.arrive = function(target){  //arrve function makes is the function that makes the particle slow down to a halt towards its
      let desired = p5.Vector.sub(target,this.position); // destination.
      var d = desired.mag(); //magnitude of the vector desires is the distance.
      if(d < 300){  //if distance is less than 300 the distance will be mapped to start1:0 stop1: 300, start2: 0, stop2: this.maxSpeed
        let speed = map(d,0,300,0,this.maxSpeed); //and speed will be set to this mapped value
        desired.setMag(speed); //so the speed will eventually end up as zero.
      }
      let steer = p5.Vector.sub(desired,this.velocity);  //steering force
      steer.limit(this.maxForce); //limits the amount of force the steering can use on a particle, can increse maxForce to make the letters form faster
      return steer;
    }



    this.show = function(){ //function to display particle at a given position, gives it a random color from the colors array
      stroke(this.color);
      strokeWeight(r);
      point(this.position.x,this.position.y,r);
    }
}
