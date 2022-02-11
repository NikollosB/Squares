// Settings


// MAX SPEED ALLOWD 30
const SPEEDX = 4;
const SPEEDY = 3;

const RADIUS = 60 + 5;
const APP_WIDTH = 1000;
const APP_HEIGHT = 600;

const BORDER_WIDTH = 5;

const min = RADIUS / 2 ;

const direction = {
  north: -1,
  east: 1,
  south: 1,
  west: -1
}


// Helper functions

const getRandomNumber = (min, max) => {
  return Math.ceil(Math.random() * (max-min) + min);
}

const randomColor = () => {
  var s = "123456789abcdef";
  var color = "#";
  for (i = 0; i < 6; i++) {
    color += s[Math.floor(Math.random() * s.length)];
  }
  return color;
}

const getRandomCoordinates = (type) => {
  if(type === 'x') 
    return getRandomNumber(min, APP_WIDTH - RADIUS)
  return getRandomNumber(min, APP_HEIGHT - RADIUS)

}




// Others

const changeCoordinates = (box, x, y) => {
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;
}

const nextStep = (box, dir, x, y) => {

  if(y >= APP_HEIGHT - RADIUS) {
    dir.y = direction.north;
    box.style.backgroundColor = randomColor();
  } else if (y <= 0) {
    dir.y = direction.south;
    box.style.backgroundColor = randomColor();
  }

  if(x <= 0) {
    dir.x = direction.east;
    box.style.backgroundColor = randomColor();
    
  } else if (x >= APP_WIDTH - RADIUS) {
    dir.x = direction.west;
    box.style.backgroundColor = randomColor();
  }

}


const move = (box, options, speedx = 1, speedy = 1, intervals) => {

  const {initialX, initialY} = options;

  const DIR = {
    x: 1,
    y: 1
  }

  let x = initialX;
  let y = initialY;

  let interval = setInterval(() => {
    nextStep(box, DIR,x, y);
    x += DIR.x * speedx;
    y += DIR.y * speedy;
    changeCoordinates(box, x, y);
  }, 1);

  intervals.push(interval);

}


const createBox = (app, interval) => {
  let box = document.createElement('div');
  box.classList.add('box');
  box.style.backgroundColor = randomColor();

  const initialX = getRandomCoordinates('x');
  const initialY = getRandomCoordinates('y');
  

  box.style.left = `${initialX}px`;
  box.style.top = `${initialY}px`;

  app.append(box);

  move(box, {
    initialX,
    initialY
  }, SPEEDX, SPEEDY, interval);
 
}


const clearBoxes = (app) => {
  while(app.firstChild) {
    app.removeChild(app.firstChild);
  }
}

(function init(){

  const intervals = [];

  const app = document.getElementById('app');
  const play = document.getElementById('btn');
  const pause = document.getElementById('pause');
  const clear = document.getElementById('stop');


  play.addEventListener('click', () => {
    createBox(app, intervals);
  });

  pause.addEventListener('click', () => {
    intervals.forEach(interval => {
      clearInterval(interval);
    })
  });

  clear.addEventListener('click', () => {
    clearBoxes(app);
  })




})();
