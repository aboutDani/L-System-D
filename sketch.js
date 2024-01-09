// -------------------------------------------------------
// L-System invented on 09-01-2024 during a classic flu :(
// -------------------------------------------------------

// Variables F+-[]
// Axiom: F
// Rule: F -> FFF+[+F-F-F+F+F+F]-[--F+F+F-F-F-F]

let angle;
let axiom = 'F'; // start
let sentence = axiom;
let len = 100;

// variable for a nice message from ... :) you will discover
let axioma;

// music
let songClick;
let songBackgr;

// only 1 rule for this project
let rules = [];
rules[0] = {
  a: "F",
  b: "FFF+[+F-F-F+F+F+F]-[--F+F+F-F-F-F]"
}

function generate() {
  len *= 0.5; // so the tree can enter in the canvas
  let nextSentence = "";
  for(let i = 0; i < sentence.length; i++){
    // look each character 1 by 1
    let current = sentence.charAt(i);
    // if none of the rules are met then keep that current character
    let found = false;
    for (let j=0; j<rules.length; j++){
      if(current == rules[j].a){
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found){
      nextSentence += current;
    }
  }
  sentence = nextSentence;

  // a little bit of styling for the sentences with grey shadows.
  let p = createP(sentence);
  let pColor = color(random(100, 255));
  p.style('color', pColor);
  p.style('font-size', '10px');
  
  turtle();

  // SOUND of the click button.
  if (!songClick.isPlaying()){
    songClick.play();
    songClick.setVolume(0.2);
  } else {
    songClick.pause();
  } 
}

// turtle graphics from the programming language LOGO
function turtle(){
  background(0);
  resetMatrix();
  translate(width/2, height)

  for(let i=0; i < sentence.length; i++) {
    let current = sentence.charAt(i);

    if(current == 'F'){
      stroke(255,random(0,43),random(77,83), 100);  
      strokeWeight(random(3));    
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == '+'){
      rotate(angle);
    } else if (current == '-'){
      rotate(-angle);
    } else if (current == '['){
      push(); // save
    } else if (current == ']'){
      pop();
    }
  }

}

// loading files
function preload(){
  songClick = loadSound('click.wav');
  songBackgr = loadSound('time.mp3');
}

function setup() {
  canvas = createCanvas(400,400);
  angle = PI/2; // 90 degrees
  //background(51);
  axioma = createP("Let's start -> " + axiom);
  axioma.style('color', 'red');
  axioma.style('font-size', '20px');
  axioma.style('font-family', 'monospace');

  turtle();
  // create a button
  let button = createButton("Be brave: click and generate!");
  // attach an event to the button
  // it contains multiple events in generate 
  // (like music and creating the L-system)
  button.mousePressed(generate);

  let buttonColor = color('white');
  button.style('color', buttonColor);
  button.style('background-color', '#3D3B40');
  button.style('font-size', '18px');
  button.style('border-radius', '12px');
  button.style('font-family', 'monospace');
  
  axioma.mouseOver(overPara);
  axioma.mouseOut(outPara);

  // music background
  songBackgr.play();
}

function overPara(){
  axioma.html("'We have never heard the devil's side of the story, God wrote all the book.'");
  axioma.style('font-size','23');
  axioma.style('font-family', 'monospace');
}

function outPara(){
  axioma.html("Let's start -> " + axiom);
  // Take back old font and size.
  axioma.style('font-size', '20px');
  axioma.style('font-family', 'monospace');
}