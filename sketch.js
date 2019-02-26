let logDisplay;		// an HTML element for displaying data

let leftDisplay;

let graphRight;
let graphLeft;

function setup() {
	createCanvas(windowWidth, windowHeight);
	// create an HTML div for placing text in:
	createHTML();
}

function draw() {
	background(0);

  printData(JSON.stringify(rightGlove));  // RIGHT GLOVE
  printData(JSON.stringify(leftGlove));  // LEFT GLOVE
}

// create some HTML elements in the sketch:
function createHTML() {
	// make the connect and disconnect buttons
	var connectButton = createButton('connect');
	var disconnectButton = createButton('disconnect');
	connectButton.position(0, 0);
	connectButton.mouseReleased(connect);
	disconnectButton.position(80, 0);
	disconnectButton.mouseReleased(disconnect);
	// make a div to display text:
	logDisplay = createElement('div', 'incoming data goes here');
  leftDisplay = createElement('div', 'left glove data here');
  
	// make it WCAG-compliant:
  // RIGHT GLOVE
	logDisplay.attribute('aria-label', 'incoming data');
	logDisplay.attribute('aria-role', 'alert');
	logDisplay.attribute('aria-live', 'polite');
  
  //LEFT GLOVE
  leftDisplay.attribute('aria-label', 'incoming data');
	leftDisplay.attribute('aria-role', 'alert');
	leftDisplay.attribute('aria-live', 'polite');
	// make the text white:
	logDisplay.style('color', 'white');  // RIGHT GLOVE
  leftDisplay.style('color', 'white');  // LEFT GLOVE
	// position it:
	logDisplay.position(10, 40);  // RIGHT GLOVE
  leftDisplay.position(10, 80);  // LEFT GLOVE
}

function printData(inString) {
	// put the input in the logDisplay div:
	graphRight = logDisplay.html('log: ' + inString);
  leftDisplay.html('log: ' + inString);
}