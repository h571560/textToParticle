# textToParticle
<br />
<br />
<br />
small project to learn about steering algorithm, p5 as a library and javascript.
written in javascript using the p5.js library and html for the index.html page that uses the js files.

### what does it do?

*textToParticle* is a program that transfers text to an array of particles that can be affected by physics, the mouse pointer is repelling the partciles, but the 
particles also has a steering algorithm that affects them aswell, so they will always steer back to the original position if 
they are not affected by any other force.

the user can type in any word in the text box at the top which will then form the word as pardicles displayed in the browser.
there is also a option for the particles to display the current time. The particles will rearrange each minute to update the time.

the size of the displayed particle text will change depending on the window size, font size, word length and CAPS/no caps.

Craig Reynolds' steering behavior was used to get the correct algorithm for steering behavior of the particles.
and also p5.Font.textToPoints() was already made within the library p5.js.
