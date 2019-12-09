
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
let monthStr = (currentDate.getMonth()+1).toString();
let dayStr = currentDate.getDate().toString();
let hoursStr = currentDate.getHours().toString();
let minuteStr= currentDate.getMinutes().toString();


function preload(){  // preloads the font for the displayed text, and gets the textinput from the html document
  font = loadFont('Chunkfive.otf');
  type = document.querySelector("#innhold");
}
function setClock(){ // function to set the clock

  if((currentDate.getMonth()+1) < 10 && !monthStr.startsWith("0")){
    monthStr = "0" + monthStr;
  }
  if(currentDate.getDate() < 10 && !dayStr.startsWith("0")){
    dayStr = "0" + dayStr;
  }
  if(currentDate.getHours() < 10 && !hoursStr.startsWith("0")){
    hoursStr = "0" + hoursStr;
  }
  if(currentDate.getMinutes() < 10 && !minuteStr.startsWith("0")){
    minuteStr = "0" + minuteStr;
  }
  theText = dayStr + "/" + monthStr + "  " + hoursStr + " : " + minuteStr;
}
function setText(){ // function to set the text from the input
  theText = type.value;
}
function setup() { //set up for the canvas and initializing the display
  particles = [];
  if(theText != dayStr + "/" + monthStr + "  " + hoursStr + " : " + minuteStr){
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

  if(theText == dayStr + "/" + monthStr + "  " + hoursStr + " : " + minuteStr){
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
    if(r > ww/15){ //if the radius of the mouse repell is above the ww divided by 25 it resets to the starting radius.
      r=ww/120;
    }
    p.repelled(r);
  }

  if(theText == dayStr + "/" + monthStr + "  " + hoursStr + " : " + minuteStr){ // like if a minute passes, the canvas will update and the correct
        let dato2 = new Date();                                                 //date will be shown
        let monthStr2 = (dato2.getMonth()+1).toString();
        let dayStr2 = dato2.getDate().toString();
        let hoursStr2 = dato2.getHours().toString();
        let minuteStr2 = dato2.getMinutes().toString();

        if((dato2.getMonth()+1) < 10 && !monthStr2.startsWith("0")){
          monthStr2 = "0" + monthStr2;
        }
        if(dato2.getDate() < 10 && !dayStr2.startsWith("0")){
          dayStr2 = "0" + dayStr2;
        }
        if(dato2.getHours() < 10 && !hoursStr2.startsWith("0")){
          hoursStr2 = "0" + hoursStr2;
        }
        if(dato2.getMinutes() < 10 && !minuteStr2.startsWith("0")){
          minuteStr2 = "0" + minuteStr2;
          if(dato2.getMinutes() == 0){
            minuteStr2 = "00";
          }
        }
        if(dayStr2 + "/" + monthStr2 + "  " + hoursStr2 + " : " + minuteStr2 != theText){
            currentDate = dato2;
            monthStr = (currentDate.getMonth()+1).toString();
            dayStr = currentDate.getDate().toString();
            hoursStr = currentDate.getHours().toString();
            minuteStr= currentDate.getMinutes().toString();
            setClock();
            clear();
            setup();
      }

  }
}
