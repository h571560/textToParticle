
let particles = [];
let theText;
let font;
let points;
let particle;
let ww;
let wh;
let r;
let type;



function preload(){
  font = loadFont('Chunkfive.otf');
  type = document.querySelector("#innhold");
}
function setup() {
  particles = [];
  theText = type.value;

  ww = window.innerWidth;
  wh = window.innerHeight;
  r = ww/120;


  type.addEventListener("keyup", setup);
  type.addEventListener("keyup",clear);
  window.addEventListener("resize",setup);

  createCanvas(ww,wh);
  stroke(255,255,255);
  strokeWeight(5);

  textFont(font);
  fill(255);
  noStroke();

  let fontSize = ww/8;
  let m = 0;
  if(type.value.length >= 17){
    fontSize = fontSize/1.7;
    m = 50;

  }
  if(type.value.length >= 14 ){
    fontSize = fontSize/1.3;
  }
  if(type.value.length < 8){
    fontSize = fontSize * 1.4;
  }
  if(type.value.length < 5){
    fontSize = fontSize * 1.9;
  }


  points = font.textToPoints(theText,10,wh/2+60,fontSize);

  for(p of points){
    particle = new Particle(p.x,p.y, random(ww/(180+m),ww/(220+m)));
    particle2 = new Particle(p.x+random(-ww/(220+m),ww/(220+m)),p.y+random(-ww/(220+m),ww/(220+m)), random(3,ww/(220+m)));
    particles.push(particle);
    particles.push(particle2);
  }
  // for(i = 0; i < res; i++){
  //   particles[i] = new Particle(random(width),random(height), random(3,9));
  // }

}

function mouseClicked(){
  r = r + ww/70;
}

// function deleteAll(){
//   for(var i = 0; i < particles.length*2; i++){
//     particles.pop();
//   }
//   }


function draw() {
  background(0);
  for(p of particles){
    p.update();
    p.show();
    p.behave();
    if(r > ww/25){
      r=ww/120;
    }
    p.repelled(r);
  }
}
