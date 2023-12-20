let pmouseX = 0;
let pmouseY = 0;
let sharedAngle = 0;
const walkersCount = 30;
const innerWalker_min = 5
const innerWalker_max = 15
const allWalkers = [];

function setup() {
    pmouseX = mouseX;
    pmouseY = mouseY;
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 10; i++) { // create 10 walkers
        let x = random(width); // random x position
        let y = random(height); // random y position
        let walkers = [];
        let randomWalkersCount = random(innerWalker_min, innerWalker_max);
        for (let i = 0; i < randomWalkersCount; i++) { // create 10 walkers
            let colorChangeSpeed = random(0.001, 0.1); // random color change speed
            walkers.push(new Walker(x, y, colorChangeSpeed));
            
        }
        allWalkers.push(walkers);
    }

    background(255);
}

function draw() {
 for(let walks of allWalkers){
    for (let walker of walks) {
        walker.step();
        walker.display();
    }
}
}

class Walker {
    constructor(x =width / 2,y=height / 2,colorChangeSpeed = 0.01) {
        this.x = x // width / 2;
        this.y = y //height / 2;
        this.px = this.x; // previous x
        this.py = this.y; // previous y
        // this.angle = sharedAngle; // use shared direction
        this.angle = PI / 2; // point downward
        this.color = color(0); // start with black color
        this.targetColor = color(255); // end with white color
        this.colorChangeSpeed = colorChangeSpeed// 0.01; // speed of color change
    }

    display() {
        let d = dist(this.x, this.y, width / 2, height / 2); // distance from the center
        let sw = map(d, 0, width / 2, 8, 1); // map the distance to a stroke weight
        stroke(this.color);
        strokeWeight(sw); // set the stroke weight
        line(this.px, this.py, this.x, this.y); // draw a line from the previous position to the current position
    }

    step() {
        this.px = this.x;
        this.py = this.y;

        // add some randomness to the direction
        this.angle += random(-0.01, 0.01); // reduced from -0.1, 0.1 to -0.01, 0.01

        // move in the current direction
        this.x += cos(this.angle);
        this.y += sin(this.angle);

        // add some randomness to the position
        this.x += random(-1, 1); // reduced from -5, 5 to -1, 1
        this.y += random(-1, 1); // reduced from -5, 5 to -1, 1

        // change the color gradually
        this.color = lerpColor(this.color, this.targetColor, this.colorChangeSpeed);

    }
}