
let particles = [];
let theText;
let font;
let points;
let particle;
let ww;
let wh;
let r;
let type;
let currentDate = new Date();
let clockButton;



function preload(){  // preloads the font for the displayed text, and gets the textinput from the html document
  font = loadFont('Chunkfive.otf');
  type = document.querySelector("#innhold");
}
function setClock(){ // function to set the clock
  theText = currentDate.getDate() + "/" + currentDate.getMonth()+1 + "  " + currentDate.getHours() + " : " + currentDate.getMinutes();
}
function setText(){ // function to set the text from the input
  theText = type.value;
}
function setup() { //set up for the canvas and initializing the display
  particles = [];
  if(theText != currentDate.getDate() + "/" + currentDate.getMonth()+1 + "  " + currentDate.getHours() + " : " + currentDate.getMinutes()){
  theText = type.value; //checks if the displaying text is todays date, if not, the input text is displayed.
  }

  ww = window.innerWidth; //stores the size of the screen so its scalable, uses ww and wh alot to get the right measurements for font size
  wh = window.innerHeight; //  and particle size.
  r = ww/120; // radius of the particles depends on the size of the browser window.

  type.addEventListener("keyup", setup); //add event listeners to the text field and window, for the button the js is in the html
  type.addEventListener("keyup",clear);
  type.addEventListener("keyup",setText);
  window.addEventListener("resize",setup); //refreshes the text when window is resized.

  createCanvas(ww,wh); //creates the canvas with p5 createcanvas function, based on the size of the inner window(browser window size)
  stroke(255,255,255);
  strokeWeight(5);

  textFont(font); //uses the preloaded font, from the font file in this folder.
  fill(255);
  noStroke();

  let fontSize = ww/8; //font size depends on window size.
  let m = 0; // modifyre for special cases to change the particle placement of the second paricle array further down.

  if(theText == currentDate.getDate() + "/" + currentDate.getMonth()+1 + "  " + currentDate.getHours() + " : " + currentDate.getMinutes()){
    fontSize = fontSize *ww/(ww*0.9); //if its a date it has a set size.
  }
  else{
  if(type.value.length >= 17){
    fontSize = fontSize/1.7;    //changes the size of the font based on the length of the input word.
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
  }



  points = font.textToPoints(theText,10,wh/2+60,fontSize); //uses p5 function to transform the font to an array of x,y and alpha of the font.

  for(p of points){ // iterates throug the point gathered from textToPoints function
    particle = new Particle(p.x,p.y, random(ww/(180+m),ww/(220+m))); //creates two arrays for the point arrya, to get more particles per points
    particle2 = new Particle(p.x+random(-ww/(220+m),ww/(220+m)),p.y+random(-ww/(220+m),ww/(220+m)), random(3,ww/(220+m)));
    particles.push(particle); // offsets the second array of particles and changes the radius of them to fill the font better.
    particles.push(particle2); //pushes both particle arrays on to one array, to gather them there.
  }
  // for(i = 0; i < res; i++){
  //   particles[i] = new Particle(random(width),random(height), random(3,9));
  // }

}

function mouseClicked(){ // increases the repell radius of the mouse when mouse is clicked.
  r = r + ww/70;
}

// function deleteAll(){
//   for(var i = 0; i < particles.length*2; i++){
//     particles.pop();
//   }
//   }


function draw() {  // p5 draw function is a loop that draws on the p5 canvas.
  background(0);
  for(p of particles){
    p.update();
    p.show();
    p.behave();
    if(r > ww/25){ //if the radius of the mouse repell is above the ww divided by 25 it resets to the starting radius.
      r=ww/120;
    }
    p.repelled(r);
  }

  if(theText == currentDate.getDate() + "/" + currentDate.getMonth()+1 + //checks if the text is todays date, and if the date changes
      "  " + currentDate.getHours() + " : " + currentDate.getMinutes()){ // like if a minute passes, the canvas will update and the correct
        let dato2 = new Date();                                           //date will be shown
        if(dato2.getDate() + "/" + dato2.getMonth()+1 + "  " + dato2.getHours() + " : " + dato2.getMinutes() != theText){
            currentDate = dato2;
            setClock();
            clear();
            setup();
      }

  }
}
